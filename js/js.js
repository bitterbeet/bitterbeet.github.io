const container = document.getElementById('inputs');
const digits = 10;

for (let i = 0; i < digits; i++) {
  const input = document.createElement('input');
  input.maxLength = 1;
  input.setAttribute('tabindex', Math.floor(Math.random() * 10));
  input.addEventListener('input', () => {
    input.style.top = Math.random() * 100 + 'px';
    input.style.left = Math.random() * 100 + 'px';
    alert("Nice! One digit down!");
  });
  container.appendChild(input);
}

function moveButton() {
  const button = document.querySelector('.submit-button');
  button.style.left = `${Math.random() * 90}%`;
  button.style.top = `${Math.random() * 90}%`;
}

document.addEventListener('keydown', (e) => {
  if (e.key === 'Backspace') {
    const newInput = document.createElement('input');
    newInput.maxLength = 1;
    newInput.value = Math.floor(Math.random() * 10);
    container.appendChild(newInput);
    alert("Oops! Backspace added a digit.");
  }
});
