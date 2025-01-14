// References to HTML elements
const sessionsContainer = document.getElementById('sessionsContainer');
const sessionForm = document.getElementById('sessionForm');

// Retrieve sessions from local storage or initialize an empty array
let sessions = JSON.parse(localStorage.getItem('sessions')) || [];

// Add a new session
sessionForm.addEventListener('submit', (e) => {
    e.preventDefault(); // Prevent form submission from reloading the page

    const sessionNumber = document.getElementById('sessionNumber').value.trim();
    const sessionDate = document.getElementById('sessionDate').value.trim();
    const sessionContent = document.getElementById('sessionContent').value.trim();

    if (sessionNumber && sessionDate && sessionContent) {
        const session = {
            number: sessionNumber,
            date: sessionDate,
            content: sessionContent,
        };

        console.log("Adding session:", session);

        sessions.push(session);
        saveSessions();
        renderSessions();

        // Clear form inputs
        sessionForm.reset();
    } else {
        alert('Please fill in all fields.');
    }
});

// Save sessions to local storage
function saveSessions() {
    localStorage.setItem('sessions', JSON.stringify(sessions));
    console.log("Sessions saved:", sessions);
}

// Render sessions in the container
function renderSessions() {
    console.log("Rendering sessions...");

    sessionsContainer.innerHTML = ''; // Clear container
    sessions.forEach((session, index) => {
        const sessionElement = document.createElement('div');
        sessionElement.classList.add('session');

        sessionElement.innerHTML = `
            <button class="collapsible">Session ${session.number} - ${session.date}</button>
            <div class="content">
                <p>${session.content}</p>
                <button class="deleteBtn" data-index="${index}">Delete</button>
            </div>
        `;

        sessionsContainer.appendChild(sessionElement);
    });

    // Add functionality to collapsible buttons
    addCollapsibleBehavior();

    // Add functionality to delete buttons
    addDeleteBehavior();
}

// Add collapsible behavior to buttons
function addCollapsibleBehavior() {
    const collapsibles = document.querySelectorAll('.collapsible');
    collapsibles.forEach((collapsible) => {
        collapsible.addEventListener('click', function () {
            this.classList.toggle('active');
            const content = this.nextElementSibling;
            if (content.style.maxHeight) {
                content.style.maxHeight = null;
            } else {
                content.style.maxHeight = content.scrollHeight + 'px';
            }
        });
    });
}

// Add delete functionality
function addDeleteBehavior() {
    const deleteButtons = document.querySelectorAll('.deleteBtn');
    deleteButtons.forEach((button) => {
        button.addEventListener('click', (e) => {
            const index = e.target.getAttribute('data-index');
            console.log("Deleting session at index:", index);
            sessions.splice(index, 1);
            saveSessions();
            renderSessions();
        });
    });
}

// Initial render
renderSessions();
