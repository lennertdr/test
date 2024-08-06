import { asList, necessityToStyle } from "../parsers/helpFunctions";

export const createPersonalDataPopup = (personalData) => {
    // Clicking on the personal data of a card results in a popup showing the personal data
    const popup = document.createElement('div');
    popup.classList.add("pd-popup");

    const popupContent = document.createElement('div');
    popupContent.classList.add("popup-content")

    const close = document.createElement('p');
    close.innerHTML = 'close';
    close.setAttribute("id", "close-popup");
    close.classList.add("close-popup");
    close.onclick = () => {
        popup.style.display = "none";
    }

    popupContent.innerHTML = `
        <p>Overview of <strong>Personal Data</strong></p>
    `;

    const row = document.createElement('div');
    row.classList.add('process-row')

    // Display the personal data seperately
    asList(personalData).map(data => {
        const block = document.createElement('div');
        block.classList.add('process-card');
        block.classList.add('popup-card');
        block.classList.add(necessityToStyle[data.necessity]);

        // Piece together the content of the card
        let html = `
            <p><strong>Type: </strong>${data.readableLabel}</p>
        `;
        if (data.description) html += `<p><strong>Description: </strong>${data.description}</p>`;
        if (data.value) html += `<p><strong>Value: </strong>${data.value}</p>`;
        if (data.dataSource) html += `<p><strong>Data source: </strong>${data.dataSource}</p>`;
        if (data.necessity) html += `<p><strong>This item is </strong>${data.necessity}</p>`;
        if (data.category) {
            html += `
                <div class="align-horizontal">
                    <i class="uil uil-exclamation-octagon orange personal-data-icon"></i>
                    <p><strong>Extra type: </strong>${data.category}</p>
                </div>
            `
        }

        block.innerHTML = html;
        row.appendChild(block);
    })
    popupContent.appendChild(row);
    popupContent.appendChild(close);
    popup.appendChild(popupContent);

    popup.style.display = 'none';

    return popup
}