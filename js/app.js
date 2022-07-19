var WALL = 'WALL';
var FLOOR = 'FLOOR';
var BALL = 'BALL';
var GAMER = 'GAMER';
var GLUE = 'GLUE';

var gCoutCollectedBalls = 0;
var GAMER_IMG = '<img src="img/gamer.png" />';
var BALL_IMG = '<img src="img/ball.png" />';
var GLUE_IMG = '<img src="img/glue.png" />';

var gFreeze = false
var gAddBallInterval
var gAddGlueInterval


// var gPosElem = {
//     i : i ,
//     j : j 
// }

var gBoard;
var gEmptyCells;
var gGamerPos;


function initGame() {
    // removeRestartButton()
    var strHTML = `Balls Collected : ${gCoutCollectedBalls}`
    var gMsgElm = document.querySelector('.bCollectedTxt');
    gMsgElm.style.color = 'chartreuse';
    gMsgElm.innerHTML = strHTML;

    gFreeze = false
    gCoutCollectedBalls = 0
    gGamerPos = { i: 2, j: 9 };
    gBoard = buildBoard();
    renderBoard(gBoard);
    gEmptyCells = getEmptyCells(gBoard)
    gAddBallInterval = setInterval(addBall, 4000)
    gAddGlueInterval = setInterval(addGlue, 5000)

    renderBoard(gBoard)
    // console.log(gEmptyCells)
}


function buildBoard() {
    // Create the Matrix
    var board = createMat(10, 12)

    // Put FLOOR everywhere and WALL at edges
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[0].length; j++) {
            // Put FLOOR in a regular cell
            var cell = { type: FLOOR, gameElement: null };

            // Place Walls at edges
            if (i === 0 || i === board.length - 1 || j === 0 || j === board[0].length - 1) {
                if (!(j === 5 || i === 5))
                    cell.type = WALL;
            }

            // Add created cell to The game board
            board[i][j] = cell;
        }
    }

    // Place the gamer at selected position
    board[gGamerPos.i][gGamerPos.j].gameElement = GAMER;

    // Place the Balls (currently randomly chosen positions)
    board[3][8].gameElement = BALL;
    board[7][4].gameElement = BALL;

    // addBall()

    console.log(board);
    return board;
}

//end the Game
function endGame() {
    clearInterval(gAddBallInterval)
    clearInterval(gAddGlueInterval)
    var strHTML = `Game Over! : ${gCoutCollectedBalls} Balls`
    var gMsgElm = document.querySelector('.bCollectedTxt');
    gMsgElm.style.color = 'orange';
    gMsgElm.innerHTML = strHTML;
    gFreeze = true
    // addRestartButton()
}
function addRestartButton() {
    // var elem = document.querySelector(gameInfContainer)
    // strHTML =`<button class="restartBtn" onclick="initGame()">Restart</button>`
    // elem.innerHTML = strHTML
    var container = document.getElementById('div1')
    var btn = document.createElement("button");
    btn.innerHTML = "Restart!";
    btn.onclick = initGame();
    btn.classList = "restartBtn"
    container.appendChild(btn);

}

function removeRestartButton() {
    var elem = document.querySelector('.restartBtn')
    if (elem) {
        // var elem = document.getElementById('dummy');
        elem.parentNode.removeChild(elem);
    }
}

