// Global variables for our sounds
let bgMusic, shuffleSound, apiSound, clearSound;

const startBtn = document.getElementById('startBtn');
const overlay = document.getElementById('overlay');
const video = document.getElementById('bgVideo');

startBtn.addEventListener('click', function() {
    // 1. Initialize Audio with high-compatibility Wikimedia/W3 links
    bgMusic = new Audio('https://upload.wikimedia.org/wikipedia/commons/3/30/Rain_on_roof_loop.ogg');
    shuffleSound = new Audio('https://www.w3schools.com/graphics/horse.ogv'); // Using stable web assets
    apiSound = new Audio('https://www.w3schools.com/tags/horse.mp3');
    clearSound = new Audio('https://www.w3schools.com/tags/horse.mp3');

    // 2. Configure Background Music
    bgMusic.loop = true;
    bgMusic.volume = 0.2;
    
    // 3. Play Media
    bgMusic.play().catch(e => console.log("Audio play prevented:", e));
    if (video) {
        video.play().catch(e => console.log("Video play prevented:", e));
    }

    // 4. Smooth UI Transition
    overlay.style.opacity = '0';
    setTimeout(() => {
        overlay.style.display = 'none';
    }, 500);
});

// API BUTTON
document.getElementById('apiBtn').addEventListener('click', async () => {
    if (apiSound) apiSound.play().catch(() => {});
    try {
        const res = await fetch('https://randomuser.me/api/?results=5');
        const data = await res.json();
        const names = data.results.map(u => `${u.name.first} ${u.name.last}`).join('\n');
        document.getElementById('nameInput').value += names + '\n';
    } catch (e) {
        console.log("API Fetch failed", e);
    }
});

// SHUFFLE BUTTON
document.getElementById('shuffleBtn').addEventListener('click', () => {
    if (shuffleSound) {
        shuffleSound.currentTime = 0;
        shuffleSound.play().catch(() => {});
    }
    const input = document.getElementById('nameInput');
    let names = input.value.split('\n').filter(n => n.trim() !== "");
    if (names.length === 0) return;
    
    names.sort(() => Math.random() - 0.5);
    document.getElementById('nameList').innerHTML = names.map(n => `<li>${n}</li>`).join('');
});

// CLEAR BUTTON
document.getElementById('clearBtn').addEventListener('click', () => {
    if (clearSound) {
        clearSound.currentTime = 0;
        clearSound.play().catch(() => {});
    }
    document.getElementById('nameInput').value = "";
    document.getElementById('nameList').innerHTML = "";
});
