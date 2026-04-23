// 1. Declare variables
let bgMusic, shuffleSound, apiSound, clearSound;

const startBtn = document.getElementById('startBtn');
const overlay = document.getElementById('overlay');
const video = document.getElementById('bgVideo');

// 2. The Activation
startBtn.addEventListener('click', function() {
    // Force browser to allow audio
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (AudioContext) { new AudioContext().resume(); }

    try {
        // Use standard W3Schools assets - extremely high compatibility
        bgMusic = new Audio('https://www.w3schools.com/tags/horse.mp3'); 
        bgMusic.loop = true;
        bgMusic.volume = 0.1;
        bgMusic.play().catch(e => console.log("Audio play blocked"));
    } catch (err) {
        console.log("Audio setup failed, but app will continue.");
    }

    if (video) { video.play().catch(() => {}); }

    overlay.style.opacity = '0';
    setTimeout(() => { overlay.style.display = 'none'; }, 500);
});

// 3. API Button
document.getElementById('apiBtn').addEventListener('click', async () => {
    try { apiSound.play().catch(() => {}); } catch(e) {}
    
    try {
        const res = await fetch('https://randomuser.me/api/?results=5');
        const data = await res.json();
        const names = data.results.map(u => `${u.name.first} ${u.name.last}`).join('\n');
        document.getElementById('nameInput').value += names + '\n';
    } catch (e) { console.log("API Error", e); }
});

// 4. Shuffle Button
document.getElementById('shuffleBtn').addEventListener('click', () => {
    try { shuffleSound.play().catch(() => {}); } catch(e) {}
    
    const input = document.getElementById('nameInput');
    const list = document.getElementById('nameList');
    let names = input.value.split('\n').filter(n => n.trim() !== "");
    
    if (names.length === 0) return;
    
    names.sort(() => Math.random() - 0.5);
    
    // Clear list and re-add with a delay for the animation
    list.innerHTML = "";
    names.forEach((name, index) => {
        setTimeout(() => {
            const li = document.createElement('li');
            li.textContent = name;
            list.appendChild(li);
        }, index * 100);
    });
});

// 5. Clear Button
document.getElementById('clearBtn').addEventListener('click', () => {
    try { clearSound.play().catch(() => {}); } catch(e) {}
    document.getElementById('nameInput').value = "";
    document.getElementById('nameList').innerHTML = "";
});
