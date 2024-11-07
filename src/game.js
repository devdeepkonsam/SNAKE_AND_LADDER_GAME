let tog = 1;
let rollingSound = new Audio('rpg-dice-rolling-95182.mp3');
let winSound = new Audio('winharpsichord-39642.mp3');
let playersSum = [0, 0];
let snakeAndLadder = {12: 50, 4: 56, 14: 55, 22: 58, 41: 79, 54: 88, 96: 42, 94: 71, 75: 32, 48: 16, 37: 3, 28: 10};

let gameOver = false; // Flag to track if the game is over

function play(playerIndex, playerId, correction, num) {
    playersSum[playerIndex] += num;
    if (playersSum[playerIndex] > 100) {
        playersSum[playerIndex] -= num;
    }
    if (snakeAndLadder[playersSum[playerIndex]]) {
        playersSum[playerIndex] = snakeAndLadder[playersSum[playerIndex]];
    }
    let sum = playersSum[playerIndex];

    document.getElementById(`${playerId}`).style.transition = sum === 100 ? "none" : "linear all .5s";

    if (sum === 100 && !gameOver) {
        winSound.play();

        // Set the player's position at the bottom-left corner
        document.getElementById(`${playerId}`).style.left = `${0 * 62}px`;  // Column 0 (leftmost)
        document.getElementById(`${playerId}`).style.top = `${-9 * 62 - correction}px`;  // Row 9 (bottom row)

        // Prevent multiple alerts and reloads
        gameOver = true; // Set the flag to true

        setTimeout(() => {
            alert((playerIndex === 0 ? "Red" : "Blue") + " Won!!");
            location.reload(); // Reload the page after a short delay
        }, 500);  // Show alert after a short delay to allow the player to reach 100
    } else {
        let n1 = Math.floor(sum / 10);
        let n2 = sum % 10;

        if (n1 % 2 !== 0) {
            document.getElementById(`${playerId}`).style.left = `${(n2 === 0 ? 9 : 9 - (n2 - 1)) * 62}px`;
            document.getElementById(`${playerId}`).style.top = `${(-n1 + (n2 === 0 ? 1 : 0)) * 62 - correction}px`;
        } else {
            document.getElementById(`${playerId}`).style.left = `${(n2 === 0 ? 0 : n2 - 1) * 62}px`;
            document.getElementById(`${playerId}`).style.top = `${-n1 * 62 - correction}px`;
        }
    }
}




document.getElementById("diceBtn").addEventListener("click", function () {
    rollingSound.play();

    let num = Math.floor(Math.random() * 6) + 1;
    let currentPlayerColor = tog % 2 !== 0 ? "Red" : "Blue";

    // Update the turn display to show the current player's turn and dice roll in one line
    document.getElementById("tog").innerText = `${currentPlayerColor}'s Turn: ${num}`;
    document.getElementById("lastRoll").innerText = `Last Roll (${currentPlayerColor}): ${num}`;

    if (tog % 2 !== 0) {
        play(0, 'p1', 0, num);
    } else {
        play(1, 'p2', 55, num);
    }

    tog++;

    setTimeout(() => {
        document.getElementById("tog").innerText = `${currentPlayerColor === "Red" ? "Blue" : "Red"}'s Turn: 0`;
        document.getElementById("dice").innerText = "0";
    }, 1000);
});
