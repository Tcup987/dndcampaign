document.addEventListener("DOMContentLoaded", function () {
    const worldEvents = [
        { title: "Fall of the Seraphid Dominion", date: "354", position: "above" },
        { title: "Torgatine Empire Founded", date: "501", position: "below" },
        { title: "Civil War Begins", date: "749", position: "above" },
        { title: "Atharnac Destroyed", date: "757", position: "below" }
    ];

    const campaignEvents = [
        { title: "Party Forms in Kamtor", date: "760-04-01", position: "below" },
        { title: "Destroyed Undead in Nahir Forest", date: "760-04-03", position: "above" },
        { title: "Arrived in Riverseed", date: "760-04-08", position: "below" },
        { title: "Arrived at War Front", date: "760-04-15", position: "above" },
        { title: "Defeated Auntie Annie", date: "760-04-20", position: "below" },
        { title: "Met Drayden", date: "760-04-21", position: "above" },
        { title: "Returned to the Republic", date: "760-05-01", position: "below" },
        { title: "Entered Khal'Sinar", date: "760-05-03", position: "above" }
    ];

    generateTimeline("world-timeline", worldEvents, 354, 760, true);
    generateTimeline("campaign-timeline", campaignEvents, "760-04-01", "760-05-03", false);
});


function dateToDays(dateStr) {
    if (dateStr.includes("-")) {
        // Full date format YYYY-MM-DD
        const [year, month, day] = dateStr.split("-").map(Number);
        return year * 365 + (month - 1) * 30 + (day - 1); // Approximate month lengths
    } else {
        // Year only format
        return parseInt(dateStr, 10) * 365;
    }
}

function generateTimeline(timelineId, events, startDate, endDate, isWorldTimeline) {
    const timeline = document.getElementById(timelineId);
    const timelineWidth = timeline.clientWidth;
    
    const startDays = isWorldTimeline ? startDate * 365 : dateToDays(startDate);
    const endDays = isWorldTimeline ? endDate * 365 : dateToDays(endDate);

    const pixelsPerDay = timelineWidth / (endDays - startDays);

    timeline.innerHTML = ""; // Clear previous content

    events.forEach(event => {
        const eventWrapper = document.createElement("div");
        eventWrapper.classList.add("event");

        const eventPosition = isWorldTimeline ? parseInt(event.date, 10) * 365 : dateToDays(event.date);
        const leftPosition = (eventPosition - startDays) * pixelsPerDay;

        eventWrapper.classList.add(event.position);
        eventWrapper.style.left = `${leftPosition}px`;
        eventWrapper.innerHTML = `
            <span class="event-title">${event.title} (${event.date})</span>
            <div class="event-dot"></div>
        `;

        timeline.appendChild(eventWrapper);
    });
}
