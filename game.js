$(function() {
    var PLAY_BOARD_DEFAULT = [['x','x','x','x','x','x','x'],['x','x','x','x','x','x','x'],['x','x','x','x','x','x','x'],['x','x','x','x','x','x','x'],['x','x','x','x','x','x','x'],['x','x','x','x','x','x','x']];

    var currentPlayBoard = [];

    var activePlayer = false;

    function makeMove(columnIndex) {
//        var column = currentPlayBoard[columnIndex];
        for(var i = currentPlayBoard.length - 1; i >= 0; i--) {
            if(currentPlayBoard[i][columnIndex] == 'x') {
                currentPlayBoard[i][columnIndex] = activePlayer ? 'r' : 'y';
                updatePlayBoard(i, columnIndex);
                checkBoard();
                activePlayer = !activePlayer;
                playerMoveState();
                break;
            }
        }
    }

    function checkBoard() {
//        testing verticals
        testColumns(currentPlayBoard);

//        testing horizontals by transposing the array and reusing the same testColumns functions
        testColumns(transposeArray(currentPlayBoard));

//        testing diagonal line in both way
        checkDiagonals(currentPlayBoard);

    }

    function checkDiagonals(array) {
        var controlArray = [];

        (function () {
            for(var x = 5, y = 5; x >= 0 && y >= 0; x--, y--) {
                var str ='';
                for(var checkX = x, checkY = 0; checkX >= 0; checkX--, checkY++) {
                    str += array[checkX][checkY];
                }
                controlArray.push(str);
            }
        })();

        (function () {
            for(var x = 5, y = 1; x >= 0 && y <= 6; x--, y++) {
                var str ='';
                for(var checkX = 5, checkY = y; checkY <= 6; checkX--, checkY++) {
                    str += array[checkX][checkY];
                }
                controlArray.push(str);
            }
        })();

        (function () {
            for(var x = 5, y = 5; x >= 0 && y >= 0; x--, y--) {
                var str ='';
                for(var checkX = 5, checkY = y; checkY >= 0; checkX--, checkY--) {
                    str += array[checkX][checkY];
                }
                controlArray.push(str);
            }
        })();

        (function () {
            for(var x = 5, y = 1; x >= 0 && y <= 6; x--, y++) {
                var str ='';
                for(var checkX = x, checkY = 6; checkX >= 0; checkX--, checkY--) {
                    str += array[checkX][checkY];
                }
                controlArray.push(str);
            }
        })();

        winMessage(controlArray.join('x'))
    }

    function transposeArray(array) {
        var transposedArray = array[0].map(function(col, i) {
            return array.map(function(row) {
                return row[i]
            })
        });
        return transposedArray;
    }

    function testColumns(array) {
        var columns = [];
        $.each(array, function(index, value){
            columns.push(value.join(''))
        });
        var playBoardString = columns.join('x');
        winMessage(playBoardString);

    }

    function winMessage(string) {
        var pattern = new RegExp(/(r{4,4})|(y{4,4})/);
        var result = pattern.test(string);
        if(result) {
            var player = activePlayer ? "Player 2" : "Player 1";
            activePlayer = !activePlayer;
            alert(player + " wins!");
            restartGame();
        }
    }

    function updatePlayBoard(row, column) {
        var className = activePlayer ? 'player2' : 'player1';
        $('#playBoard .row[data-row = ' + row + ']').find('div[data-column = ' + column + ']').addClass(className)
    }

    function startGame() {
        clearField();
        currentPlayBoard = PLAY_BOARD_DEFAULT.map(function(arr) {
            return arr.slice();
        });
        $('#gameBoard').show();
        playerMoveState();
    }

    function restartGame() {
        clearField();
        currentPlayBoard = PLAY_BOARD_DEFAULT.map(function(arr) {
            return arr.slice();
        });
        playerMoveState();
    }

    function endGame() {
        $('#gameBoard').hide();
        clearField();
        $('#currentPlayer').hide();
    }

    function clearField() {
        $('.player1').removeClass('player1');
        $('.player2').removeClass('player2');
        currentPlayBoard = PLAY_BOARD_DEFAULT.slice(0)
    }

    function playerMoveState() {
        $('#currentPlayer').show();
        $('#playerName').html(activePlayer ? 'Player 2 moves' : 'Player 1 moves');
        var className = activePlayer ? 'player2' : 'player1';
        $('#coinSample').removeClass('player2', 'player1').addClass(className);
    }

    $('#toolBoard').find('button').on('click', function(){
        makeMove($(this).attr('data-column-button'))
    });

    $('#startGame').on('click', function(){
        startGame();
    });

    $('#restartGame').on('click', function(){
        restartGame();
    });

    $('#endGame').on('click', function(){
        endGame();
    });

});