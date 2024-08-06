import { asList, isList } from "../parsers/helpFunctions";
import { createPersonalDataPopup } from "./pdPopUp";
import { necessityToStyle } from "../parsers/helpFunctions";

export const addProcessList = (processes) => {
    const container = document.getElementById('consent-details');
    const box = document.createElement('div');
    const title = document.createElement('h2');
    title.textContent = "Processes";
    title.classList.add("process-title");
    const row = document.createElement('div');
    row.classList.add('process-row');

    processes.forEach(process => {
        // Build a card for each process
        const card = document.createElement('div');
        card.classList.add('process-card');
        // Set default necessity
        if(!process.necessity)
            process.necessity = "dpv:Required";
        card.innerHTML = `
            <p>This process is ${process.necessity.split(':')[1]}</p>
            <p><strong>Storage Duration:</strong> ${process.storageConditions.duration.value}</p>
            <p><strong>Recipient:</strong> ${process.recipient}</p>
        `

        // To display the purposes, create a list where a discription can be read by hovering over
        const listBox = document.createElement('div');
        const title = document.createElement('p');
        title.innerHTML = "<strong>Purpose: </strong>";
        listBox.appendChild(title);
        const list = document.createElement('ul');
        asList(process.purpose).map(purpose => {
            const listItem = document.createElement("li");
            listItem.classList.add("purpose-item");
            listItem.textContent = purpose.readable;
            list.appendChild(listItem);

            if(purpose.description) {
                const description = document.createElement('p');
                description.classList.add("purpose-description");
                description.textContent = `description: ${purpose.description}`;
                list.appendChild(description);
            }
        });
        listBox.appendChild(list);
        card.appendChild(listBox);

        // Add border based on necessity
        card.classList.add(necessityToStyle[process.necessity]);

        // Add personal data tag with popup for information
        const pdTag = document.createElement('p');
        pdTag.setAttribute("id", "personal-data");
        pdTag.classList.add("personal-data");
        pdTag.innerHTML = `<strong>Personal Data: </strong>view details`;
        const popUp = createPersonalDataPopup(process.personalData);

        // Add handlers to the open and close actions
        pdTag.addEventListener('click', () => {
            popUp.style.display = "block";
        });

        // small bug right now: this only works on the popup of the last personal data card
        window.onclick = function(event) {
            if (event.target == popUp) {
                popUp.style.display = "none";
            }
        }        

        container.appendChild(popUp);
        card.appendChild(pdTag);
        row.appendChild(card);
    });
    box.appendChild(title);
    box.appendChild(row);
    container.appendChild(box)
}