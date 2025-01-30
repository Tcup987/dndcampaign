document.addEventListener("DOMContentLoaded", () => {
    fetch("https://Tcup987.github.io/dndcampaign/party.json")
        .then(response => response.json())
        .then(data => {
            console.log("World data loaded:", data); // Debugging
            
            populateSection("party-list", data.Party);

            setupLinks(); // Run after populating sections
        })
        .catch(error => console.error("Error loading world data:", error));
});

// Populate a section with properly formatted entries
function populateSection(containerId, categoryData) {
    const container = document.getElementById(containerId);
    if (!container) {
        console.error(`Container ${containerId} not found.`);
        return;
    }

    for (const [title, entry] of Object.entries(categoryData)) {
        const entryDiv = document.createElement("div");
        entryDiv.classList.add("entry");

        const titleElement = document.createElement("h3");
        titleElement.id = title.replace(/\s+/g, "-").toLowerCase(); // ID for linking
        titleElement.textContent = title;

        if (entry.image) {
            const imageElement = document.createElement("img");
            imageElement.src = entry.image;
            imageElement.alt = title;
            imageElement.classList.add("entry-image");
            entryDiv.appendChild(imageElement);
        }

        const contentElement = document.createElement("p");
        contentElement.innerHTML = entry.description; // Insert raw description

        entryDiv.appendChild(titleElement);
        entryDiv.appendChild(contentElement);
        container.appendChild(entryDiv);
    }
    
}
