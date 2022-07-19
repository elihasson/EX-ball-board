function createMat(ROWS, COLS) {
    var mat = []
    for (var i = 0; i < ROWS; i++) {
        var row = []
        for (var j = 0; j < COLS; j++) {
            row.push('')
        }
        mat.push(row)
    }
    return mat
}

function copyMat(mat) {
    var newMat = [];
    for (var i = 0; i < mat.length; i++) {
        newMat[i] = [];
        for (var j = 0; j < mat[0].length; j++) {
            newMat[i][j] = mat[i][j];
        }
    }
    return newMat;
}

function getRandomInt(min, max) {
    var random = Math.floor(Math.random() * (max - min) + min)
    return random
}

//get 2 arrays
function drawNum(nums,restnums) {
    var numPos = getRandomInt(0, nums.length - 1)
    var num = (nums[numPos])
    restnums.push(nums[numPos])
    nums.splice(numPos, 1)
    return num
}

function createElement(i ,j){
    var element = {
        i:  i,
        j : j,
    }
    return element
}



// function startTimer(duration, display) {
//     // var timerInterval = 0
//     // clearInterval(timerInterval) 
//     var timer = duration, minutes, seconds;
//     // var timerInterval = setInterval(function () {
//     setInterval(function () {
//         // gIsRunning = true
//         minutes = parseInt(timer / 60, 10);
//         seconds = parseInt(timer % 60, 10);
          
//         minutes = minutes < 10 ? "0" + minutes : minutes;
//         seconds = seconds < 10 ? "0" + seconds : seconds;
//         display.textContent = minutes + ":" + seconds;

//         if (--timer < 0) {
//             display.textContent = minutes + ":" + seconds
//             // timer = duration;
//             // return true
//         }
//     }, 1000);

// }

// window.onload = function () {
//     // var fiveMinutes = 12,
//         display = document.querySelector('#time');
//     startTimer(TIME_REMAIN, display);
// };


//////// syntax ////
// short if 
// a > b ? console.log('Hi') : console.log('Bye')