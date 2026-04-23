const startBtn = document.getElementById('startBtn');
const overlay = document.getElementById('overlay');
const bgVideo = document.getElementById('bgVideo');
const bgMusic = document.getElementById('bgMusic');

// SOUNDS
const shuffleSound = document.getElementById('shuffleSound');
const apiSound = document.getElementById('apiSound');
const clearSound = document.getElementById('clearSound');

// THE ACTIVATOR
startBtn.addEventListener('click', () => {
    // 1. Force the audio context to resume (Chrome Fix)
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    const audioCtx = new AudioContext();
    audioCtx.resume();

    // 2. Play Background Music
    bgMusic.volume = 0.2;
    bgMusic.play().catch(() => console.log("Music blocked"));

    // 3. Play Video (Unmute it here just in case)
    bgVideo.muted = false; // Optional: If you want video sound too
    bgVideo.play().catch(() => console.log("Video blocked"));

    // 4. Close Overlay
    overlay.style.opacity = '0';
    setTimeout(() => {
        overlay.style.display = 'none';
    }, 500);
});

// BTN LOGIC
document.getElementById('apiBtn').addEventListener('click', async () => {
    apiSound.play();
    const res = await fetch('https://randomuser.me/api/?results=5');
    const data = await res.json();
    document.getElementById('nameInput').value += data.results.map(u => `${u.name.first} ${u.name.last}`).join('\n') + '\n';
});

document.getElementById('shuffleBtn').addEventListener('click', () => {
    shuffleSound.play();
    let names = document.getElementById('nameInput').value.split('\n').filter(n => n.trim() !== "");
    names.sort(() => Math.random() - 0.5);
    document.getElementById('nameList').innerHTML = names.map(n => `<li>${n}</li>`).join('');
});

document.getElementById('clearBtn').addEventListener('click', () => {
    clearSound.play();
    document.getElementById('nameInput').value = "";
    document.getElementById('nameList').innerHTML = "";
});
