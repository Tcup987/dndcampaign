document.addEventListener("DOMContentLoaded", function () {

    const day = 1/365;
    const daysPast = 33;
    const currentDate = 760.33333 + (day * daysPast);

    const worldEvents = [
        { title: "Fall of the Seraphid Dominion", year: 354, position: "above" },
        { title: "Torgatine Empire Founded", year: 501, position: "below" },
        { title: "Atharnac Destroyed", year: 757, position: "below" },
        { title: "The ", start: 200, end: 240, position: "above" }
    ];

    const campaignEvents = [
        { title: "Party Forms in Kamtor", year: 760.3333, position: "above" },
        { title: "Undead Attack Kamtor", year: 760.3333, position: "below" },
        { title: "Destroyed Undead in Nahir Forest", start: 760 + (2*day), position: "above" }
    ];

    generateTimeline("world-timeline", worldEvents, 354, 760);
    generateTimeline("campaign-timeline", campaignEvents, 760.3333,currentDate);
});

function generateTimeline(timelineId, events, start, end) {
    const timeline = document.getElementById(timelineId);
    const startYear = start; // Earliest event
    const endYear = end; // Latest event
    const timelineWidth = 2000; // Pixels
    const pixelsPerYear = timelineWidth / (endYear - startYear);

    events.forEach(event => {
        const eventElement = document.createElement("div");

        if (event.start && event.end) {
            // Stretching Event
            eventElement.classList.add("event", "range");
            eventElement.style.left = `${(event.start - startYear) * pixelsPerYear}px`;
            eventElement.style.width = `${(event.end - event.start) * pixelsPerYear}px`;
            eventElement.innerHTML = `<div class="tooltip">${event.title} (${event.start} - ${event.end})</div>`;
        } else {
            // Single Event
            eventElement.classList.add("event", event.position);
            eventElement.style.left = `${(event.year - startYear) * pixelsPerYear}px`;
            eventElement.innerHTML = `<strong>${event.title}</strong> <div class="tooltip">${event.title} (${event.year})</div>`;
        }

        timeline.appendChild(eventElement);
    });
}
