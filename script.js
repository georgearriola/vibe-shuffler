// Base64 Encoded "Pop" Sound (Works even if external links are blocked)
const popSoundBase64 = "data:audio/wav;base64,UklGRigAAABXQVZFRm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YQQAAAD//wEAAAA=";

let bgMusic, buttonSound;

const startBtn = document.getElementById('startBtn');
const overlay = document.getElementById('overlay');
const video = document.getElementById('bgVideo');

startBtn.addEventListener('click', function() {
    // 1. Initialize Audio
    buttonSound = new Audio(popSoundBase64);
    
    // For Background Music, we use a stable Wikimedia link 
    // but wrap it in a 'try' so it doesn't crash the animations
    try {
        bgMusic = new Audio('https://upload.wikimedia.org/wikipedia/commons/3/30/Rain_on_roof_loop.ogg');
        bgMusic.loop = true;
        bgMusic.volume = 0.2;
        bgMusic.play().catch(() => console.log("BG Music blocked - continuing anyway."));
    } catch (e) {
        console.log("Audio Error:", e);
    }

    // 2. Play Video
    if (video) {
        video.play().catch(() => {});
    }

    // 3. UI Transition
    overlay.style.opacity = '0';
    setTimeout(() => {
        overlay.style.display = 'none';
    }, 600);
});

// API BUTTON
document.getElementById('apiBtn').addEventListener('click', async () => {
    if (buttonSound) buttonSound.play().catch(() => {});
    try {
        const res = await fetch('https://randomuser.me/api/?results=5');
        const data = await res.json();
        const names = data.results.map(u => `${u.name.first} ${u.name.last}`).join('\n');
        document.getElementById('nameInput').value += names + '\n';
    } catch (e) {
        console.log("API Fail:", e);
    }
});

// SHUFFLE BUTTON
document.getElementById('shuffleBtn').addEventListener('click', () => {
    if (buttonSound) {
        buttonSound.currentTime = 0;
        buttonSound.play().catch(() => {});
    }
    
    const input = document.getElementById('nameInput');
    const list = document.getElementById('nameList');
    let names = input.value.split('\n').filter(n => n.trim() !== "");
    
    if (names.length === 0) return;
    
    names.sort(() => Math.random() - 0.5);
    
    list.innerHTML = "";
    names.forEach((name, index) => {
        setTimeout(() => {
            const li = document.createElement('li');
            li.textContent = name;
            list.appendChild(li);
        }, index * 80); // Staggered animation effect
    });
});

// CLEAR BUTTON
document.getElementById('clearBtn').addEventListener('click', () => {
    if (buttonSound) {
        buttonSound.currentTime = 0;
        buttonSound.play().catch(() => {});
    }
    document.getElementById('nameInput').value = "";
    document.getElementById('nameList').innerHTML = "";
});
