document.addEventListener("DOMContentLoaded", function () {

    const worldEvents = [
        { title: "Fall of the Seraphid Dominion", date: "354", position: "above" },
        { title: "Torgatine Empire Founded", date: "501", position: "below" },
        { title: "Atharnac Destroyed", date: "757", position: "above" }
    ];

    const campaignEvents = [
        { title: "Party Forms in Kamtor", date: "760-04-01", position: "above" },
        { title: "Undead Attack Kamtor", date: "760-04-01", position: "below" },
        { title: "Destroyed Undead in Nahir Forest", date: "760-04-03", position: "above" }
    ];

    generateTimeline("world-timeline", worldEvents, "354", "760");
    generateTimeline("campaign-timeline", campaignEvents, "760-04-01", "760-05-03");
});


function dateToDays(dateStr) {
    const [year, month, day] = dateStr.split("-").map(Number);
    return year * 365 + (month - 1) * 30 + (day - 1); // Approximate month lengths
}

function generateTimeline(timelineId, events, startDate, endDate) {
    const timeline = document.getElementById(timelineId);
    const pixelsPerDay = timeline.clientWidth / (dateToDays(endDate) - dateToDays(startDate));

    timeline.innerHTML = ""; // Clear previous content

    events.forEach(event => {
        const eventWrapper = document.createElement("div");
        eventWrapper.classList.add("event");

        if (event.start && event.end) {
            // Multi-day event
            eventWrapper.classList.add("range");
            eventWrapper.style.left = `${(dateToDays(event.start) - dateToDays(startDate)) * pixelsPerDay}px`;
            eventWrapper.style.width = `${(dateToDays(event.end) - dateToDays(event.start)) * pixelsPerDay}px`;
            eventWrapper.innerHTML = `<span class="event-title">${event.title} (${event.start} - ${event.end})</span>`;
        } else {
            // Single-day event
            eventWrapper.classList.add(event.position);
            eventWrapper.style.left = `${(dateToDays(event.date) - dateToDays(startDate)) * pixelsPerDay}px`;
            eventWrapper.innerHTML = `
                <span class="event-title">${event.title} (${event.date})</span>
                <div class="event-dot"></div>
            `;
        }

        timeline.appendChild(eventWrapper);
    });
}
