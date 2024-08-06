
export function createConsentStatusTimeline(list, notice) {
    // Sort, oldest first
    list = [...list, notice]
    list.sort((a, b) => {
        const dateA = new Date(a.indicatedAtTime || a.startDate);
        const dateB = new Date(b.indicatedAtTime || b.startDate);
        return dateA - dateB;
    });


    // The timeline has a title and a set of timeline items.
    const timeline = document.createElement('ul');
    timeline.classList.add('timeline');

    const timelineTitle = document.createElement('h2');
    timelineTitle.classList.add("timeline-title");    
    timelineTitle.textContent = "Consent Status Timeline";
    
    const timelineItems = document.createElement('div');
    timelineItems.classList.add("timeline-items");

    const typeToIcon = {
        "dpv:ConsentGiven": "uil-check green",
        "dpv:ConsentWithdrawn" : "uil-times red",
        "dpv:ConsentNotice" : "uil-info-circle"
    }

    list.forEach((object, index) => {
        // The consent status timeline has an information part (what's the status?)
        // and a 'timeline part' which is just the icon corresponding to the status (and a line).

        const isNotice = object.type === "dpv:ConsentNotice";

        const informationPart = document.createElement('div');
        const timelineItem = document.createElement('div');
        const statusIcon = document.createElement('i');
        const timelineContent = document.createElement('div');
        
        statusIcon.classList.add("uil");
        statusIcon.classList.add("custom-icon");
        statusIcon.classList.add("overlap");
        timelineItem.classList.add("timeline-part")
        informationPart.classList.add('timeline-item');
        timelineContent.classList.add('timeline-content');

        if (index < list.length - 1) {
            timelineItem.classList.add("with-arrow");
        }

        // Add a check-icon when consent is given, a cross-icon when it has been withdrawn/rejected, ...
        if(Object.keys(typeToIcon).includes(object.type) || Array.isArray(object.type)){
            // There can also be an array of consent types
            if(Array.isArray(object.type)){
                let c = 0
                while(c < object.type.length && !Object.keys(typeToIcon).includes(object.type[c])){
                    c++;
                }
                if(c < object.type.length){
                    typeToIcon[object.type[c]].split(' ')
                            .forEach(style =>statusIcon.classList.add(style));
                } else {
                    statusIcon.classList.add("uil-circle");
                }
            } else {
                typeToIcon[object.type].split(' ')
                            .forEach(style =>statusIcon.classList.add(style));
            }
        } else {
            // In other cases, just show a circle
            statusIcon.classList.add("uil-circle");
        }

        // Toggle visibility of informationPart on click
        statusIcon.addEventListener('click', () => {
            if (timelineContent.style.visibility === 'hidden') {
                timelineContent.style.visibility = 'visible';
            } else {
                timelineContent.style.visibility = 'hidden';
            }
        });

        if(isNotice){
            timelineContent.innerHTML = `
            <div class="timeline-content">
                <p><strong>Starting from:</strong> ${object.startDate.toLocaleString()}</p>
                <p><strong>Ending at:</strong> ${object.endDate.toLocaleString()}</p>
                <p><strong>Language:</strong> ${object.language}</p>
            </div>
        `;
        } else {
            timelineContent.innerHTML = `
            <div class="timeline-content">
                <p><strong>Type:</strong> ${object.type}</p>
                <p><strong>Time:</strong> ${new Date(object.indicatedAtTime).toLocaleString()}</p>
            </div>
        `;
        }
        timelineContent.style.visibility = 'visible';
        timelineItem.appendChild(statusIcon);

        informationPart.appendChild(timelineItem);
        informationPart.appendChild(timelineContent);
        timelineItems.appendChild(informationPart);
    });

    timeline.appendChild(timelineTitle);
    timeline.appendChild(timelineItems);

    return timeline;
}
