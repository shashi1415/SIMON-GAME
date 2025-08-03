const btns = ["red", "yellow", "purple", "green"];
let gameSeq = [];
let userSeq = [];
let started = false;
let level = 0;
let highScore = 0;
const highScoreElem = document.getElementById("high-score");

const h3 = document.querySelector("h3");

document.addEventListener("keydown", function () {
    if (!started) {
        started = true;
        level = 0;
        gameSeq = [];
        userSeq = [];
        h3.innerText = `Level ${level}`;
        nextStep();
    }
});

function nextStep() {
    userSeq = [];
    level++;
    h3.innerText = `Level ${level}`;
    const randIdx = Math.floor(Math.random() * btns.length);
    const randColor = btns[randIdx];
    gameSeq.push(randColor);
    setTimeout(() => {
        flashBtn(randColor);
    }, 500); // slow down Simon's flash
}

function flashBtn(color) {
    const btn = document.querySelector(`.btn.${color}`);
    if (btn) {
        btn.classList.add("flash-white");
        setTimeout(() => {
            btn.classList.remove("flash-white");
        }, 500); // slow down flash duration
    }
}

const allBtns = document.querySelectorAll(".btn");
allBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
        const color = btn.classList[1];
        userSeq.push(color);
        // User click: blink green
        btn.classList.add("flash-green");
        setTimeout(() => {
            btn.classList.remove("flash-green");
        }, 250);
        checkAnswer(userSeq.length - 1);
    });
});

function checkAnswer(idx) {
    if (userSeq[idx] === gameSeq[idx]) {
        if (userSeq.length === gameSeq.length) {
            if (level > highScore) {
                highScore = level;
                if (highScoreElem) highScoreElem.innerText = `High Score: ${highScore}`;
            }
            setTimeout(nextStep, 1500); // slow down next level
        }
    } else {
        h3.innerText = `Game Over! You reached Level ${level}. Press any key to restart.`;
        document.body.classList.add("game-over");
        setTimeout(() => {
            document.body.classList.remove("game-over");
        }, 200);
        started = false;
    }
}
