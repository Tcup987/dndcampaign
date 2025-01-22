document.addEventListener("DOMContentLoaded", () => {
    console.log("DOM fully loaded and parsed");
    setupLinks(); // Ensure the setupLinks function runs here

// Fetch JSON data and initialize the world info page
fetch("world-info.json")
    .then((response) => response.json())
    .then((data) => {
        populateWorldInfo(data);
        enableDynamicLinks(data);
    });

// Populate sections with world info
function populateWorldInfo(data) {
    const organizationsList = document.getElementById("organizations-list");
    const peopleList = document.getElementById("people-list");
    const placesList = document.getElementById("places-list");

    populateList(organizationsList, data.Organizations);
    populateList(peopleList, data.People);
    populateList(placesList, data.Places);
}

// Helper to populate a list with clickable items
function populateList(listElement, categoryData) {
    for (const [key, value] of Object.entries(categoryData)) {
        const listItem = document.createElement("li");
        const link = document.createElement("a");
        link.href = "#";
        link.textContent = key;
        link.dataset.key = key;
        listItem.appendChild(link);
        listElement.appendChild(listItem);
    }
}

// Handle dynamic links for proper nouns
function enableDynamicLinks(data) {
    const allLinks = document.querySelectorAll("a[data-key]");
    allLinks.forEach((link) => {
        link.addEventListener("click", (e) => {
            e.preventDefault();
            const key = link.dataset.key; // Get the proper noun
            const category = findCategory(data, key); // Find its category
            if (category) {
                console.log(`Showing details for: ${key}`);
                displayDetails(key, data[category][key]);
            } else {
                console.error(`Key "${key}" not found in any category.`);
            }
        });
    });
}


// Find the category (Organizations, People, Places) for a key
function findCategory(data, key) {
    for (const category of Object.keys(data)) {
        if (data[category][key]) {
            return category;
        }
    }
    return null;
}

// Display detailed info in the detail view
function displayDetails(title, content) {
    const detailView = document.getElementById("detail-view");
    const detailTitle = document.getElementById("detail-title");
    const detailContent = document.getElementById("detail-content");

    console.log("Detail View Elements:", detailView, detailTitle, detailContent);

    if (detailView && detailTitle && detailContent) {
        detailTitle.textContent = title; // Set the title
        detailContent.textContent = content; // Set the description
        detailView.classList.remove("hidden"); // Make the detail view visible
        console.log("Details updated: ", title, content);
    } else {
        console.error("Detail view elements are missing in the HTML.");
    }
}

// Close detail view
document.getElementById("close-detail").addEventListener("click", () => {
    document.getElementById("detail-view").classList.add("hidden");
});
});