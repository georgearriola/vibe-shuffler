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

startBtn.addEventListener('click', () => {
    // Chrome needs this interaction to play media
    bgMusic.volume = 0.2;
    bgMusic.play();
    video.play(); // Explicitly play the video here

    overlay.style.opacity = '0';
    setTimeout(() => overlay.style.display = 'none', 500);
});

apiBtn.addEventListener('click', async () => {
    apiSound.play();
    try {
        const res = await fetch('https://randomuser.me/api/?results=5');
        const data = await res.json();
        const names = data.results.map(u => `${u.name.first} ${u.name.last}`);
        nameInput.value += (nameInput.value ? "\n" : "") + names.join("\n");
    } catch (e) { console.log(e); }
});

shuffleBtn.addEventListener('click', () => {
    let names = nameInput.value.split('\n').map(n => n.trim()).filter(n => n !== "");
    if (names.length === 0) return;
    shuffleSound.play();
    
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

clearBtn.addEventListener('click', () => {
    clearSound.play();
    nameInput.value = "";
    nameList.innerHTML = "";
});
