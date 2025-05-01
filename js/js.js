const container = document.getElementById('inputs');
const totalDigits = 10;
let revealedIndex = 0;

// Generate phone input fields with dashes
for (let i = 0; i < totalDigits; i++) {
  const input = document.createElement('input');
  input.maxLength = 1;
  input.type = 'password';
  input.autocomplete = 'off';

  const index = i;
  input.addEventListener('input', (e) => {
    const value = e.target.value;
    if (value === '') return;

    if (/^\d$/.test(value)) {
      const inputs = document.querySelectorAll('#inputs input');
      const nextInput = inputs[index + 1];
      if (nextInput) nextInput.focus();
    } else {
      clearRandomInputs();
      showGeneralModal("Wrong key! We cleared 3 digits for you.");
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

// Helper functions
function clearRandomInputs() {
  const inputs = Array.from(document.querySelectorAll('#inputs input'));
  const filled = inputs.filter(input => input.value !== '');
  const toClear = filled
    .sort(() => 0.5 - Math.random())
    .slice(0, Math.min(3, filled.length));
  toClear.forEach(input => input.value = '');
}

function clearOneDigit() {
  const inputs = Array.from(document.querySelectorAll('#inputs input'));
  const filled = inputs.filter(input => input.value !== '');
  if (filled.length === 0) return;
  const randomInput = filled[Math.floor(Math.random() * filled.length)];
  randomInput.value = '';
}

function clearInputs() {
  document.querySelectorAll('#inputs input').forEach(input => input.value = '');
  resetReveal();
}

function resetReveal() {
  revealedIndex = 0;
}

// Reveal digits one at a time
function revealNextDigit() {
  const inputs = document.querySelectorAll('#inputs input');
  if (revealedIndex >= inputs.length) {
    infoMessage.textContent = "That's all the digits!";
    infoModal.style.display = 'flex';
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

// Modal Elements
const modal               = document.getElementById('human-check-modal');
const modalQuestion       = document.getElementById('modal-question');
const userInput           = document.getElementById('user-input');
let   submitAnswerButton  = document.getElementById('submit-answer');
const closeModalButton    = document.getElementById('close-modal');

const successModal            = document.getElementById('success-modal');
const closeSuccessModalButton = document.getElementById('close-success-modal');
const successRetryButton      = document.getElementById('success-retry-button');
const successMessage          = document.getElementById('success-message');
const enteredPhoneNumber      = document.getElementById('entered-phone-number');

const wrongAnswerModal      = document.getElementById('wrong-answer-modal');
const closeWrongModalButton = document.getElementById('close-wrong-modal');
const retryButton           = document.getElementById('retry-button');

const infoModal             = document.getElementById('info-modal');
const closeInfoModalButton  = document.getElementById('close-info-modal');
const infoOkButton          = document.getElementById('info-ok-button');
const infoMessage           = document.getElementById('info-message');

const generalModal          = document.getElementById('general-modal');
const generalModalMessage   = document.getElementById('general-modal-message');

// ❗️ Run-away Submit button logic
const submitBtn = document.querySelector('.submit-button');
let hoverCount = 0;
submitBtn.addEventListener('mouseover', () => {
  if (hoverCount < 2) {
    submitBtn.style.position = 'relative';
    const dx = Math.floor(Math.random() * 201) - 100;
    const dy = Math.floor(Math.random() * 61) - 30;
    submitBtn.style.left = dx + 'px';
    submitBtn.style.top  = dy + 'px';
    hoverCount++;
  }
});

// Modal show/hide functions
function showGeneralModal(message) {
  generalModalMessage.textContent = message;
  generalModal.style.display = 'flex';
}

function closeGeneralModal() {
  generalModal.style.display = 'none';
}

function closeModal() {
  modal.style.display = 'none';
  userInput.value = '';
}

function closeWrongAnswerModal() {
  wrongAnswerModal.style.display = 'none';
}

function closeSuccessModal() {
  successModal.style.display = 'none';
}

function closeInfoModal() {
  infoModal.style.display = 'none';
}

// Event listeners
closeModalButton.addEventListener('click', closeModal);
closeSuccessModalButton.addEventListener('click', closeSuccessModal);
// Reload page on Retry
successRetryButton.addEventListener('click', () => window.location.reload());
retryButton.addEventListener('click', () => window.location.reload());
closeWrongModalButton.addEventListener('click', closeWrongAnswerModal);
closeInfoModalButton.addEventListener('click', closeInfoModal);
infoOkButton.addEventListener('click', closeInfoModal);
window.addEventListener('click', (event) => {
  if (event.target === successModal) closeSuccessModal();
  if (event.target === wrongAnswerModal) closeWrongAnswerModal();
  if (event.target === modal) closeModal();
  if (event.target === infoModal) closeInfoModal();
  if (event.target === generalModal) closeGeneralModal();
});

// Phone submission + challenge logic
function submitPhone() {
  const inputs = document.querySelectorAll('#inputs input');
  const phoneNumber = Array.from(inputs).map(input => input.value).join('');

  if (phoneNumber.length !== totalDigits || !/^\d+$/.test(phoneNumber)) {
    showGeneralModal("Please enter a valid 10-digit phone number.");
    return;
  }

  const randomIndex = Math.floor(Math.random() * phoneNumber.length);
  const secretNumber = phoneNumber[randomIndex];

  modalQuestion.textContent = `Prove you're human: Guess the digit in the phone number at position ${randomIndex + 1}`;
  modal.style.display = 'flex';

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
  successModal.style.display = 'flex';
}

function showWrongAnswerModal() {
  wrongAnswerModal.style.display = 'flex';
}