let score = JSON.parse(localStorage.getItem('score'))
if (!score) {
    score = {wins:0, loses:0, tie:0};
} else {
    document.querySelector('.js-score')
        .innerHTML = `Wins: ${score.wins} &nbsp; Loses: ${score.loses} &nbsp; Tie: ${score.tie}`;
}

function pickComputerMove() {
    const value = Math.random();
    let computerMove = '';
    if (0 <= value && value < 1/3) {
        computerMove = 'Rock';
    } else if (1/3 <= value && value < 2/3) {
        computerMove = 'Paper';
    } else {
        computerMove = 'Scissor';
    }
    return computerMove;
}

function playGame(yourMove) {
    const computerMove = pickComputerMove();
    let result = '';

    if (yourMove === "Rock") {
        if (computerMove === 'Rock') {
            result = 'Tie.';
        } else if (computerMove === 'Paper') {
            result = 'You lose.';
        } else {
            result = 'You win.';
        }
    } else if (yourMove === "Paper") {
        if (computerMove === 'Rock') {
            result = 'You win.';
        } else if (computerMove === 'Paper') {
            result = 'Tie.';
        } else {
            result = 'You lose.';
        }
    } else {
        if (computerMove === 'Rock') {
            result = 'You lose.';
        } else if (computerMove === 'Paper') {
            result = 'You win.';
        } else {
            result = 'Tie.';
        }
    }

    if (result === 'You win.') {
        score.wins += 1;
        localStorage.setItem('score', JSON.stringify(score))
    } else if (result === 'You lose.') {
        score.loses += 1;
        localStorage.setItem('score', JSON.stringify(score))
    } else {
        score.tie += 1;
        localStorage.setItem('score', JSON.stringify(score))
    }

    document.querySelector('.js-result')
        .innerHTML = result;
    document.querySelector('.js-scene')
        .innerHTML = `You &nbsp;<img src="images/${yourMove}-emoji.png"> &nbsp;&nbsp;&nbsp; <img src="images/${computerMove}-emoji.png">&nbsp; Computer`;
    document.querySelector('.js-score')
        .innerHTML = `Wins: ${score.wins} &nbsp; Loses: ${score.loses} &nbsp; Tie: ${score.tie}`;
}

let autoplayButton = document.querySelector('.js-autoplay');
let isAutoPlaying = false;
let intervalId;

function autoplay() {
    if (! isAutoPlaying) {
        autoplayButton.innerText = "Stop Autoplay"
        intervalId = setInterval(function() {
                        let yourMove = pickComputerMove();
                        playGame(yourMove);
                    }, 1000);
        isAutoPlaying = true;
    } else {
        autoplayButton.innerText = "Autoplay"
        clearInterval(intervalId);
        isAutoPlaying = false;
    }
    
}