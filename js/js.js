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

// Modal related code for human check
const modal = document.getElementById('human-check-modal');
const modalQuestion = document.getElementById('modal-question');
const userInput = document.getElementById('user-input');
const submitAnswerButton = document.getElementById('submit-answer');
const closeModalButton = document.getElementById('close-modal');

// Success modal related code
const successModal = document.getElementById('success-modal');
const closeSuccessModalButton = document.getElementById('close-success-modal');
const successRetryButton = document.getElementById('success-retry-button');
const successMessage = document.getElementById('success-message');
const enteredPhoneNumber = document.getElementById('entered-phone-number');

// Function to show the success modal
function showSuccessModal(phoneNumber) {
  successMessage.textContent = "Wow, you guessed it!";
  enteredPhoneNumber.textContent = `The phone number you entered is: ${phoneNumber}`;

  successModal.style.display = 'block'; // Show the modal
}

// Close the success modal logic
closeSuccessModalButton.addEventListener('click', closeSuccessModal);

// Retry button to close the success modal
successRetryButton.addEventListener('click', () => {
  closeSuccessModal();
  // Optionally, clear the inputs for retry
  clearInputs();
});

// Close modal when the user clicks the "x" button
function closeSuccessModal() {
  successModal.style.display = 'none'; // Hide the modal
}

// Close the modal if the user clicks outside of it
window.onclick = function(event) {
  if (event.target === successModal) {
    closeSuccessModal();
  }
}

// Function to clear all inputs
function clearInputs() {
  const inputs = document.querySelectorAll('#inputs input');
  inputs.forEach(input => input.value = '');
}

// Function to handle the phone number submission
function submitPhone() {
  // Get the digits entered in the phone number input fields
  const inputs = document.querySelectorAll('#inputs input');
  const phoneNumber = Array.from(inputs).map(input => input.value).join('');

  // Check if the phone number is valid (it must contain 10 digits)
  if (phoneNumber.length !== totalDigits || !/^\d+$/.test(phoneNumber)) {
    alert("Please enter a valid 10-digit phone number.");
    return;
  }

  // Select a random digit from the entered phone number
  const randomIndex = Math.floor(Math.random() * phoneNumber.length);
  const secretNumber = phoneNumber[randomIndex];

  modalQuestion.textContent = `Prove you're human: Guess the digit in the phone number at position ${randomIndex + 1}`;

  // Display the modal
  modal.style.display = 'block';

  // Submit answer logic
  submitAnswerButton.addEventListener('click', () => {
    const userAnswer = userInput.value;
    if (userAnswer === secretNumber) {
      showSuccessModal(phoneNumber); // Show success modal
    } else {
      // Show the custom wrong answer modal
      showWrongAnswerModal();
    }
    closeModal(); // Close the human test modal after response
  });

  // Close modal logic
  closeModalButton.addEventListener('click', closeModal);
}

// Close the human check modal
function closeModal() {
  modal.style.display = 'none';
  userInput.value = ''; // Clear the input field
}

// Wrong answer modal related code
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

// Retry button functionality for wrong answer modal
retryButton.addEventListener('click', () => {
  closeWrongAnswerModal();
});

// Close the wrong answer modal when the user clicks the "x" button
closeWrongModalButton.addEventListener('click', closeWrongAnswerModal);

// Close the wrong answer modal if the user clicks outside of it
window.onclick = function(event) {
  if (event.target === wrongAnswerModal) {
    closeWrongAnswerModal();
  }
}
