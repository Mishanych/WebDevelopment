
// buttons
const playBtn = document.getElementById('play-btn');
const closeBtn = document.getElementById('close-btn');
const startBtn = document.getElementById('start-btn');

// work areas
const workArea = document.getElementById('work');
const animArea = document.getElementById('animation');
const controls = document.getElementById('controls');
const storageList = document.getElementById('storageInfo');
const notifications = document.getElementById('notifications');

// squares
const smallSquare = document.getElementById('square1');
const bigSquare = document.getElementById('square2');

// general
let animAreaHeight = $('animation').height();
let animAreaWidth = $('animation').width();
let isBiggerMoving = false;
let isSmallerMoving = false;

// parameters
let BiggerSide = 0;
let SmallerSide = 0;
let shiftForSmaller = 0;
let shiftForBigger = 0;

//#region getting data from server
getContentParameters(1).then(() => {
    console.log('Async function |getContentParameters| works correctly');
}).catch(error => {
    console.log('Error executing the async function |getContentParameters|' + error);
});

async function getContentParameters(id){
    let url = 'https://localhost:5001/api/parameters/' + id;
    let response = await fetch(url);

    if (response.ok) {
        let contentParameters = await response.json();
        // setting parameter values
        BiggerSide = contentParameters.biggerSide;
        SmallerSide = contentParameters.smallerSide;
        shiftForSmaller = contentParameters.shiftForSmaller;
        shiftForBigger = contentParameters.shiftForBigger;
    } else {
        alert("HTTP ERROR: " + response.status);
    }
}
//#endregion


//#region events of buttons
function activateWorkArea(isVisible){
    if (isVisible) {
        workArea.classList.remove('none');
        localStorage.clear();
        eventsCounter = 0;

        displayEventsInNotifications('Play button was pressed.');
        saveEventsToLocalStorage('Work area appeared.');
    }
    else {
        displayEventsInNotifications('Close button was pressed.');
        saveEventsToLocalStorage('Work area disappeared.');
        workArea.classList.add('none');
        controls.removeChild(closeBtn);

        controls.appendChild(startBtn);
        controls.appendChild(closeBtn);

        isSmallerMoving = false;
        isBiggerMoving = false;
        setInitialPositionOfSquares(animAreaHeight, animAreaWidth);
        addEventsFromLocalStorageToBlock4();
    }
}

closeBtn.addEventListener('click', function (){
    activateWorkArea(false);
});

playBtn.addEventListener('click', function () {
    activateWorkArea(true);
});

//#region creating buttons (stop and reload)
// creating reload animations button with js
let reloadBtn = document.createElement('BUTTON');
reloadBtn.type = 'Reload';
reloadBtn.id = 'reload-btn';
reloadBtn.innerText = 'Reload';

function reloadAnimation(){
    displayEventsInNotifications('Reload button was pressed.');
    isSmallerMoving = false;
    isBiggerMoving = false;

    setInitialPositionOfSquares(animArea.clientHeight, animArea.clientWidth);
    controls.removeChild(reloadBtn);
    controls.removeChild(closeBtn);

    controls.appendChild(startBtn);
    controls.appendChild(closeBtn);

}

reloadBtn.addEventListener('click', function (){
    reloadAnimation();
});

// creating stop animations button with js
let stopBtn = document.createElement('BUTTON');
stopBtn.type = 'Stop';
stopBtn.id = 'stop-btn';
stopBtn.innerText = 'Stop';

function stopAnimation(){
    displayEventsInNotifications('Stop button was pressed.');
    isSmallerMoving = false;
    isBiggerMoving = false;
    keepChecking = false;
    controls.removeChild(stopBtn);
    controls.removeChild(closeBtn);

    controls.appendChild(reloadBtn);
    controls.appendChild(closeBtn);

}

stopBtn.addEventListener('click', function (){
    stopAnimation();
});
//#endregion

function startMoving(){
    displayEventsInNotifications('Start button was pressed.');
    controls.removeChild(startBtn);
    controls.removeChild(closeBtn);

    controls.appendChild(stopBtn);
    controls.appendChild(closeBtn);

    isSmallerMoving = true;
    isBiggerMoving = true;
    keepChecking = true;
    animAreaHeight = animArea.clientHeight;
    animAreaWidth = animArea.clientWidth;

    moveSmallerSquare(animAreaHeight / 2);
    moveBiggerSquare(animAreaWidth / 2);
    checkIfSmallerOverlayedByBigger(xForSmaller, animAreaHeight / 2, animAreaWidth / 2, yForBigger);
}