// Render the board to an HTML table
function renderBoard(board) {

    var strHTML = '';
    for (var i = 0; i < board.length; i++) {
        strHTML += '<tr>\n';
        for (var j = 0; j < board[0].length; j++) {
            var currCell = board[i][j];

            var cellClass = getClassName({ i: i, j: j })

            // TODO - change to short if statement
            if (currCell.type === FLOOR) cellClass += ' floor';
            else if (currCell.type === WALL) cellClass += ' wall';

            strHTML += `\t<td class="cell ${cellClass}"  onclick="moveTo(${i}, ${j})" >\n`;

            // TODO - change to switch case statement
            if (currCell.gameElement === GAMER) {
                strHTML += GAMER_IMG;
            } else if (currCell.gameElement === BALL) {
                strHTML += BALL_IMG;
            } else if (currCell.gameElement === GLUE) {
                strHTML += GLUE_IMG;
            }

            strHTML += '\t</td>\n';
        }
        strHTML += '</tr>\n';
    }

    var elBoard = document.querySelector('.board');
    elBoard.innerHTML = strHTML;
}
// Move the player to a specific location
function moveTo(i, j) {
    var targetCell = gBoard[i][j];
    if (targetCell.type === WALL) return;
    if (gFreeze) return;

    // Calculate distance to make sure we are moving to a neighbor cell
    var iAbsDiff = Math.abs(i - gGamerPos.i);
    var jAbsDiff = Math.abs(j - gGamerPos.j);

    // If the clicked Cell is one of the four allowed
    if ((iAbsDiff === 1 && jAbsDiff === 0) || (jAbsDiff === 1 && iAbsDiff === 0) ||
        (iAbsDiff === gBoard.length - 1 && jAbsDiff === 0) || (jAbsDiff === gBoard[i].length - 1 && iAbsDiff === 0)) {

        if (targetCell.gameElement === BALL) {
            console.log('Collecting!');
            gCoutCollectedBalls++;
            var strHTML = `Balls Collected : ${gCoutCollectedBalls}`
            var gMsgElm = document.querySelector('.bCollectedTxt');
            gMsgElm.innerHTML = strHTML;
        }

        if (targetCell.gameElement === GLUE) {
            gFreeze = true
            setTimeout(unfreeze, 3000)
        }

        // MOVING from current position
        // Model:
        gBoard[gGamerPos.i][gGamerPos.j].gameElement = null;
        // Dom:
        renderCell(gGamerPos, '');

        // MOVING to selected position
        // Model:
        gGamerPos.i = i;
        gGamerPos.j = j;
        gBoard[gGamerPos.i][gGamerPos.j].gameElement = GAMER;
        // DOM:
        renderCell(gGamerPos, GAMER_IMG);
        // check if no balls on the board to end Game
        var ifBalls = checkIfNoBalls(gBoard)
        if (!ifBalls) {
            // addRestartButton()
            endGame()
        }
    } // else console.log('TOO FAR', iAbsDiff, jAbsDiff);

}
function unfreeze() {
    gFreeze = false
}
// adding ball to the board
function addBall() {
    gEmptyCells = getEmptyCells(gBoard)
    if (gEmptyCells.length === 0 ) return
    var pos = getRandomInt(0, gEmptyCells.length - 1)
    currPos = gEmptyCells[pos]
    i = currPos.i
    j = currPos.j
    // gBoard[gEmptyCells[pos].posElem.i][getEmptyCells[pos].posElem.j].gameElement = BALL
    gBoard[i][j].gameElement = BALL
    renderCell(currPos, BALL_IMG)

}
// adding glue to the board
function addGlue() {
    gEmptyCells = getEmptyCells(gBoard)
    var pos = getRandomInt(0, gEmptyCells.length - 1)
    currPos = gEmptyCells[pos]
    i = currPos.i
    j = currPos.j
    // gBoard[gEmptyCells[pos].posElem.i][getEmptyCells[pos].posElem.j].gameElement = BALL
    gBoard[i][j].gameElement = GLUE
    renderCell(currPos, GLUE_IMG)

}
// Convert a location object {i, j} to a selector and render a value in that element
function renderCell(location, value) {
    var cellSelector = '.' + getClassName(location)
    var elCell = document.querySelector(cellSelector);
    elCell.innerHTML = value;
}
// Move the player by keyboard arrows
function handleKey(event) {

    var i = gGamerPos.i;
    var j = gGamerPos.j;


    switch (event.key) {
        case 'ArrowLeft':
            !j ? j = gBoard[i].length - 1 : j--;
            moveTo(i, j);
            break;
        case 'ArrowRight':
            j === gBoard[i].length - 1 ? j = 0 : j++;
            moveTo(i, j);
            break;
        case 'ArrowUp':
            !i ? i = gBoard.length - 1 : i--;
            moveTo(i, j);
            break;
        case 'ArrowDown':
            i === gBoard.length - 1 ? i = 0 : i++;
            moveTo(i, j);
            break;

    }

}
// Returns array of empty cells positions
function getEmptyCells(board) {
    outputArray = []
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[0].length; j++) {
            // restnums.push(nums[numPos])
            if (board[i][j].gameElement === null &&
                board[i][j].type !== WALL) {
                outputArray.push(createPosElem(i, j))
            }
        }
    }
    console.log(outputArray)
    return outputArray
}

function checkIfNoBalls(board) {
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[0].length; j++) {
            if (board[i][j].gameElement === BALL) {
                return true
            }
        }
    }
    return false
}

// Returns the class name for a specific cell
function getClassName(location) {
    var cellClass = `cell-${location.i}-${location.j}`;
    return cellClass;
}

// Create Position element for array of empty positions
function createPosElem(i, j) {
    var posElem = {
        i: i,
        j: j
    }
    return posElem
}
// Returns a Random Number between min to max
function getRandomInt(min, max) {
    var random = Math.floor(Math.random() * (max - min) + min)
    return random
}

