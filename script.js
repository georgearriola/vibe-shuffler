const startBtn = document.getElementById('startBtn');
const overlay = document.getElementById('overlay');
const bgVideo = document.getElementById('bgVideo');
const bgMusic = document.getElementById('bgMusic');

const shuffleSound = document.getElementById('shuffleSound');
const apiSound = document.getElementById('apiSound');
const clearSound = document.getElementById('clearSound');

startBtn.addEventListener('click', () => {
    // 1. Chrome Audio Context Resume
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (AudioContext) {
        const audioCtx = new AudioContext();
        audioCtx.resume();
    }

    // 2. Play Background Music
    bgMusic.volume = 0.2;
    bgMusic.play().then(() => console.log("SUCCESS: Music playing"))
           .catch(e => console.log("ERROR: Music blocked", e));

    // 3. Play Video
    bgVideo.play().then(() => console.log("SUCCESS: Video playing"))
          .catch(e => console.log("ERROR: Video blocked", e));

    // 4. Close Overlay
    overlay.style.opacity = '0';
    setTimeout(() => { overlay.style.display = 'none'; }, 600);
});

// API BUTTON
document.getElementById('apiBtn').addEventListener('click', async () => {
    apiSound.play().catch(() => {});
    try {
        const res = await fetch('https://randomuser.me/api/?results=5');
        const data = await res.json();
        const names = data.results.map(u => `${u.name.first} ${u.name.last}`).join('\n');
        document.getElementById('nameInput').value += names + '\n';
    } catch (e) { console.log("API Fail", e); }
});

// SHUFFLE BUTTON
document.getElementById('shuffleBtn').addEventListener('click', () => {
    shuffleSound.play().catch(() => {});
    let names = document.getElementById('nameInput').value.split('\n').filter(n => n.trim() !== "");
    if (names.length === 0) return;
    names.sort(() => Math.random() - 0.5);
    document.getElementById('nameList').innerHTML = names.map(n => `<li>${n}</li>`).join('');
});

// CLEAR BUTTON
document.getElementById('clearBtn').addEventListener('click', () => {
    clearSound.play().catch(() => {});
    document.getElementById('nameInput').value = "";
    document.getElementById('nameList').innerHTML = "";
});
