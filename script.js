
const playerWord = document.querySelector('.player-word');
const gameContainer = document.querySelector('.game-container');
let isMovingLeft = false;
let isMovingRight = false;

document.addEventListener('keydown', function(event) {
    if (event.key === 'ArrowLeft') {
        isMovingLeft = true;
    } else if (event.key === 'ArrowRight') {
        isMovingRight = true;
    }
});

document.addEventListener('keyup', function(event) {
    if (event.key === 'ArrowLeft') {
        isMovingLeft = false;
    } else if (event.key === 'ArrowRight') {
        isMovingRight = false;
    }
});

function movePlayerWord() {
    let currentLeft = parseInt(playerWord.style.left) || 0;
    const speed = 10;

    if (isMovingLeft && currentLeft > 0) {
        currentLeft -= speed;
    }
    if (isMovingRight && (currentLeft + playerWord.offsetWidth) < gameContainer.offsetWidth) {
        currentLeft += speed;
    }

    playerWord.style.left = currentLeft + 'px';
    requestAnimationFrame(movePlayerWord);
}

movePlayerWord();

const words = [
    { text: 'nice thoughts', value: 10 },
    { text: 'sheep', value: 5 },
    { text: 'calm things', value: 15 },
    { text: 'loud sound', value: -10 },
    { text: 'existential dread', value: -20 },
    { text: 'have i lost my hamster', value: -15 },
    { text: 'nice things to eat', value: 10 },
    { text: 'my favourite smell', value: 10 },
    { text: 'friends', value: 10 },
    { text: 'i hope i meet a new cat', value: 10 },
    { text: 'dreams are fun', value: 10 },
    { text: 'have i tried my favourite salad yet', value: 10 },
    { text: 'future adventures', value: 10 },
    { text: 'flowers', value: 10 },
    { text: 'a really crisp apple', value: 10 },
    { text: '(abstract joy)', value: 10 },
    { text: 'how do credit cards work', value: 0 },
    { text: "it's fun to breathe", value: 0 },
    { text: 'what fruit would i be if i was a fruit', value: 0 },
    { text: 'the news', value: -10 },
    { text: 'did my hair look dumb today', value: -10 },
    { text: "why can't people be nice", value: -10 },
    { text: 'i need to buy pasta', value: -10 },
    { text: '(lingering doom)', value: -10 },
    { text: 'is my room haunted', value: -10 },
    { text: ':(', value: -10 },
    { text: 'maybe my personality is unenjoyable', value: -10 },
    { text: 'i should be famous by now', value: -10 }
];

function spawnFallingWord() {
    const randomWord = words[Math.floor(Math.random() * words.length)];
    const wordElement = document.createElement('div');
    wordElement.innerText = randomWord.text; wordElement.style.whiteSpace = "nowrap";
    wordElement.style.position = 'absolute';
    wordElement.style.left = Math.random() * (gameContainer.offsetWidth - 100) + 'px';
    wordElement.style.fontSize = '20px';
    wordElement.dataset.value = randomWord.value;
    document.querySelector('.falling-words').appendChild(wordElement);

    moveFallingWord(wordElement);
    // Random intervals for spawning words
    setTimeout(spawnFallingWord, Math.random() * 2000);
}

function moveFallingWord(wordElement) {
    const speed = Math.random() * 3 + 1;  // Varying the speed of falling words
    const wordRect = wordElement.getBoundingClientRect();
    const playerRect = playerWord.getBoundingClientRect();
    const gameRect = gameContainer.getBoundingClientRect();

    if (wordRect.bottom >= playerRect.top && wordRect.right >= playerRect.left && wordRect.left <= playerRect.right) {
        updateScore(parseInt(wordElement.dataset.value));
        wordElement.remove();
    } else if (wordRect.bottom >= gameRect.bottom) {
        wordElement.remove();
    } else {
        wordElement.style.top = (wordRect.top - gameRect.top + speed) + 'px';
        requestAnimationFrame(() => moveFallingWord(wordElement));
    }
}

let score = 0;

function updateScore(value) {
    score += value;
    document.querySelector('.score-value').innerText = score;

    if (score >= 100) {
        alert('You won!');
        location.reload();
    }
}

spawnFallingWord();
