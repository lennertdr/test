import { ConsentRecord } from '../models/consentRecord';
import { parseConsentStatuses } from './smallParsers';
import { parseProcesses } from './processParser';
import { parseNotice } from './noticeParser';
import { typeOrId } from './helpFunctions';

/**
 * Convert JSON-LD to a ConsentRecord-object.
 * Not every field is present yet.
 */
export async function constructConsentRecords(jsonldData){
    // Find the records in this piece of data
    const parsedData = JSON.parse(jsonldData)["@graph"];
    const records = parsedData
    .filter(record => record['@type'] && record['@type'].includes('dpv:ConsentRecord'));

    // Parse the notice 
    const notices = parsedData
            .filter(data => data["@type"] && data["@type"].includes("dpv:ConsentNotice"));
    const notice = parseNotice(notices[0]);

    // Map over all the records
    const consentRecords = await Promise.all(records.map(async (record) => {

        // Parse the consent statuses of this record
        const consentStatuses = parseConsentStatuses(record['dpv:hasConsentStatus']);

        // Collect the processes of this record
        const consentProcesses = await parseProcesses(record['dpv:hasProcess']);

        const finalRecord = new ConsentRecord(
            // Currently no checks if all obliged fields are present.
            record['@id'],
            record['d:termsidentifier'],
            consentStatuses,
            record['dpv:hasDataController']['@id'],
            record['dpv:hasDataProcessor']? record['dpv:hasDataProcessor']['@id'] : undefined,
            record['dpv:hasDataSubject']? record['dpv:hasDataSubject']['@id'] : undefined,
            record['dpv:hasJurisdiction'],
            record['dpv:hasInvolvementControl'],
            notice,
            consentProcesses,
            record['dpv:hasRight']
        );

        return finalRecord;

    }));

    // Will always return a list of (a) record(s)
    return consentRecords;
}