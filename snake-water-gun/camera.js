let userScore = 0;
let computerScore = 0;
const playAudio = new Audio('sng_audio.ogg'); // Audio file
const computerChoiceImg = document.getElementById('computer-choice');
const resultText = document.getElementById('result-text');
const userScoreElement = document.getElementById('user-score');
const computerScoreElement = document.getElementById('computer-score');
const startButton = document.getElementById('start-button');
const camera = document.getElementById('camera');
const choices = ["snake", "water", "gun"];
let userGesture = "";

// Initialize webcam
async function startCamera() {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    camera.srcObject = stream;
}

// Capture user gesture (placeholder for hand recognition logic)
function captureUserGesture() {
    // Simulate gesture recognition (replace with TensorFlow.js Handpose or other logic)
    const randomIndex = Math.floor(Math.random() * 3);
    userGesture = choices[randomIndex]; // Simulated result
    resultText.textContent = `User's Gesture: ${userGesture}`;
}

// Generate a random choice for the computer
function generateComputerChoice() {
    const randomIndex = Math.floor(Math.random() * 3);
    const choice = choices[randomIndex];
    computerChoiceImg.src = `${choice}.jpg`;
    computerChoiceImg.style.display = "block";
    return choice;
}

// Decide the winner
function decideWinner(user, computer) {
    if (user === computer) return "It's a Tie!";
    if (
        (user === "snake" && computer === "water") ||
        (user === "water" && computer === "gun") ||
        (user === "gun" && computer === "snake")
    ) {
        userScore++;
        return "You Win!";
    } else {
        computerScore++;
        return "Computer Wins!";
    }
}

// Update scores and display the result
function updateScores(result) {
    userScoreElement.textContent = userScore;
    computerScoreElement.textContent = computerScore;
    resultText.textContent = result;
}

// Start game workflow
startButton.addEventListener('click', () => {
    playAudio.play();
    playAudio.onended = async () => {
        // Open camera
        await startCamera();

        // Simulate gesture capture
        setTimeout(() => {
            captureUserGesture();

            // Generate computer choice
            const computerGesture = generateComputerChoice();

            // Decide winner and update scores
            const result = decideWinner(userGesture, computerGesture);
            updateScores(result);
        }, 2000); // Simulate delay for gesture recognition
    };
});
