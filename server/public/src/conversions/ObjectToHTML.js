import { createConsentStatusTimeline } from "../views/timeline";
import { addProcessList } from "../views/processList";

export async function showOneRecord(records) {
    const record = records[0]
    const container = document.getElementById('consent-details');
    
    const recordElement = document.createElement('div');
    recordElement.classList.add("all-info")

    // Start basic with only the first process
    const loadMore = document.createElement('p');
    const additionalInfo = document.createElement('div');

    loadMore.classList.add("summary-load-more");
    loadMore.setAttribute("id", "load-more");
    loadMore.textContent = "load more";

    // The objects HTML-representation
    recordElement.innerHTML = `
        <h2>Consent Record ${record.id}</h2>
        <ul >
            <li><strong>Data Controller:</strong> ${record.dataController}</li>
        </ul>
    `;
    const timeline = createConsentStatusTimeline(record.consentStatus, record.notice);

    additionalInfo.setAttribute("id", "additionalInfo");
    additionalInfo.innerHTML = `
        <ul >
            <li><strong>Data Processor:</strong> ${record.dataProcessor}</li>
            <li><strong>Data Subject:</strong> ${record.dataSubject}</li>
            <li><strong>Jurisdiction:</strong> ${record.jurisdiction ? record.jurisdiction['@type'] : record.jurisdiction}</li>
            <li><strong>Notice:</strong> ${record.notice.id}</li>
            <li><strong>Right:</strong> ${record.right['dct:title']}</li>
        </ul>
    `;

    console.log("processor", record.dataProcessor, "\n datasubject", record.dataSubject, "\n jurisdiction", record.jurisdiction);
    
    additionalInfo.style.display = 'none';
    loadMore.addEventListener("click", function () {
        const extras = document.getElementById("additionalInfo");
        if (extras.style.display === 'none' || extras.style.display === '') {
            extras.style.display = 'block';
            loadMore.textContent = "show less";
        } else {
            extras.style.display = 'none';
            loadMore.textContent = "load more";
        }
    });

    recordElement.appendChild(loadMore);
    recordElement.appendChild(additionalInfo);

    container.appendChild(timeline);
    addProcessList(record.process);
    container.appendChild(recordElement);

    // Add event listener to go back to the list of records
    const backButton = document.createElement("p");
    const listBackButton = document.getElementById('list-back-button');
    backButton.textContent = "Go to overview";
    backButton.classList.add("menu-button")
    backButton.addEventListener("click", () => {
        const list = document.getElementById("consent-list");
        const ctnr = document.getElementById("consent-details");
        ctnr.style.display = 'none';
        listBackButton.style.display = 'block';
        if (ctnr) {
            while (ctnr.firstChild) {
                ctnr.removeChild(ctnr.firstChild);
            }
        }
        list.classList.remove("side");
    });
    container.appendChild(backButton);
}

