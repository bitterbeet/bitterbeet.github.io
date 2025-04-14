const quoteText = document.getElementById('js-quote-text');
const answerText = document.getElementById('js-answer-text');
const newQuoteButton = document.getElementById('js-new-quote');
const showAnswerButton = document.getElementById('js-tweet');

let currentTrivia = {};

// API URL
const apiUrl = 'https://api.api-ninjas.com/v1/quotes';

// Fetch trivia from API
async function getTrivia() {
  answerText.textContent = '';
  quoteText.textContent = 'Loading...';

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    
    // Extract question and answer
    const trivia = data.results[0];
    currentTrivia = {
      question: decodeHTMLEntities(trivia.question),
      answer: decodeHTMLEntities(trivia.correct_answer)
    };
    
    quoteText.textContent = currentTrivia.question;
  } catch (error) {
    console.error('Error fetching trivia:', error);
    quoteText.textContent = 'Oops! Could not load trivia.';
  }
}

// Show the answer
function showAnswer() {
  if (currentTrivia.answer) {
    answerText.textContent = currentTrivia.answer;
  } else {
    answerText.textContent = "Please click 'Generate' first!";
  }
}

// Fix HTML entities like &quot; in questions
function decodeHTMLEntities(text) {
  const parser = new DOMParser();
  const decodedString = parser.parseFromString(text, 'text/html').body.textContent;
  return decodedString;
}

// Event listeners
newQuoteButton.addEventListener('click', getTrivia);
showAnswerButton.addEventListener('click', showAnswer);

// Initial trivia
getTrivia();
