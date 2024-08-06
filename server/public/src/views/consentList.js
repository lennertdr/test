import { processOneFile } from "../conversions/textToObject"
import { showOneRecord } from "../conversions/ObjectToHTML";

export const createList = async (texts) => {
    // Render the text files in the list, bit exhaustive if there are a lot to render
    const records = await Promise.all(await texts.map(processOneFile));


    // Fill the list element that will be shown
    const list = document.getElementById('consent-list');
    const title = document.createElement("h2");
    title.textContent = "list of consent records";
    list.appendChild(title);
    records.forEach((element, index) => {
        const item = document.createElement('li');
        item.classList.add("record-list-item");
        item.textContent = `${element[0].id}`;

        item.addEventListener('click', () => {
            // Retrieve the menu list and the content of the record
            const consentList = document.getElementById('consent-list');
            const container = document.getElementById('consent-details');
            const listBackButton = document.getElementById('list-back-button');
            // If there is nothing on display yet, set the content to be shown as visible
            if(container.style.display !== 'block'){
                consentList.classList.add("side");
                container.style.display = 'block';
                listBackButton.style.display = 'none'
            }

            // remove the old content
            while (container.firstChild) {
                container.removeChild(container.firstChild);
            }
            // replace with the new content
            showOneRecord(element);
        });
        list.appendChild(item);
    });
    list.style.display = 'none';
}
