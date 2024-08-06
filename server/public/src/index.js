import { createList } from "./views/consentList";

// Show all the available consent records, when one is clicked it should be shown
createList(['records/receipt-complete.ttl', 'records/receipt-complete-xpd.ttl', 'records/receipt-ajbkdnsbfk.ttl', 'records/receipt-asdmj1oasd.ttl', 'records/receipt-test2.ttl'])

// Currently only with manually set files, later it will be pods anyway.
//, 'records/receipt-complete-xpd.ttl', 'records/receipt-ajbkdnsbfk.ttl', 'records/receipt-asdmj1oasd.ttl', 'records/receipt-test2.ttl']);
//'records/receipt-complete.ttl', 'records/receipt-complete-xpd.ttl','records/receipt-ajbkdnsbfk.ttl','records/receipt-asdmj1oasd.ttl','records/receipt-test2.ttl', 'records/receipt-ajbkdnsbfk.ttl','records/receipt-asdmj1oasd.ttl', 'records/receipt-test2.ttl', 'records/receipt-ajbkdnsbfk.ttl','records/receipt-asdmj1oasd.ttl', 'records/receipt-test2.ttl'
const button = document.getElementById('consent-button');
const menu = document.getElementById('menu');
const listBackButton = document.getElementById('list-back-button');
const consentList = document.getElementById('consent-list');

button.addEventListener('click', () => {
    menu.style.display = 'none';
    listBackButton.style.display = 'inline-block';
    consentList.style.display = 'block';
});
listBackButton.addEventListener('click', () => {
    listBackButton.style.display = 'none';
    consentList.style.display = 'none';
    menu.style.display = 'flex';
});