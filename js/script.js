// AOS Initialization
AOS.init({
    duration: 800,
    once: true,
    offset: 100
});

// Dark Mode Toggle with Local Storage
const toggle = document.getElementById('darkmode-toggle');
const body = document.body;

if (localStorage.getItem('darkmode') === 'enabled') {
    body.classList.add('dark');
    toggle.checked = true;
}

toggle.addEventListener('change', () => {
    if (toggle.checked) {
        body.classList.add('dark');
        localStorage.setItem('darkmode', 'enabled');
    } else {
        body.classList.remove('dark');
        localStorage.setItem('darkmode', 'disabled');
    }
});

// Smooth Scroll for navigation links
document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// Project Filtering
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Update active button
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filterValue = btn.getAttribute('data-filter');

        projectCards.forEach(card => {
            if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });
});

// Modal functionality
const modal = document.getElementById('project-modal');
const modalBody = document.getElementById('modal-body');
const closeModal = document.querySelector('.close-modal');

// Project details data (you can expand or fetch from a database)
const projectDetails = {
    1: {
        title: "Smart Sensor Hub",
        description: "A low-power wireless sensor node using STM32 and LoRa. Collects temperature, humidity, and air quality data and transmits to a gateway. Implemented with FreeRTOS.",
        technologies: ["STM32", "LoRa", "FreeRTOS", "C"],
        category: "Embedded"
    },
    2: {
        title: "Home Automation",
        description: "ESP8266-based smart home system using MQTT protocol. Controls lights, fans, and monitors energy consumption via a Node-RED dashboard.",
        technologies: ["ESP8266", "MQTT", "Node-RED", "Arduino"],
        category: "IoT"
    },
    3: {
        title: "Portfolio Website",
        description: "Modern responsive portfolio with dark mode, project filtering, modal popups, and AOS animations. Built with HTML, CSS, and JavaScript.",
        technologies: ["HTML", "CSS", "JavaScript", "AOS"],
        category: "Web"
    }
};

// Open modal when "Details" clicked
document.querySelectorAll('.modal-trigger').forEach(btn => {
    btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        const project = projectDetails[id];
        if (project) {
            modalBody.innerHTML = `
                <h2>${project.title}</h2>
                <p><strong>Category:</strong> ${project.category}</p>
                <p>${project.description}</p>
                <p><strong>Technologies:</strong> ${project.technologies.join(', ')}</p>
            `;
            modal.style.display = 'flex';
        }
    });
});

// Close modal
closeModal.addEventListener('click', () => {
    modal.style.display = 'none';
});

window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
    }
});

// Handle form submission via Formspree (or your own backend)
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = new FormData(contactForm);
        try {
            const response = await fetch(contactForm.action, {
                method: 'POST',
                body: formData,
                headers: { 'Accept': 'application/json' }
            });
            if (response.ok) {
                alert('Message sent successfully!');
                contactForm.reset();
            } else {
                alert('There was a problem. Please try again.');
            }
        } catch (err) {
            alert('Network error. Please check your connection.');
        }
    });
}