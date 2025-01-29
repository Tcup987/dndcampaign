document.addEventListener("DOMContentLoaded", function () {

    const day = 1/365;
    const daysPast = 33;
    const currentDate = 760.33333 + (day * daysPast);

    const worldEvents = [
        { title: "Fall of the Seraphid Dominion", year: 354, position: "above" },
        { title: "Torgatine Empire Founded", year: 501, position: "below" },
        { title: "Atharnac Destroyed", year: 757, position: "above" }
    ];

    const campaignEvents = [
        { title: "Party Forms in Kamtor", year: 760.3333, position: "above" },
        { title: "Undead Attack Kamtor", year: 760.3333, position: "below" },
        { title: "Destroyed Undead in Nahir Forest", year:(760+(2*day)), position: "above" }
    ];

    generateTimeline("world-timeline", worldEvents, 354, 760);
    generateTimeline("campaign-timeline", campaignEvents, 760.3333, currentDate);
});

function generateTimeline(timelineId, events, startYear, endYear) {
    const timeline = document.getElementById(timelineId);
    const timelineWidth = 2000; // Total width in pixels
    const pixelsPerYear = timelineWidth / (endYear - startYear);

    timeline.innerHTML = ""; // Clear any existing content

    events.forEach(event => {
        const eventWrapper = document.createElement("div");
        eventWrapper.classList.add("event");

        if (event.start && event.end) {
            // Multi-year event (stretching across time)
            eventWrapper.classList.add("range");
            eventWrapper.style.left = `${(event.start - startYear) * pixelsPerYear}px`;
            eventWrapper.style.width = `${(event.end - event.start) * pixelsPerYear}px`;
            eventWrapper.innerHTML = `<span class="event-title">${event.title} (${event.start} - ${event.end})</span>`;
        } else {
            // Single event (point)
            eventWrapper.classList.add(event.position);
            eventWrapper.style.left = `${(event.year - startYear) * pixelsPerYear}px`;
            eventWrapper.innerHTML = `
                <span class="event-title">${event.title} (${event.year})</span>
                <div class="event-dot"></div>
            `;
        }

        timeline.appendChild(eventWrapper);
    });
}
