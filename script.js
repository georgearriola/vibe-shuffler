const shuffleBtn = document.getElementById('shuffleBtn');
const clearBtn = document.getElementById('clearBtn');
const apiBtn = document.getElementById('apiBtn');
const nameInput = document.getElementById('nameInput');
const nameList = document.getElementById('nameList');

// Audio Elements
const shuffleSound = document.getElementById('shuffleSound');
const apiSound = document.getElementById('apiSound');
const clearSound = document.getElementById('clearSound');
const bgMusic = document.getElementById('bgMusic');

/**
 * GITHUB INTERACTION LOGIC
 * Browsers block music until the user interacts.
 * This function triggers as soon as the user clicks anywhere on your GitHub Page.
 */
const startAppExperience = () => {
    // Start background music softly
    bgMusic.volume = 0.15; 
    bgMusic.play().catch(e => console.log("Waiting for user interaction to play music."));

    // Prime the SFX sounds so they play instantly later
    [shuffleSound, apiSound, clearSound].forEach(s => {
        s.play().then(() => { s.pause(); s.currentTime = 0; }).catch(() => {});
    });

    // Ensure video is playing (GitHub Pages sometimes pauses it to save data)
    const video = document.getElementById('bgVideo');
    if (video.paused) video.play();

    document.removeEventListener('click', startAppExperience);
};
document.addEventListener('click', startAppExperience);

// 1. DATA API FEATURE: Load names from external source
apiBtn.addEventListener('click', async () => {
    apiSound.currentTime = 0;
    apiSound.play().catch(() => {});
    
    apiBtn.textContent = "Connecting...";
    try {
        const response = await fetch('https://randomuser.me/api/?results=5');
        const data = await response.json();
        const names = data.results.map(u => `${u.name.first} ${u.name.last}`);
        nameInput.value += (nameInput.value ? "\n" : "") + names.join("\n");
        apiBtn.textContent = "Load Random Users (API)";
    } catch (err) {
        apiBtn.textContent = "API Error";
    }
});

// 2. CORE LOGIC: Shuffle with Sound and Animation
shuffleBtn.addEventListener('click', () => {
    let names = nameInput.value.split('\n').map(n => n.trim()).filter(n => n !== "");
    if (names.length === 0) return;

    shuffleSound.currentTime = 0;
    shuffleSound.play().catch(() => {});

    // Fisher-Yates Shuffle
    for (let i = names.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [names[i], names[j]] = [names[j], names[i]];
    }

    // Clear and re-populate with staggered animation
    nameList.innerHTML = "";
    names.forEach((name, i) => {
        setTimeout(() => {
            const li = document.createElement('li');
            li.textContent = name;
            nameList.appendChild(li);
        }, i * 80);
    });
});

// 3. CLEAR LOGIC: Empty everything
clearBtn.addEventListener('click', () => {
    clearSound.currentTime = 0;
    clearSound.play().catch(() => {});
    nameInput.value = "";
    nameList.innerHTML = "";
});
