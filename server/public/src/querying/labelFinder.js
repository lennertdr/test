import { graph, Namespace, Fetcher } from 'rdflib';

const store = graph();
const fetcher = new Fetcher(store);
export const SKOS = Namespace('http://www.w3.org/2004/02/skos/core#');
export const DPV = Namespace('https://w3id.org/dpv#');
export const PD = Namespace('https://w3id.org/dpv/pd#');


export const getLabel = async (concept, namespace) => {
    try {
        await fetcher.load(links[namespace]);

        const label = store.any(concept, SKOS('prefLabel'));
        return label.value;
    } catch (error) {
        console.error('Error fetching RDF data:', error);
    }
};

const concepts = [
    DPV('PaymentManagement'),
    PD('EmailAddress')
];

// Pretty bad solution but there would be CORS errors from the actual source
const links = {
    'pd': 'http://127.0.0.1:5500/ontologies/turtle/pd.ttl',
    'dpv': 'http://127.0.0.1:5500/ontologies/turtle/dpv.ttl'
}