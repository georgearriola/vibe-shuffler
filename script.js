let audioCtx;
const startBtn = document.getElementById('startBtn');
const overlay = document.getElementById('overlay');
const video = document.getElementById('bgVideo');

// Generate a synthetic "Blip" sound
function playBlip(freq = 440, duration = 0.1) {
    if (!audioCtx) return;
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
    gain.gain.setValueAtTime(0.1, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + duration);
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start();
    osc.stop(audioCtx.currentTime + duration);
}

startBtn.addEventListener('click', function() {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    audioCtx = new AudioContext();
    audioCtx.resume();

    if (video) {
        video.muted = false; // Unmute the ocean video
        video.volume = 0.4;
        video.play().catch(() => {});
    }

    playBlip(600, 0.2); // Start sound
    overlay.style.opacity = '0';
    setTimeout(() => { overlay.style.display = 'none'; }, 600);
});

// API BUTTON
document.getElementById('apiBtn').addEventListener('click', async () => {
    playBlip(800, 0.05);
    try {
        const res = await fetch('https://randomuser.me/api/?results=5');
        const data = await res.json();
        const names = data.results.map(u => `${u.name.first} ${u.name.last}`).join('\n');
        document.getElementById('nameInput').value += names + '\n';
    } catch (e) { console.error(e); }
});

// SHUFFLE BUTTON
document.getElementById('shuffleBtn').addEventListener('click', () => {
    playBlip(500, 0.1);
    const input = document.getElementById('nameInput');
    const list = document.getElementById('nameList');
    let names = input.value.split('\n').filter(n => n.trim() !== "");
    
    if (names.length === 0) return;
    names.sort(() => Math.random() - 0.5);
    
    list.innerHTML = "";
    names.forEach((name, index) => {
        setTimeout(() => {
            playBlip(900 + (index * 50), 0.05);
            const li = document.createElement('li');
            li.textContent = name;
            list.appendChild(li);
        }, index * 80);
    });
});

// CLEAR BUTTON
document.getElementById('clearBtn').addEventListener('click', () => {
    playBlip(300, 0.2);
    document.getElementById('nameInput').value = "";
    document.getElementById('nameList').innerHTML = "";
});