startBtn.addEventListener('click', function (){
    startMoving();
});
//#endregion

//#region manipulations with coordinates of squares
function setCoordinatesForSmallSquare(x, y){
    smallSquare.style.top = y + 'px';
    smallSquare.style.left = x + 'px';
}

function setCoordinatesForBigSquare(x, y){
    bigSquare.style.top = y + 'px';
    bigSquare.style.left = x + 'px';
}

function setInitialPositionOfSquares(height, width){
    isMovingRight = true;
    isMovingDown = true;
    xForSmaller = 0;
    yForBigger = 0;

    setCoordinatesForSmallSquare(0, height / 2);
    setCoordinatesForBigSquare(width / 2, 0);
}
//#endregion

//#region moving squares

// moving smaller square
let xForSmaller = 0;
let isMovingRight = true;

function moveSmallerSquare(yForSmaller){
    animAreaWidth = animArea.clientWidth;

    if (isSmallerMoving){
        if (xForSmaller >= animAreaWidth - SmallerSide) {
            isMovingRight = false;
            displayEventsInNotifications('Green square hit the right wall.');
        }
        if (xForSmaller <= 0) {
            isMovingRight = true;
            displayEventsInNotifications('Green square hit the left wall.')
        }

        if (isMovingRight){
            xForSmaller += shiftForSmaller;
            setCoordinatesForSmallSquare(xForSmaller, yForSmaller);
        }
        else {
            xForSmaller -= shiftForSmaller;
            setCoordinatesForSmallSquare(xForSmaller, yForSmaller);
        }

        setTimeout(function (){
            moveSmallerSquare(yForSmaller);
        }, 5);
    } else {
        return;
    }
}

let keepChecking = true;
function checkIfSmallerOverlayedByBigger(xOfSmaller, yOfSmaller, xOfBigger, yOfBigger){
    if (keepChecking){
        if (xOfSmaller >= xOfBigger && xOfSmaller <= xOfBigger + 32 &&
            yOfSmaller >= yOfBigger & yOfSmaller <= yOfBigger + 32){
            stopAnimation();
            displayEventsInNotifications('Red square overlayed a green one.');
            console.log('animation stopped');
        }
        setTimeout( function (){
            checkIfSmallerOverlayedByBigger(xForSmaller, yOfSmaller,
                xOfBigger, yForBigger);
        }, 1);
    } else {
        return;
    }
}

// moving bigger square
let yForBigger = 0;
let isMovingDown = true;

function moveBiggerSquare(xForBigger){
    animAreaHeight = animArea.clientHeight;

    if (isBiggerMoving){
        if (yForBigger >= animAreaHeight - BiggerSide) {
            isMovingDown = false;
            displayEventsInNotifications('Red square hit the bottom wall.');
        }
        if (yForBigger <= 0) {
            isMovingDown = true;
            displayEventsInNotifications('Red square hit the top wall.');
        }

        if (isMovingDown){
            yForBigger += shiftForBigger;
            setCoordinatesForBigSquare(xForBigger, yForBigger);
        } else {
            yForBigger -= shiftForBigger;
            setCoordinatesForBigSquare(xForBigger, yForBigger);
        }

        setTimeout(function (){
            moveBiggerSquare(xForBigger);
        }, 5);
    } else {
        return;
    }
}

//#endregion

function displayEventsInNotifications(event){
    notifications.innerText = event;
    saveEventsToLocalStorage(event);
}

let eventsCounter = 0;
function saveEventsToLocalStorage(event){
    let date = new Date();

    event = event + ' - ' + date.getHours() + ':'
        + date.getMinutes() + ':'
        + date.getSeconds();
    localStorage.setItem(`${eventsCounter}event`, event);
    eventsCounter++;
}

function addEventsFromLocalStorageToBlock4(){
    for (let i = 0; i < eventsCounter + 1; i++){
        let li = document.createElement('LI');
        li.id = `${i}event`;
        li.innerText = localStorage.getItem(`${i}event`);
        storageList.appendChild(li);
    }
}

