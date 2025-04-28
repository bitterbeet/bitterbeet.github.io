const container = document.getElementById('inputs');
const totalDigits = 10;

// Create 10 input fields
for (let i = 0; i < totalDigits; i++) {
  const input = document.createElement('input');
  input.maxLength = 1;
  input.type = 'password'; // Makes input look like ●
  
  input.addEventListener('input', (e) => {
    const value = e.target.value;
    
    // If it's a valid digit (0-9), move the cursor to the next input
    if (/^\d$/.test(value)) {
      const nextInput = document.querySelectorAll('#inputs input')[i + 1];
      if (nextInput) {
        nextInput.focus();
      }
    } 
    
    // If the input is not a digit, clear random digits and show alert
    if (!/^\d$/.test(value)) {
      clearRandomInputs();
      alert("Wrong key! We cleared 3 digits for you.");
    }
  });

  container.appendChild(input);

  // Add dashes at the right places
  if (i === 2 || i === 5) {
    const dash = document.createElement('span');
    dash.textContent = '-';
    dash.style.fontSize = '24px';
    dash.style.margin = '0 5px';
    container.appendChild(dash);
  }
}
// Modal related code
const modal = document.getElementById('human-check-modal');
const modalQuestion = document.getElementById('modal-question');
const userInput = document.getElementById('user-input');
const submitAnswerButton = document.getElementById('submit-answer');
const closeModalButton = document.getElementById('close-modal');

// Fake submit function with impossible "human test"
function submitPhone() {
  // Start impossible "human" test
  const secretNumber = Math.floor(Math.random() * 1000000) + 1;
  modalQuestion.textContent = `Prove you're human: Guess the number I'm thinking of (1-1,000,000)`;

  // Display the modal
  modal.style.display = 'block';

  // Submit answer logic
  submitAnswerButton.addEventListener('click', () => {
    const userAnswer = parseInt(userInput.value);
    if (userAnswer === secretNumber) {
      alert("Wow, you guessed it! ...Just kidding. Try again.");
    } else {
      alert("Wrong! Try again!");
    }
    closeModal(); // Close the modal after response
  });

  // Close modal logic
  closeModalButton.addEventListener('click', closeModal);
}

// Close the modal
function closeModal() {
  modal.style.display = 'none';
  userInput.value = ''; // Clear the input field
}

window.onclick = function(event) {
  if (event.target === modal) {
    closeModal();
  }
}
const wrongAnswerModal = document.getElementById('wrong-answer-modal');
const closeWrongModalButton = document.getElementById('close-wrong-modal');
const retryButton = document.getElementById('retry-button');

// Function to show the wrong answer modal
function showWrongAnswerModal() {
  wrongAnswerModal.style.display = 'block'; // Show the modal
}

// Function to close the wrong answer modal
function closeWrongAnswerModal() {
  wrongAnswerModal.style.display = 'none'; // Hide the modal
}

retryButton.addEventListener('click', () => {
  // Close the modal
  closeWrongAnswerModal();
});

// Close the modal when the user clicks the "x" button
closeWrongModalButton.addEventListener('click', closeWrongAnswerModal);

//Close the modal if the user clicks outside of it
window.onclick = function(event) {
  if (event.target === wrongAnswerModal) {
    closeWrongAnswerModal();
  }
}

// Updating the submitPhone function to use the new modal for wrong answers
function submitPhone() {
  const secretNumber = Math.floor(Math.random() * 1000000) + 1;
  modalQuestion.textContent = `Prove you're human: Guess the number I'm thinking of (1-1,000,000)`;

  modal.style.display = 'block';

  // Submit answer logic
  submitAnswerButton.addEventListener('click', () => {
    const userAnswer = parseInt(userInput.value);
    if (userAnswer === secretNumber) {
      alert("Wow, you guessed it! ...Just kidding. Try again.");
    } else {
      // Show the custom wrong answer modal
      showWrongAnswerModal();
    }
    closeModal(); // Close the human test modal after response
  });

  // Close modal logic
  closeModalButton.addEventListener('click', closeModal);
}
