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
        { title: "Destroyed Undead in Nahir Forest", start: 760 + (2*day), position: "above" }
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
        const eventElement = document.createElement("div");
        eventElement.classList.add("event");

        if (event.start && event.end) {
            // Stretching event (multi-year event)
            eventElement.classList.add("range");
            eventElement.style.left = `${(event.start - startYear) * pixelsPerYear}px`;
            eventElement.style.width = `${(event.end - event.start) * pixelsPerYear}px`;
            eventElement.innerHTML = `<div class="tooltip">${event.title} (${event.start} - ${event.end})</div>`;
        } else {
            // Single event
            eventElement.classList.add(event.position);
            eventElement.style.left = `${(event.year - startYear) * pixelsPerYear}px`;
            eventElement.innerHTML = `<strong>${event.title}</strong><div class="tooltip">${event.title} (${event.year})</div>`;
        }

        timeline.appendChild(eventElement);
    });
}
