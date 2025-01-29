document.addEventListener("DOMContentLoaded", () => {
    fetch("https://Tcup987.github.io/dndcampaign/world.json")
        .then(response => response.json())
        .then(data => {
            console.log("World data loaded:", data); // Debugging

            populateSection("organizations-list", data.Organizations);
            populateSection("people-list", data.People);
            populateSection("places-list", data.Places);

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
            imageElement.src = value.image;
            imageElement.alt = key;
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

// Generate auto-links for proper nouns after content is inserted
function setupLinks() {
    console.log("Setting up links for proper nouns.");
    
    const headings = document.querySelectorAll("h3");
    const knownTerms = new Set();

    // Collect all known terms from headings
    headings.forEach(el => knownTerms.add(el.textContent));

    // Update each paragraph to replace matching terms with links
    document.querySelectorAll(".entry p").forEach(paragraph => {
        let text = paragraph.innerHTML;

        knownTerms.forEach(term => {
            const termId = term.replace(/\s+/g, "-").toLowerCase();
            const regex = new RegExp(`\\b${term}\\b`, "g");
            text = text.replace(regex, `<a href="#${termId}">${term}</a>`);
        });

        paragraph.innerHTML = text; // Apply updated text with links
    });
}
