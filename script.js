// 1. SCROLL REVEAL LOGIC
// This watches elements and fades them in smoothly when they enter the screen
const observerOptions = {
    threshold: 0.15 // Triggers when 15% of the element is visible on screen
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        }
    });
}, observerOptions);

// Tell the observer to watch all sections with the 'hidden' class
document.querySelectorAll('.hidden').forEach((section) => {
    observer.observe(section);
});

// 2. ADVANCED PARTICLE ENGINE
const canvas = document.getElementById('particle-canvas');
const emojis = ['❤️', '✨', '💖', '💫', '🦋'];

// Function to generate a single floating particle
function createParticle(x, y) {
    const particle = document.createElement('div');
    particle.classList.add('heart-particle');
    particle.innerText = emojis[Math.floor(Math.random() * emojis.length)];
    
    // If coordinates are provided (by the mouse), spawn there. 
    // Otherwise, spawn randomly at the bottom of the screen.
    if (x!== undefined && y!== undefined) {
        particle.style.left = x + 'px';
        particle.style.top = y + 'px';
    } else {
        particle.style.left = Math.random() * 100 + 'vw';
        particle.style.bottom = '-50px'; 
    }

    // Randomize the size and animation speed
    const size = Math.random() * 1.5 + 0.8;
    particle.style.transform = `scale(${size})`;
    particle.style.animationDuration = (Math.random() * 5 + 4) + 's';
    
    canvas.appendChild(particle);

    // Delete the particle after 8 seconds so the browser doesn't crash from memory overload
    setTimeout(() => {
        particle.remove();
    }, 8000);
}

// Automatically spawn an ambient particle every 400 milliseconds
setInterval(() => createParticle(), 400);

// 3. MOUSE TRACKING INTERACTIVITY
// Spawns particles that trail behind the cursor
let lastSpawnTime = 0;

window.addEventListener('mousemove', (e) => {
    const currentTime = Date.now();
    // Throttle the spawn rate to every 60ms to keep the site running perfectly smooth
    if (currentTime - lastSpawnTime > 60) {
        // Add a slight random scatter to the mouse coordinates
        const scatterX = e.clientX + (Math.random() * 40 - 20);
        const scatterY = e.clientY + (Math.random() * 40 - 20);
        createParticle(scatterX, scatterY);
        lastSpawnTime = currentTime;
    }
});

// Touch support for mobile devices
window.addEventListener('touchmove', (e) => {
    const touch = e.touches;
    const currentTime = Date.now();
    if (currentTime - lastSpawnTime > 60) {
        createParticle(touch.clientX, touch.clientY);
        lastSpawnTime = currentTime;
    }
});