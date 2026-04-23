let bgMusic, shuffleSound, apiSound, clearSound;

const startBtn = document.getElementById('startBtn');
const overlay = document.getElementById('overlay');
const video = document.getElementById('bgVideo');

startBtn.addEventListener('click', () => {
    // Resume Audio Context
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    const audioCtx = new AudioContext();
    audioCtx.resume();

    // NEW RELIABLE AUDIO LINKS
    bgMusic = new Audio('https://cdn.pixabay.com/audio/2022/03/15/audio_78335029a1.mp3');
    shuffleSound = new Audio('https://cdn.pixabay.com/audio/2022/03/10/audio_c33e8a9332.mp3');
    apiSound = new Audio('https://cdn.pixabay.com/audio/2021/08/04/audio_bb0773d12d.mp3');
    clearSound = new Audio('https://cdn.pixabay.com/audio/2022/03/15/audio_273641775f.mp3');

    bgMusic.loop = true;
    bgMusic.volume = 0.15;
    
    // Play with error handling
    bgMusic.play().then(() => console.log("Music Started!"))
           .catch(e => console.log("Audio still failing: ", e));
    
    video.play().catch(e => console.log("Video failing: ", e));

    overlay.style.opacity = '0';
    setTimeout(() => { overlay.style.display = 'none'; }, 500);
});

// BTN LOGIC
document.getElementById('apiBtn').addEventListener('click', async () => {
    if (apiSound) apiSound.play();
    try {
        const res = await fetch('https://randomuser.me/api/?results=5');
        const data = await res.json();
        document.getElementById('nameInput').value += data.results.map(u => `${u.name.first} ${u.name.last}`).join('\n') + '\n';
    } catch (e) { console.log(e); }
});

document.getElementById('shuffleBtn').addEventListener('click', () => {
    if (shuffleSound) shuffleSound.play();
    let names = document.getElementById('nameInput').value.split('\n').filter(n => n.trim() !== "");
    if (names.length === 0) return;
    names.sort(() => Math.random() - 0.5);
    document.getElementById('nameList').innerHTML = names.map(n => `<li>${n}</li>`).join('');
});

document.getElementById('clearBtn').addEventListener('click', () => {
    if (clearSound) clearSound.play();
    document.getElementById('nameInput').value = "";
    document.getElementById('nameList').innerHTML = "";
});
