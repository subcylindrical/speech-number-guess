const youSaid = document.querySelector('.you-said');
const guessOutput = document.querySelector('.guess');
const hint = document.querySelector('.hint');
const mic = document.querySelector('i');
const feedBack = document.querySelector('.feedback-wrapper');
const playAgainBtn = document.querySelector('.play-again');

const randomNum = Math.floor(Math.random() * 100) + 1;
const textNumArray = [
  'one',
  'two',
  'three',
  'four',
  'five',
  'six',
  'seven',
  'eight',
  'nine',
  'ten',
  'eleven',
  'twelve',
  'thirteen',
  'founteen',
  'fifteen',
  'sixteen',
  'seventeen',
  'eighteen',
  'nineteen',
  'twenty',
  'twentyone',
  'twentytwo',
  'twentythree',
  'twentyfour',
  'twentyfive',
  'twentysix',
  'twentyseven',
  'twentyeight',
  'twentynine',
  'thiry',
  'thirtyone',
  'thirtytwo',
  'thirtythree',
  'thirtyfour',
  'thirtyfive',
  'thirtysix',
  'thirtyseven',
  'thirtyeight',
  'thirtynine',
  'fouty',
  'foutyone',
  'foutytwo',
  'foutythree',
  'foutyfour',
  'foutyfive',
  'foutysix',
  'foutyseven',
  'foutyeight',
  'foutynine',
  'fifty',
  'fiftyone',
  'fiftytwo',
  'fiftythree',
  'fiftyfour',
  'fiftyfive',
  'fiftysix',
  'fiftyseven',
  'fiftyeight',
  'fiftynine',
  'sixty',
  'sixtyone',
  'sixtytwo',
  'sixtythree',
  'sixtyfour',
  'sixtyfive',
  'sixtysix',
  'sixtyseven',
  'sixtyeight',
  'sixtynine',
  'seventy',
  'seventyone',
  'seventytwo',
  'seventythree',
  'seventyfour',
  'seventyfive',
  'seventysix',
  'seventyseven',
  'seventyeight',
  'seventynine',
  'eighty',
  'eightyone',
  'eightytwo',
  'eightythree',
  'eightyfour',
  'eightyfive',
  'eightysix',
  'eightyseven',
  'eightyeight',
  'eightynine',
  'ninety',
  'ninetyone',
  'ninetytwo',
  'ninetythree',
  'ninetyfour',
  'ninetyfive',
  'ninetysix',
  'ninetyseven',
  'ninetyeight',
  'ninetynine',
  'onehundred',
];
let resultPos = 0;

console.log(randomNum);

// Taken from mdn web docs
// Innitialized our speech recognition and grammar objects
const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;
const SpeechGrammarList =
  window.SpeechGrammarList || window.webkitSpeechGrammarList;
const SpeechRecognitionEvent =
  window.SpeechRecognitionEvent || window.webkitSpeechRecognitionEvent;
let recognition = new SpeechRecognition();
const speechRecognitionList = new SpeechGrammarList();
recognition.continuous = true;
recognition.lang = 'en-US';
recognition.interimResults = false;
recognition.maxAlternatives = 0;

// Event Listeners
mic.addEventListener('click', (e) => {
  console.log('start');
  recognition.start();
});

playAgainBtn.addEventListener('click', (e) => {
  location.reload();
});

// Listen for voice input
recognition.onresult = (event) => {
  let guess = event.results[resultPos][0].transcript;
  console.log('direct input guess: ', guess);
  checkGuess(guess);
  feedBack.style.display = 'flex';
  resultPos++;
};

// Checking if the guess is correct and reflecting that in the DOM
function checkGuess(guess) {
  const guessNum = textToNum(guess);
  console.log(typeof guessNum);
  if (guessNum == randomNum) {
    console.log('correct!');
    guessOutput.textContent = guessNum;
    hint.textContent = `That's Correct!`;
    recognition.stop();
    document.querySelector('.guess-wrapper').classList.add('complete');
    playAgainBtn.classList.add('active');
  } else {
    guessOutput.textContent = guessNum;
    hint.textContent = guessNum < randomNum ? 'Go Higher!' : 'Go Lower!';
  }
  if (typeof guessNum != 'number') {
    hint.textContent = 'That is not a number!';
  }
}

// Depending on how the speech is recognized, the input could be a number or a word
// Checks for both and always returns a number
function textToNum(textNum) {
  if (!Number(textNum)) {
    let convertedNum =
      textNumArray.findIndex((current) => current == textNum) + 1;
    if (convertedNum === 0) return textNum;
    return Number(convertedNum);
  } else {
    return Number(textNum);
  }
}
