window.addEventListener('DOMContentLoaded', () => {
    const tiles = Array.from(document.querySelectorAll('.tile'));
    const displayPlayer = document.querySelector('.display-player');
    const buttonReset = document.querySelector('#reset');
    const announcer = document.querySelector('.announcer');

    let play_container = ['', '', '', '', '', '', '', '', ''];
    let currently_playing = 'X';
    let gameIsActive = true;

    const PLAYERX_WON = 'PLAYERX_WON';
    const PLAYERO_WON = 'PLAYERO_WON';
    const TIE = 'TIE';


   

    const winningConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    function handleResultValidation() {
        let roundWon = false;
        for (let i = 0; i <= 7; i++) {
            const winCondition = winningConditions[i];
            const a = play_container[winCondition[0]];
            const b = play_container[winCondition[1]];
            const c = play_container[winCondition[2]];
            if (a === '' || b === '' || c === '') {
                continue;
            }
            if (a === b && b === c) {
                roundWon = true;
                break;
            }
        }

    if (roundWon) {
            announce(currently_playing === 'X' ? PLAYERX_WON : PLAYERO_WON);
            gameIsActive = false;
            return;
        }

    if (!play_container.includes(''))
        announce(TIE);
    }

    const announce = (type) => {
        switch(type){
            case PLAYERO_WON:
                announcer.innerHTML = 'Player <span class="playerO">O</span> Won';
                break;
            case PLAYERX_WON:
                announcer.innerHTML = 'Player <span class="playerX">X</span> Won';
                break;
            case TIE:
                announcer.innerText = 'Tie';
        }
        announcer.classList.remove('hide');
    };

    const isValidAction = (tile) => {
        if (tile.innerText === 'X' || tile.innerText === 'O'){
            return false;
        }

        return true;
    };

    const updateBoard =  (index) => {
        play_container[index] = currently_playing;
    }

    const changePlayer = () => {
        displayPlayer.classList.remove(`player${currently_playing}`);
        currently_playing = currently_playing === 'X' ? 'O' : 'X';
        displayPlayer.innerText = currently_playing;
        displayPlayer.classList.add(`player${currently_playing}`);
    }

    const userAction = (tile, index) => {
        if(isValidAction(tile) && gameIsActive) {
            tile.innerText = currently_playing;
            tile.classList.add(`player${currently_playing}`);
            updateBoard(index);
            handleResultValidation();
            changePlayer();
        }
    }
    
    const resetBoard = () => {
        play_container = ['', '', '', '', '', '', '', '', ''];
        gameIsActive = true;
        announcer.classList.add('hide');

        if (currently_playing === 'O') {
            changePlayer();
        }

        tiles.forEach(tile => {
            tile.innerText = '';
            tile.classList.remove('playerX');
            tile.classList.remove('playerO');
        });
    }

    tiles.forEach( (tile, index) => {
        tile.addEventListener('click', () => userAction(tile, index));
    });

    buttonReset.addEventListener('click', resetBoard);
});