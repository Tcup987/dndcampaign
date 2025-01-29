document.addEventListener("DOMContentLoaded", () => {
    fetch("data/world.json")
        .then(response => response.json())
        .then(data => {
            populateSection("organizations-list", data.Organizations);
            populateSection("people-list", data.People);
            populateSection("places-list", data.Places);
        })
        .catch(error => console.error("Error loading data:", error));
});

// Populate a section with properly formatted entries
function populateSection(containerId, categoryData) {
    const container = document.getElementById(containerId);
    if (!container) return;

    for (const [title, entry] of Object.entries(categoryData)) {
        const entryDiv = document.createElement("div");
        entryDiv.classList.add("entry");

        const titleElement = document.createElement("h3");
        titleElement.id = title.replace(/\s+/g, "-").toLowerCase(); // ID for linking
        titleElement.textContent = title;

        const contentElement = document.createElement("p");
        contentElement.innerHTML = generateLinks(entry.description);

        entryDiv.appendChild(titleElement);
        entryDiv.appendChild(contentElement);
        container.appendChild(entryDiv);
    }
}

// Generate links for proper nouns found in the text
function generateLinks(text) {
    const knownTerms = new Set();
    document.querySelectorAll("h3").forEach(el => knownTerms.add(el.textContent));

    return text.replace(/\[([^\]]+)\]/g, (match, term) => {
        if (knownTerms.has(term)) {
            return `<a href="#${term.replace(/\s+/g, "-").toLowerCase()}">${term}</a>`;
        }
        return term;
    });
}
