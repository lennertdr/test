import { ConsentStatus } from "../models/consentRecord";


export const parseConsentStatuses = (raw) => {
    raw = Array.isArray(raw) ? raw : [raw];
    const statuses = raw.map(status => {
        return new ConsentStatus(
            status['@type'],
            status['dpv:hasIndicationMethod'],
            status['dpv:isIndicatedAtTime']['@value'],
            status['dpv:isIndicatedBy']['@id']
        );
    });
    return statuses;
}
