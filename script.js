// 1. Declare variables at the very top (Global Scope)
let bgMusic = null;
let shuffleSound = null;
let apiSound = null;
let clearSound = null;

const startBtn = document.getElementById('startBtn');
const overlay = document.getElementById('overlay');
const video = document.getElementById('bgVideo');

// 2. The "Activation" Function
startBtn.addEventListener('click', function() {
    console.log("Activating Media...");

    // Create the Audio objects ONLY after click
    // Using super-compatible MP3 links
    bgMusic = new Audio('https://www.soundjay.com/nature/sounds/rain-03.mp3');
    shuffleSound = new Audio('https://www.soundjay.com/buttons/sounds/button-16.mp3');
    apiSound = new Audio('https://www.soundjay.com/buttons/sounds/button-3.mp3');
    clearSound = new Audio('https://www.soundjay.com/buttons/sounds/button-10.mp3');

    // IMPORTANT: Check if bgMusic exists before setting volume
    if (bgMusic) {
        bgMusic.loop = true;
        bgMusic.volume = 0.15; // This won't be null anymore!
        bgMusic.play().catch(e => console.log("Audio play blocked:", e));
    }

    if (video) {
        video.play().catch(e => console.log("Video play blocked:", e));
    }

    // Hide the overlay
    overlay.style.opacity = '0';
    setTimeout(() => {
        overlay.style.display = 'none';
    }, 500);
});

// 3. API Button
document.getElementById('apiBtn').addEventListener('click', async () => {
    if (apiSound) apiSound.play().catch(() => {});
    
    try {
        const res = await fetch('https://randomuser.me/api/?results=5');
        const data = await res.json();
        const names = data.results.map(u => `${u.name.first} ${u.name.last}`).join('\n');
        document.getElementById('nameInput').value += names + '\n';
    } catch (e) {
        console.log("API Error:", e);
    }
});

// 4. Shuffle Button
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

// 5. Clear Button
document.getElementById('clearBtn').addEventListener('click', () => {
    if (clearSound) {
        clearSound.currentTime = 0;
        clearSound.play().catch(() => {});
    }
    document.getElementById('nameInput').value = "";
    document.getElementById('nameList').innerHTML = "";
});
