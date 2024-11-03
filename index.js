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


/////////////////////////////////////////////////////
startBtn.addEventListener('click', function(event) {
    containerStart.style.display = 'none'
    containerGameDrop.style.display = 'block'
    containerGameOver.style.display = 'none'
    wave.style.height = '106px'
    // const drop = createDrop()
    setTimeout(() => {
        createDrop()
    }, 0)
    // setT()
    setInterval(() => {
        const drop = createDrop()  
    }, 8000)


    setInterval(waterUp, 1000);
});

// function setT() {
//     let str = setInterval(() => {
//         createDrop()  
//     }, 8000)
// }
// clearInterval(setT)

btnPlayAgain.addEventListener('click', function(event) {
    containerGameOver.style.display = 'none'
    containerStart.style.display = 'none'
    containerGameDrop.style.display = 'block'
    wave.style.height = '106px'
    // const drop = createDrop()
    score.textContent = ""

    // setInterval(() => {
    //     const drop = createDrop()  
    // }, 8000)

    // setInterval(waterUp, 1000);
});

btnMainMenu.addEventListener('click', function(event) {
    containerGameOver.style.display = 'none'
    containerGameDrop.style.display = 'none'
    containerStart.style.display = 'block'
    containerStart.style.display = 'flex'
    wave.style.height = '106px'
    score.textContent = ""
});


 // Рандомный оператор
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

    // const rootDiv = document.getElementsByClassName("game__content-img")
const currentTask = {
    firstNum: '',
    operation: '',
    secondNum: '',
}

function createDrop(array) {
    // const rootDiv = document.getElementsByClassName("game__content-img")

        const drop = document.createElement("div");
        const firstNum = document.createElement("div");
        const operation = document.createElement("div");
        const secondNum = document.createElement("div");

        drop.classList.add('drop');

        // firstNum = randomExpression(1, 10);
        // secondNum = randomExpression(1, 10)

        // rootDiv[0].appendChild(drop)

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

    // currentTask.firstNum = randomExpression(1, 10);
    // currentTask.secondNum = randomExpression(1, 10);
    // console.log(currentTask.firstNum)

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
    console.log(result);

    drop.appendChild(firstNum)
    drop.appendChild(operation)
    drop.appendChild(secondNum)
    
    return drop
}

// Функция условие для корректных уравнений
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

  // Рандомное значение
function getRandomIntInclusive(min, max) {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled);
}



// let trueResult = ''; // возможно не надо
// function checkResult() {

//     let trueResult = '';
//     if (currentTask.operation === '+') {
//         trueResult = currentTask.firstNum + currentTask.secondNum
//     }

//     if (currentTask.operation === '-') {
//         if (currentTask.secondNum > currentTask.number1) {
//             trueResult = currentTask.secondNum - currentTask.firstNum
//         } else {
//             trueResult = currentTask.firstNum - currentTask.secondNum
//         }
//     }

//     if (currentTask.operation === '*') {
//         trueResult = currentTask.firstNum * currentTask.secondNum
//     }

//     if (currentTask.operation === '/') {
//         if (currentTask.secondNum > currentTask.firstNum) {
//             trueResult = currentTask.secondNum / currentTask.firstNum
//         } else {
//             trueResult = currentTask.firstNum / currentTask.secondNum
//         }
//     }
// }
// checkResult()

// enterBtn.addEventListener('click', checkResult)

// const wave = document.querySelector('.wave')

// const positionCircle = drop.getBoundingClientRect();
// const positionWave = wave.getBoundingClientRect();

// вода поднимается
function waterUp() {
    const drop = document.querySelector('.drop');
    // const wave = document.querySelector('.wave')

console.log('Проверка');

    const positionCircle = drop.getBoundingClientRect();
    const positionWave = wave.getBoundingClientRect();

    if (positionCircle.y + positionCircle.height >= positionWave.y) {
        // console.log('WaterUp');
        wave.style.height = positionWave.height + 40 + 'px';
        drop.remove();
        // createDrop()
        console.log(positionWave.height);
            
    } 
    if (positionWave.y <= positionWave.height ) {
        // console.log('gameeeeee overrrrrr');
        gameOver()
    }
}

// const intervalPosition = setInterval(waterUp, 1000);


function gameOver() {
    console.log('game over');
    containerGameDrop.style.display = 'none';
    containerGameOver.style.display = 'block'
        containerGameOver.style.display = 'flex'
    scoreGameOver.textContent = score.textContent
    // // clearInterval(intervalPosition); - очищает ф-ию setInterval(waterUp, 100); - чтобы она 
    // // не проверяла позицию капли и волны + чтобы отключился звук(когда волна поднимается)
    clearInterval(waterUp);
    // clearTimeout()
}



  // Функция для переключения между полноэкранным режимом и обычным.
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


// Music // Music // Music // Music // Music
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