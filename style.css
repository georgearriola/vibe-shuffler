const startBtn = document.getElementById('startBtn');
const overlay = document.getElementById('overlay');
const shuffleBtn = document.getElementById('shuffleBtn');
const clearBtn = document.getElementById('clearBtn');
const apiBtn = document.getElementById('apiBtn');
const nameInput = document.getElementById('nameInput');
const nameList = document.getElementById('nameList');

const shuffleSound = document.getElementById('shuffleSound');
const apiSound = document.getElementById('apiSound');
const clearSound = document.getElementById('clearSound');
const bgMusic = document.getElementById('bgMusic');
const video = document.getElementById('bgVideo');

// POWERFUL WAKE-UP FUNCTION
startBtn.addEventListener('click', () => {
    // 1. Force Resume Audio Context for Chrome
    const context = new (window.AudioContext || window.webkitAudioContext)();
    if (context.state === 'suspended') {
        context.resume();
    }

    // 2. Play Audio
    bgMusic.volume = 0.2;
    bgMusic.play().then(() => console.log("Audio playing")).catch(err => console.log("Audio blocked"));

    // 3. Force Video Play
    video.play().then(() => console.log("Video playing")).catch(err => console.log("Video blocked"));

    // 4. Close Overlay
    overlay.style.opacity = '0';
    setTimeout(() => {
        overlay.style.visibility = 'hidden';
    }, 800);
});

// Re-check Video (Sometimes Chrome pauses it randomly)
setInterval(() => {
    if (overlay.style.visibility === 'hidden' && video.paused) {
        video.play().catch(() => {});
    }
}, 1000);

// API BUTTON
apiBtn.addEventListener('click', async () => {
    apiSound.play().catch(() => {});
    apiBtn.textContent = "Loading...";
    try {
        const res = await fetch('https://randomuser.me/api/?results=5');
        const data = await res.json();
        const names = data.results.map(u => `${u.name.first} ${u.name.last}`);
        nameInput.value += (nameInput.value ? "\n" : "") + names.join("\n");
        apiBtn.textContent = "Load Random Users (API)";
    } catch (e) { apiBtn.textContent = "Error"; }
});

// SHUFFLE BUTTON
shuffleBtn.addEventListener('click', () => {
    let names = nameInput.value.split('\n').map(n => n.trim()).filter(n => n !== "");
    if (names.length === 0) return;
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

// CLEAR BUTTON
clearBtn.addEventListener('click', () => {
    clearSound.play().catch(() => {});
    nameInput.value = "";
    nameList.innerHTML = "";
});
