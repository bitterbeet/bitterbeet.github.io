
const newQuoteButton = document.querySelector('#js-new-quote'); // Button to generate new trivia
const tweetButton = document.querySelector('#js-tweet'); // Button to show the answer
const quoteTextElement = document.querySelector('#js-quote-text'); // Element for the trivia question
const answerTextElement = document.querySelector('#js-answer-text'); // Element for the answer


newQuoteButton.addEventListener('click', getQuote);


tweetButton.addEventListener('click', () => {
  if (answerTextElement.style.display === 'none') {
    answerTextElement.style.display = 'block'; 
  } else {
    answerTextElement.style.display = 'none'; 
  }
});


function getQuote() {
  console.log('Button clicked, fetching new trivia...');
  
  
  const apiEndpoint = 'https://trivia.cyberwisp.com/getrandomchristmasquestion';


  fetch(apiEndpoint)
    .then(response => response.json())
    .then(data => {
      if (data && data.question && data.answer) {

        quoteTextElement.textContent = data.question;
        answerTextElement.textContent = data.answer;
        answerTextElement.style.display = 'none'; 
      } else {
        throw new Error('Invalid response data');
      }
    })
    .catch(error => {
      console.error('Error fetching trivia:', error);
      alert('There was an error fetching trivia. Please try again later.');
    });
}

window.addEventListener('DOMContentLoaded', getQuote); // Fetch trivia when the page loads
