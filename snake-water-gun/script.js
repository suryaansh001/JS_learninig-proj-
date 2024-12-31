let userScore = 0;
let computerScore = 0;
let playAudio = new Audio('sng_audio.ogg'); // Audio file for "Snake-Water-Gun"

// Choices for the game
const choices = ["snake", "water", "gun"];

const userChoiceForm = document.getElementById('choice-form');
const resultText = document.getElementById('result-text');
const userScoreElement = document.getElementById('user-score');
const computerScoreElement = document.getElementById('computer-score');
const startButton = document.getElementById('start-button');

// Hide all images initially
const snakeImg = document.getElementById('snake-img');
const waterImg = document.getElementById('water-img');
const gunImg = document.getElementById('gun-img');

const images = [snakeImg, waterImg, gunImg];

// Reset images
function resetImages() {
    images.forEach(img => img.style.display = 'none');
}

// Function to play the audio before each round
function playSound() {
    playAudio.play();
}

// Show the selected image
function showImage(choice) {
    resetImages();
    if (choice === 'snake') {
        snakeImg.style.display = 'inline-block';
    } else if (choice === 'water') {
        waterImg.style.display = 'inline-block';
    } else if (choice === 'gun') {
        gunImg.style.display = 'inline-block';
    }
}

// Generate a random choice for the computer
function computerChoice() {
    let randomIndex = Math.floor(Math.random() * 3);
    return choices[randomIndex];
}

// Decide the winner based on user and computer choices
function decideWinner(user, computer) {
    if (user === computer) {
        return "Tie!";
    } else if ((user === "snake" && computer === "water") ||
               (user === "water" && computer === "gun") ||
               (user === "gun" && computer === "snake")) {
        return "Player Wins!";
    } else {
        return "Computer Wins!";
    }
}

// Update scores
function updateScore(winner) {
    if (winner === "Player Wins!") {
        userScore++;
    } else if (winner === "Computer Wins!") {
        computerScore++;
    }
    userScoreElement.textContent = userScore;
    computerScoreElement.textContent = computerScore;
    resultText.textContent = `Player: ${userScore} | Computer: ${computerScore}`;
}

// Handle the start button click
startButton.addEventListener('click', function() {
    // Play the "Snake-Water-Gun" audio before continuing
    playSound();
});

// Handle the form submission
userChoiceForm.addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form from reloading the page

    // Wait until the audio finishes before proceeding with the game
    playAudio.onended = function() {
        // Get the user's selected choice
        let userChoice = document.querySelector('input[name="choice"]:checked').value;

        // Show the user's choice image
        showImage(userChoice);

        // Get the computer's choice and show it
        let compChoice = computerChoice();
        setTimeout(() => {
            showImage(compChoice); // Show computer's image with a slight delay
        }, 500); // Delay to show images after user selects

        // Determine the result and update the scores
        let result = decideWinner(userChoice, compChoice);
        setTimeout(() => {
            updateScore(result); // Update the score after result
            resultText.textContent = `Player: ${userScore} | Computer: ${computerScore} | ${result}`;
        }, 1000); // Delay result update to simulate processing time
    };
});