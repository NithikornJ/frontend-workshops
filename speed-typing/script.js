const wordEl = document.getElementById('word')
const textEl = document.getElementById('text')
const scoreEl = document.getElementById('score')
const timeEl = document.getElementById('time')
const btn = document.getElementById('lv-btn')
const settings = document.getElementById('settings')
const lvForm = document.getElementById('lv-form')
const levelEl = document.getElementById('level')
const gameoverEl = document.getElementById('gameover')
const saveMode = localStorage.getItem('mode') !== null ? localStorage.getItem('mode') : 'medium';
const words = ["แมว", "ข้าว", "ต้นไม้", "รถยนต์", "โรงเรียน", "โทรศัพท์", "น้ำปลา", "สมุด", "แสงแดด", "ความรัก"];

let randomword;
let score = 0;
let time = 10;

let level = 'medium';

const timeCount = setInterval(updateTime, 1000);

function getRandomWord() {
    return words[Math.floor(Math.random() * words.length)];
}

function displayWord() {
    randomword = getRandomWord();
    wordEl.innerHTML = randomword;
    timeEl.innerHTML = time;
}

textEl.addEventListener('input', (e) => {
    const inputText = e.target.value;

    if (randomword === inputText) {
        if (saveMode === 'easy') {
            time += 5;
        } else if (saveMode === 'medium') {
            time += 3;
        } else {
            time += 2;
        }
        displayWord();
        updateScore();
        e.target.value = '';

    }
})

function updateScore() {
    score += 10;
    scoreEl.innerHTML = score;
}
function updateTime() {
    time--;
    timeEl.innerHTML = time;
    if (time === 0) {
        clearInterval(timeCount)
        gameOver();
    }
}
function gameOver() {
    gameoverEl.innerHTML = `
    <h1>จบเกมแล้วนะครับ</h1> 
    <p>${score} คะแนน</p>
    <button onclick ="location.reload()">เล่นอีกครั้ง</button>
    `
    gameoverEl.style.display = "flex";
}
btn.addEventListener('click', () => {
    settings.classList.toggle('hide');
});

levelEl.addEventListener('change', (e) => {
    level = e.target.value;
    localStorage.setItem('mode', level);
});

function startGame() {
    levelEl.value = saveMode;
    if (saveMode === 'easy') {
        time = 15;
    } else if (saveMode === 'medium') {
        time = 10;
    } else {
        time = 5;
    }
    displayWord();
}
startGame();
textEl.focus();