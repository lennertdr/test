import { DPV, PD } from "../querying/labelFinder";

export const isList = (obj) => {
    // A little shorter then always write this
    return Array.isArray(obj);
}

export const asList = (obj) => {
    // Easier for generic parsing
    return Array.isArray(obj) ? obj : [obj];
}

export const typeOrId = (obj) => {
    // Some objects can have the '@id'-field OR the '@type'-field.
    return obj['@id'] ? obj['@id'] : obj['@type'];
}

export const mapNameToNamespace = (content, name) => {
    // return the right namespace for out labelled items (personal data and purpose)
    if(name === "pd") return PD(content);
    return DPV(content);
}

export const necessityToStyle = {
    'dpv:Required': 'red-border',
    'dpv:Optional': 'green-border'
}