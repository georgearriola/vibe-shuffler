let audioCtx;

const startBtn = document.getElementById('startBtn');
const overlay = document.getElementById('overlay');
const video = document.getElementById('bgVideo');

// FUNCTION: Create a synthetic button "Blip"
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

// FUNCTION: Create a synthetic background "Zen Hum"
function startZenHum() {
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = 'triangle'; 
    osc.frequency.setValueAtTime(60, audioCtx.currentTime); // Deep hum
    gain.gain.setValueAtTime(0.05, audioCtx.currentTime); // Very quiet
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start();
}

startBtn.addEventListener('click', function() {
    // 1. Initialize the Web Audio API
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    audioCtx = new AudioContext();
    audioCtx.resume();

    // 2. Start the synthetic background sound
    startZenHum();
    playBlip(660, 0.2); // Start sound

    // 3. Play Video
    if (video) {
        video.muted = false; // Try to un-mute the rain video too
        video.play().catch(() => console.log("Video audio still blocked"));
    }

    // 4. UI Transition
    overlay.style.opacity = '0';
    setTimeout(() => {
        overlay.style.display = 'none';
    }, 600);
});

// API BUTTON
document.getElementById('apiBtn').addEventListener('click', async () => {
    playBlip(880, 0.05);
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
    playBlip(550, 0.1);
    
    const input = document.getElementById('nameInput');
    const list = document.getElementById('nameList');
    let names = input.value.split('\n').filter(n => n.trim() !== "");
    
    if (names.length === 0) return;
    
    names.sort(() => Math.random() - 0.5);
    
    list.innerHTML = "";
    names.forEach((name, index) => {
        setTimeout(() => {
            playBlip(1000 + (index * 100), 0.05); // Musical ascending blips
            const li = document.createElement('li');
            li.textContent = name;
            list.appendChild(li);
        }, index * 80);
    });
});

// CLEAR BUTTON
document.getElementById('clearBtn').addEventListener('click', () => {
    playBlip(220, 0.3); // Lower sound for clearing
    document.getElementById('nameInput').value = "";
    document.getElementById('nameList').innerHTML = "";
});
