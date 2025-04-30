const container = document.getElementById('inputs');
const totalDigits = 10;

for (let i = 0; i < totalDigits; i++) {
  const input = document.createElement('input');
  input.maxLength = 1;
  input.type = 'password';

  input.addEventListener('input', (e) => {
    const value = e.target.value;
    if (/^\d$/.test(value)) {
      const nextInput = document.querySelectorAll('#inputs input')[i + 1];
      if (nextInput) nextInput.focus();
    } else {
      clearRandomInputs();
      alert("Wrong key! We cleared 3 digits for you.");
    }
  });

  container.appendChild(input);

  if (i === 2 || i === 5) {
    const dash = document.createElement('span');
    dash.textContent = '-';
    dash.style.fontSize = '24px';
    dash.style.margin = '0 5px';
    container.appendChild(dash);
  }
}

function clearRandomInputs() {
  const inputs = Array.from(document.querySelectorAll('#inputs input'));
  const filledInputs = inputs.filter(input => input.value !== '');
  const toClear = filledInputs.sort(() => 0.5 - Math.random()).slice(0, Math.min(3, filledInputs.length));
  toClear.forEach(input => input.value = '');
}

function clearOneDigit() {
  const inputs = Array.from(document.querySelectorAll('#inputs input'));
  const filledInputs = inputs.filter(input => input.value !== '');
  if (filledInputs.length === 0) return;
  const randomInput = filledInputs[Math.floor(Math.random() * filledInputs.length)];
  randomInput.value = '';
}

function clearInputs() {
  document.querySelectorAll('#inputs input').forEach(input => input.value = '');
}

function closeModal() {
  modal.style.display = 'none';
  userInput.value = '';
}

function showWrongAnswerModal() {
  wrongAnswerModal.style.display = 'block';
}

function closeWrongAnswerModal() {
  wrongAnswerModal.style.display = 'none';
}

function closeSuccessModal() {
  successModal.style.display = 'none';
}

const modal = document.getElementById('human-check-modal');
const modalQuestion = document.getElementById('modal-question');
const userInput = document.getElementById('user-input');
let submitAnswerButton = document.getElementById('submit-answer');
const closeModalButton = document.getElementById('close-modal');

const successModal = document.getElementById('success-modal');
const closeSuccessModalButton = document.getElementById('close-success-modal');
const successRetryButton = document.getElementById('success-retry-button');
const successMessage = document.getElementById('success-message');
const enteredPhoneNumber = document.getElementById('entered-phone-number');

const wrongAnswerModal = document.getElementById('wrong-answer-modal');
const closeWrongModalButton = document.getElementById('close-wrong-modal');
const retryButton = document.getElementById('retry-button');

closeModalButton.addEventListener('click', closeModal);
closeSuccessModalButton.addEventListener('click', closeSuccessModal);
successRetryButton.addEventListener('click', () => {
  closeSuccessModal();
  clearInputs();
});

closeWrongModalButton.addEventListener('click', closeWrongAnswerModal);
retryButton.addEventListener('click', closeWrongAnswerModal);

window.addEventListener('click', function (event) {
  if (event.target === successModal) closeSuccessModal();
  if (event.target === wrongAnswerModal) closeWrongAnswerModal();
  if (event.target === modal) closeModal();
});

function submitPhone() {
  const inputs = document.querySelectorAll('#inputs input');
  const phoneNumber = Array.from(inputs).map(input => input.value).join('');

  if (phoneNumber.length !== totalDigits || !/^\d+$/.test(phoneNumber)) {
    alert("Please enter a valid 10-digit phone number.");
    return;
  }

  const randomIndex = Math.floor(Math.random() * phoneNumber.length);
  const secretNumber = phoneNumber[randomIndex];

  modalQuestion.textContent = `Prove you're human: Guess the digit in the phone number at position ${randomIndex + 1}`;
  modal.style.display = 'block';

  const newButton = submitAnswerButton.cloneNode(true);
  submitAnswerButton.parentNode.replaceChild(newButton, submitAnswerButton);
  submitAnswerButton = newButton;

  submitAnswerButton.addEventListener('click', () => {
    const userAnswer = userInput.value;
    if (userAnswer === secretNumber) {
      showSuccessModal(phoneNumber);
    } else {
      showWrongAnswerModal();
    }
    closeModal();
  });
}

function showSuccessModal(phoneNumber) {
  successMessage.textContent = "Wow, you guessed it!";
  enteredPhoneNumber.textContent = `The phone number you entered is: ${phoneNumber}`;
  successModal.style.display = 'block';
}

let revealedIndex = 0;

function revealNextDigit() {
  const inputs = document.querySelectorAll('#inputs input');
  if (revealedIndex >= inputs.length) {
    alert("That's all the digits!");
    return;
  }
  const input = inputs[revealedIndex];
  const originalType = input.type;
  input.type = 'text';
  setTimeout(() => {
    input.type = originalType;
    revealedIndex++;
  }, 1000);
}

function resetReveal() {
  revealedIndex = 0;
}
