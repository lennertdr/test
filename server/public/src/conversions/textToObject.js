import { constructConsentRecords } from '../parsers/objectParser';

// Usage of rdflib by recommendation.
const $rdf = require('rdflib');

// This version fetches static files instead of Solid data, to be changed later.
async function fetchFile(url) {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`Failed to fetch ${url}: ${response.statusText}`);
    }
    return await response.text();
}

// Parse some RDF to the given format.
async function parseRDFData(rdfText, format) {
    const store = $rdf.graph();
    const contentType = format === 'ttl' ? 'text/turtle' : 'application/n-triples';
    $rdf.parse(rdfText, store, 'http://example.org/base', contentType);
    return store;
}

// We will convert everything to JSON-LD to make it easier to convert to Javascript classes.
async function convertToJSONLD(store) {
    return new Promise((resolve, reject) => {
        $rdf.serialize(null, store, 'http://example.org/base', 'application/ld+json', (err, jsonld) => {
            if (err) {
                reject(err);
            } else {
                resolve(jsonld);
            }
        });
    });
}

/**
 * Turn the turtle file into a json-ld object
 */
export async function processOneFile(url) {
    var fileUrl = [url] //TEST
    const format = 'ttl'; // If the consent records are not in Turtle, change here!

    // Convert plain text to $rdf graph, then to turtle (if the source is in turtle)
    const stores = await Promise.all(fileUrl.map(async (url) => {
        const rdfText = await fetchFile(url);
        return parseRDFData(rdfText, format);
    }));

    // Convert the turtle to JSON-LD
    const jsonldData = await Promise.all(stores.map(convertToJSONLD));

    // Set the converted record to a consent record object
    let record = await jsonldData.map(constructConsentRecords)[0];

    return record
}
