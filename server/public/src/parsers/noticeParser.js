import { ConsentNotice } from "../models/consentRecord";
import { calculateEndDate } from "./timeParser";
import { iso639_1Mapping } from "../conversions/iso639-mapping";

export const parseNotice = (raw) => {
    const startDate = new Date(raw['dct:date']["@value"]);
    const endDate = calculateEndDate(raw["dct:coverage"]);
    return new ConsentNotice(
        raw['@id'],
        raw['@type'],
        startDate,
        endDate,
        iso639_1Mapping[raw['dct:language'].toLowerCase()]
    );
}