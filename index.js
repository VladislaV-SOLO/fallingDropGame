const clearBtn = document.getElementById('clear');
const backspaceBtn = window.document.getElementById('backspace');
const enterBtn = window.document.getElementById('enter');
const screen = window.document.querySelector('.game__content-input');
const calc = document.querySelector('.game__content-calcBtn');
const score = window.document.getElementById('span-score');
const ocean = document.querySelector('.game__content-ocean');
const startBtn = document.querySelector('.container-btnStart');
const containerStart = document.querySelector('.container');
const containerGameDrop = document.querySelector('.game');





function onClickNum(event) {
    if (event.target.classList.contains('num')) {
        const pressNum = event.target.textContent
        screen.value += pressNum
    } 
}

clearBtn.addEventListener('click', function(event) {
    screen.value = ''
})

backspaceBtn.addEventListener('click', function(event) {
    screen.value = screen.value.slice(0, -1)
})

enterBtn.addEventListener('click', function(event) {
    score.textContent = screen.value
    screen.value = ''
})

calc.addEventListener('click', function(event) {
    onClickNum(event)
})


/////////////////////////////////////////////////////
startBtn.addEventListener('click', function(event) {
    containerStart.style.display = 'none'
    containerGameDrop.style.display = 'block'
    
    setInterval(() => {
        createDrop()
    }, 6000)

});

// function ranromOperation(el1, el2, el3, el4) {
//     const oper = getRandomIntInclusive(0, 10)
//     let sym = ('+', '-', '/', '*')
//     function randSymbl() {

//         if (oper <= 2) {
//             el4 
//         }
//         else if (oper > 2 <= 4) {
//             el3
//         }
//         else if (oper > 4 <= 7) {
//             el2
//         }
//         else if (oper > 7 <= 10) {
//             el1
//         }
//     }
// return randSymbl()
// }
// console.log(ranromOperation('+', '-', '/', '*'));



function createDrop(array) {
    const rootDiv = document.getElementsByClassName("game__content-img")

        const drop = document.createElement("div");
        const firstNum = document.createElement("div");
        const operation = document.createElement("div");
        const secondNum = document.createElement("div");

        drop.classList.add('drop');
        rootDiv[0].appendChild(drop)

    const x = getRandomIntInclusive(0, 530)
    const y = getRandomIntInclusive(0)
    drop.style.top = y +'px'
    drop.style.left = x +'px'
    ocean.append(drop)

    const {firstNums, secondNums, operations} = randomExpression(0, 10)
    firstNum.innerText = firstNums
    secondNum.innerText = secondNums
    operation.innerText = operations

    const result = +firstNum.innerText + +secondNum.innerText
    drop.dataset.result = result

    drop.appendChild(firstNum)
    drop.appendChild(operation)
    drop.appendChild(secondNum)

    return drop
}

function randomExpression(min, max) {
    let firstNums = getRandomIntInclusive(min, max)
    let secondNums = getRandomIntInclusive(min, max)

    const operat = Math.random() > 0.5 ? '+' : '-'

    const operations = operat

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
    toggleFullScreen(document.getElementById('content'));
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