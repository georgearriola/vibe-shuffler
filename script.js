// Define variables but don't load sound yet
let bgMusic, shuffleSound, apiSound, clearSound;

const startBtn = document.getElementById('startBtn');
const overlay = document.getElementById('overlay');
const video = document.getElementById('bgVideo');

startBtn.addEventListener('click', () => {
    // 1. INITIALIZE AUDIO OBJECTS ON CLICK (Chrome High-Trust Method)
    bgMusic = new Audio('https://www.soundjay.com/nature/sounds/rain-03.mp3');
    shuffleSound = new Audio('https://www.soundjay.com/buttons/sounds/button-16.mp3');
    apiSound = new Audio('https://www.soundjay.com/buttons/sounds/button-3.mp3');
    clearSound = new Audio('https://www.soundjay.com/buttons/sounds/button-10.mp3');

    // 2. Setup Loop & Play
    bgMusic.loop = true;
    bgMusic.volume = 0.2;
    bgMusic.play().catch(e => console.log("Still blocked by Chrome settings"));
    
    // 3. Force Video
    video.play();

    // 4. Hide Overlay
    overlay.style.opacity = '0';
    setTimeout(() => { overlay.style.display = 'none'; }, 500);
});

// API BUTTON
document.getElementById('apiBtn').addEventListener('click', async () => {
    if (apiSound) apiSound.play();
    try {
        const res = await fetch('https://randomuser.me/api/?results=5');
        const data = await res.json();
        document.getElementById('nameInput').value += data.results.map(u => `${u.name.first} ${u.name.last}`).join('\n') + '\n';
    } catch (e) { console.log(e); }
});

// SHUFFLE BUTTON
document.getElementById('shuffleBtn').addEventListener('click', () => {
    if (shuffleSound) shuffleSound.play();
    let names = document.getElementById('nameInput').value.split('\n').filter(n => n.trim() !== "");
    if (names.length === 0) return;
    names.sort(() => Math.random() - 0.5);
    document.getElementById('nameList').innerHTML = names.map(n => `<li>${n}</li>`).join('');
});

// CLEAR BUTTON
document.getElementById('clearBtn').addEventListener('click', () => {
    if (clearSound) clearSound.play();
    document.getElementById('nameInput').value = "";
    document.getElementById('nameList').innerHTML = "";
});
