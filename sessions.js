// Array to store session data
let sessions = [];

// References to HTML elements
const sessionsContainer = document.getElementById('sessionsContainer');
const addSessionBtn = document.getElementById('addSessionBtn');

// Add a new session dynamically
addSessionBtn.addEventListener('click', () => {
    const sessionNumber = sessions.length + 1;
    const sessionDate = new Date().toLocaleDateString();
    const sessionContent = prompt('Enter session details:'); // Replace this with a more advanced input method if needed

    if (sessionContent) {
        const session = {
            number: sessionNumber,
            date: sessionDate,
            content: sessionContent,
        };
        sessions.push(session);
        renderSessions();
    }
});

// Render sessions in the container
function renderSessions() {
    sessionsContainer.innerHTML = ''; // Clear container
    sessions.reverse().forEach((session) => {
        const sessionElement = document.createElement('div');
        sessionElement.classList.add('session');

        sessionElement.innerHTML = `
            <button class="collapsible">Session ${session.number} - ${session.date}</button>
            <div class="content">
                <p>${session.content}</p>
            </div>
        `;

        sessionsContainer.appendChild(sessionElement);
    });

    // Add functionality to collapsible buttons
    addCollapsibleBehavior();
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
localStorage.setItem('sessions', JSON.stringify(sessions));
sessions = JSON.parse(localStorage.getItem('sessions')) || [];


// Initial render (empty at first)
renderSessions();
