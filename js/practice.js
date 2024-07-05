const keyborddiv = document.querySelector(".keybord");
const hangmanImg = document.querySelector(".hangman img");
const incorrectGuesses = document.querySelector(".incorrect-guess b");
const gamemodel = document.querySelector(".game-model");
const wordDisplay = document.querySelector(".word-display");
const restartbtn = document.querySelector(".play-again");

let currentWord, correctletter = [], wrongGuessesCount = 0;
const maxCount = 6;

const rendomNo = () => {
    const { word, hint } = wordList[Math.floor(Math.random() * wordList.length)];
    currentWord = word;
    console.log(word);
    document.querySelector(".hint b").innerHTML = hint;
    wordDisplay.innerHTML = word.split("").map(() => '<li class="letter"></li>').join("");
}

const gameOver = (isVictory) => {
    setTimeout(() => {
        console.log("I am working");
        const gameText = isVictory ? 'You found the word :' : 'The correct word was :';
        gamemodel.querySelector("img").src = `images/${isVictory ? 'victory' : 'lost'}.gif`;
        gamemodel.querySelector("h4").innerHTML = `${isVictory ? 'Congrats!' : 'Game Over'}`;
        gamemodel.querySelector("p").innerHTML = `${gameText} <b>${currentWord}</b>`;
        gamemodel.classList.add("show");
    }, 300);
}

const initGame = (button, clickedLetter) => {
    if (currentWord.includes(clickedLetter)) {
        [...currentWord].forEach((letter, index) => {
            if (letter === clickedLetter) {
                correctletter.push(letter);
                wordDisplay.querySelectorAll("li")[index].innerText = letter;
                wordDisplay.querySelectorAll("li")[index].classList.add("guessed");
            }
        });
    } else {
        wrongGuessesCount++;
        hangmanImg.src = `images/hangman-${wrongGuessesCount}.svg`;
    }
    button.disabled = true;
    incorrectGuesses.innerHTML = `${wrongGuessesCount} / ${maxCount}`;

    if (wrongGuessesCount === maxCount) return gameOver(false);
    if (correctletter.length === currentWord.length) return gameOver(true);
}

const reset = () => {
    correctletter = [];
    wrongGuessesCount = 0;
    hangmanImg.src = `images/hangman-0.svg`;
    incorrectGuesses.innerHTML = `${wrongGuessesCount} / ${maxCount}`;
    gamemodel.classList.remove("show");
    keyborddiv.querySelectorAll("button").forEach(button => button.disabled = false);
    rendomNo();
}

for (let i = 97; i <= 122; i++) {
    const button = document.createElement("button");
    button.innerHTML = String.fromCharCode(i);
    keyborddiv.appendChild(button);
    button.addEventListener("click", (e) => initGame(e.target, String.fromCharCode(i)));
}

rendomNo();
restartbtn.addEventListener("click", reset);
