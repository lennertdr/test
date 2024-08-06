import { ConditionDuration, ConsentProcess, StorageCondition, LabelledItem, PersonalData } from "../models/consentRecord";
import { xsdDurationToText } from "./timeParser";
import { getLabel } from "../querying/labelFinder";
import { isList, asList, typeOrId, mapNameToNamespace } from "./helpFunctions";


// --------------------------------  Singular  --------------------------------- //

const parsePurpose = async (raw) => {
    // Look if the object has the 'type' tag or the 'id' tag
    const text = typeOrId(raw);
    // Get the associated label for the label (in the right namespace)
    const label = await getLabel(mapNameToNamespace(text.split(":")[1], text.split(":")[0]), text.split(":")[0]);
    const item = new LabelledItem(
        raw,
        label,
        raw['dct:description']
    );
    return item;
}

const parsePersonalData = async (raw) => {
    // 'raw' is the full object of personal data, when it's not a list
    // The type can be a list of multiple types, check if it is one
    let text;
    let category;
    if (isList(typeOrId(raw))){
        text = typeOrId(raw)[0];
        category = typeOrId(raw)[1];
    } else {
        text = typeOrId(raw);
    }
    // Look if the object has the 'type' tag or the 'id' tag
    // Get the associated label for the label (in the right namespace)
    const label = await getLabel(mapNameToNamespace(text.split(":")[1], text.split(":")[0]), text.split(":")[0]);
    const value = raw['rdf:value'];
    const description = raw['dct:description'];
    const necessity = raw['dpv:hasNecessity'] ? raw['dpv:hasNecessity']['@id'] : undefined;
    const dataSource = raw['dpv:hasDataSource'] ? raw['dpv:hasDataSource']['@id'] : undefined;
    const item = new PersonalData(
        raw,
        label,
        value,
        description,
        necessity, 
        dataSource,
        category
    );
    return item;
}

export const parseStorageConditionDuration = (raw) => {
    const conditions = raw.filter(condition => (condition['@type'] === "dpv:StorageDuration")).map(condition => {
        // Make the duration readable
        const value = condition['dpv:hasDuration']['@value'] ? condition['dpv:hasDuration']['@value'] : condition['dpv:hasDuration']['rdf:value'];
        const conditionDuration = new ConditionDuration(
            xsdDurationToText(value),
            condition['dpv:hasDuration']['@type']
        );
        return new StorageCondition(
            condition['@type'],
            conditionDuration
        );
    });
    // One duration for each condition
    return conditions[0];
}

export const parseStorageConditionDeletion = (raw) => {
    const deletions = raw.filter(condition => (condition['@type'] === "dpv:StorageDeletion")).map(condition => {
        // Make the duration readable
        const conditionDuration = new ConditionDuration(
            xsdDurationToText(condition['dpv:hasDuration']['@value']),
            condition['dpv:hasDuration']['@type']
        );
        return new StorageCondition(
            condition['@type'],
            conditionDuration
        );
    });
    return deletions[0];
}

export const parseStorageConditionLocation = (raw) => {
    const locations = raw.filter(condition => (condition['@type'] === "dpv:StorageLocation")).map(condition => {
        // Make the duration readable
        const locations = condition['hasLocation'].map(entry => entry['@id']);
        return new StorageCondition(
            condition['@type'],
            locations
        );
    });
    return locations[0];
}

// ---------------------------------   Lists   ---------------------------------- //

export const parsePurposeList = async (raw) => {
    const dataset = await Promise.all(raw.map(parsePurpose));
    return dataset;
}

export const parsePersonalDataList = async (raw) => {
    const dataset = await Promise.all(raw.map(parsePersonalData));
    return dataset;
}

// ---------------------------------   Total   ---------------------------------- //

export const parseProcesses = async (raw) => {
    // Collect the processes of this record

    // Record can have multiple processes
    raw = asList(raw);

    const consentProcesses = await Promise.all(raw.map(async (process) => {
        // Right now the duration is the only condition that has to be viewable
        const storageConditionDuration = parseStorageConditionDuration(process['dpv:hasStorageCondition']);
        // Label the purpose and personal data of each process
        const rawPD = process['dpv:hasPersonalData'];
        const personalData = isList(rawPD) ? await parsePersonalDataList(rawPD) : await parsePersonalData(rawPD);
        

        const rawPp = process['dpv:hasPurpose'];
        const purpose = isList(rawPp) ? await parsePurposeList(rawPp) : await parsePurpose(rawPp);
        
        const recipient = isList(process['dpv:hasRecipient']) ? process['dpv:hasRecipient'].map(obj => obj['@id']) : process['dpv:hasRecipient']['@id'];
        const necessity = process['dpv:hasNecessity'] ? process['dpv:hasNecessity']['@id'] : process['dpv:hasNecessity'];
        return new ConsentProcess(
            personalData,
            purpose,
            storageConditionDuration,
            recipient,
            necessity
        );
    }));

    return consentProcesses;
}