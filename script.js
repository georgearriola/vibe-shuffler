const overlay = document.getElementById('overlay');
const startBtn = document.getElementById('startBtn');
const shuffleBtn = document.getElementById('shuffleBtn');
const clearBtn = document.getElementById('clearBtn');
const apiBtn = document.getElementById('apiBtn');
const nameInput = document.getElementById('nameInput');
const nameList = document.getElementById('nameList');

const shuffleSound = document.getElementById('shuffleSound');
const apiSound = document.getElementById('apiSound');
const clearSound = document.getElementById('clearSound');
const bgMusic = document.getElementById('bgMusic');

// Audio Activation for Chrome/Safari
startBtn.addEventListener('click', () => {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (AudioContext) { new AudioContext().resume(); }

    bgMusic.volume = 0.15;
    bgMusic.play();

    overlay.style.opacity = '0';
    setTimeout(() => overlay.style.display = 'none', 500);
});

// API Fetch
apiBtn.addEventListener('click', async () => {
    apiSound.currentTime = 0;
    apiSound.play().catch(() => {});
    apiBtn.textContent = "Fetching...";
    try {
        const res = await fetch('https://randomuser.me/api/?results=5');
        const data = await res.json();
        const names = data.results.map(u => `${u.name.first} ${u.name.last}`);
        nameInput.value += (nameInput.value ? "\n" : "") + names.join("\n");
        apiBtn.textContent = "Load Random Users (API)";
    } catch (err) { apiBtn.textContent = "API Error"; }
});

// Shuffle Logic
shuffleBtn.addEventListener('click', () => {
    let names = nameInput.value.split('\n').map(n => n.trim()).filter(n => n !== "");
    if (names.length === 0) return;

    shuffleSound.currentTime = 0;
    shuffleSound.play().catch(() => {});

    for (let i = names.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [names[i], names[j]] = [names[j], names[i]];
    }

    nameList.innerHTML = "";
    names.forEach((name, i) => {
        setTimeout(() => {
            const li = document.createElement('li');
            li.textContent = name;
            nameList.appendChild(li);
        }, i * 80);
    });
});

// Clear Logic
clearBtn.addEventListener('click', () => {
    clearSound.currentTime = 0;
    clearSound.play().catch(() => {});
    nameInput.value = "";
    nameList.innerHTML = "";
});
