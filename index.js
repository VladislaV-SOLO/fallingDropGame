const clearBtn = document.getElementById('clear');
const backspaceBtn = window.document.getElementById('backspace');
const enterBtn = window.document.getElementById('enter');
const screenInput = window.document.querySelector('.game__content-input');
const calcBtn = document.querySelector('.game__content-calcBtn');
const score = window.document.getElementById('span-score');
const scoreGameOver = window.document.getElementById('span-scoreGameOver');
const oceanCreateDrop = document.querySelector('.game__content-createDrop');
const ocean = document.querySelector('.ocean');
const startBtn = document.querySelector('.container-btnStart');
const btnPlayAgain = document.querySelector('.case-btnGameOver');
const btnMainMenu = document.querySelector('.case-btnMainMenu');
const containerStart = document.querySelector('.containerStartGame');
const containerGameOver = document.querySelector('.containerGameOver');
const containerGameDrop = document.querySelector('.game');
const imgContent = document.querySelector('.game__content-img')
const wave = document.querySelector('.wave');



function onClickNum(event) {
    if (event.target.classList.contains('num')) {
        const pressNum = event.target.textContent
        screenInput.value += pressNum
}}

clearBtn.addEventListener('click', function(event) {
    screenInput.value = ''
})

backspaceBtn.addEventListener('click', function(event) {
    screenInput.value = screenInput.value.slice(0, -1)
})

score.innerHTML = 0;
let count = 0;
enterBtn.addEventListener('click', function(event) {
    const drops = document.querySelectorAll('.drop')
    drops.forEach((el) => {        
        if (el.dataset.result === screenInput.value) {
            el.remove()
            screenInput.value = ''
            score.textContent = +score.textContent + 10;
            } else {
                score.textContent = score.textContent - 5;
                screenInput.value = ''
            }
        }
    )
})

calcBtn.addEventListener('click', function(event) {
    onClickNum(event)
})


startBtn.addEventListener('click', function(event) {
    containerStart.style.display = 'none'
    containerGameDrop.style.display = 'block'
    containerGameOver.style.display = 'none'
    wave.style.height = '106px'

    setTimeout(() => {
        createDrop()
    }, 0)

    setInterval(() => {
        const drop = createDrop()  
    }, 8000)

    setInterval(waterUp, 1000);
});


btnPlayAgain.addEventListener('click', function(event) {
    containerGameOver.style.display = 'none'
    containerStart.style.display = 'none'
    containerGameDrop.style.display = 'block'
    wave.style.height = '106px'
    score.textContent = ""
});

btnMainMenu.addEventListener('click', function(event) {
    containerGameOver.style.display = 'none'
    containerGameDrop.style.display = 'none'
    containerStart.style.display = 'block'
    containerStart.style.display = 'flex'
    wave.style.height = '106px'
    score.textContent = ""
});


function randomOperation() {
    sum = '+';
    subtract = '-';
    multiply = '*';
    divide = '/';
    const oper = getRandomIntInclusive(1, 4)
         if (oper == 1) {return sum}
    else if (oper == 2) {return subtract}
    else if (oper == 3) {return multiply}
    else if (oper == 4) {return divide}
}

const currentTask = {
    firstNum: '',
    operation: '',
    secondNum: '',
}

function createDrop(array) {

        const drop = document.createElement("div");
        const firstNum = document.createElement("div");
        const operation = document.createElement("div");
        const secondNum = document.createElement("div");

        drop.classList.add('drop');

        if (score.textContent < 50) {
            currentTask.operation = randomOperation(1, 2)
        } else {
            currentTask.operation = randomOperation(1, 4);
        }
        if (count > 7) {
            drop.style.animation = 'dropAnimation 10s linear'
        }
        if (count > 15) {
            drop.style.animation = 'dropAnimation 8s linear';
        }

    const x = getRandomIntInclusive(0, 530)
    const y = getRandomIntInclusive(0)
    drop.style.top = y +'px'
    drop.style.left = x +'px'
    oceanCreateDrop.append(drop)

    const {firstNums,operations, secondNums} = randomExpression(1, 10) // operations
    firstNum.innerText = firstNums
    operation.innerText = operations
    secondNum.innerText = secondNums
   
const result = resultDropEquations()

function resultDropEquations() {
switch(operations) {
   case '+':
    return firstNums+secondNums;
   case '-':
    return firstNums-secondNums;  
   case '*':
    return firstNums*secondNums;
  case '/':
    return firstNums/secondNums;
  }
}

    drop.dataset.result = result
    drop.appendChild(firstNum)
    drop.appendChild(operation)
    drop.appendChild(secondNum)

    return drop
}


function randomExpression(min, max) {
    let firstNums = getRandomIntInclusive(min, max)
    let secondNums = getRandomIntInclusive(min, max)
    let operations = randomOperation()

    if (firstNums < secondNums && (operations === '-' || operations === '/')) {
        [firstNums, secondNums] = [secondNums, firstNums]
    }
    if (operations === '/' && firstNums % secondNums != 0) {
        firstNums -= firstNums % secondNums
    }

    return {firstNums, secondNums, operations}
}


function getRandomIntInclusive(min, max) {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled);
}


function waterUp() {
    const drop = document.querySelector('.drop');

    const positionCircle = drop.getBoundingClientRect();
    const positionWave = wave.getBoundingClientRect();

    if (positionCircle.y + positionCircle.height >= positionWave.y) {
        wave.style.height = positionWave.height + 40 + 'px';
        drop.remove();
        console.log(positionWave.height);
    } 
    if (positionWave.y <= positionWave.height ) {
        gameOver()
    }
}


function gameOver() {
    console.log('game over');
    containerGameDrop.style.display = 'none';
    containerGameOver.style.display = 'block'
        containerGameOver.style.display = 'flex'
    scoreGameOver.textContent = score.textContent
    clearInterval(waterUp);
}


function toggleFullScreen(elem) {
    if (!document.fullscreenElement) {
        if (elem.requestFullscreen) {
            elem.requestFullscreen();
        }
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        }
    }
}
document.getElementById('fullScreen').addEventListener('click', function() {
    const content = document.getElementById('content')
    toggleFullScreen(content);
});



let music = new Audio();
    music.src = "./sound/affection-core-c152-nostalgic-memories.mp3";

document.getElementById('sound').onclick = function() {
    if (music.paused == true) {
        music.play();
    }
    else {
        music.pause();
    }
}