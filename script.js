const youSaid = document.querySelector('.you-said');
const guessOutput = document.querySelector('.guess');
const hint = document.querySelector('.hint');
const mic = document.querySelector('i');
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

// Taken from mdn web docs
// Innitialized our speech recognition and grammar objects
const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;
const SpeechGrammarList =
  window.SpeechGrammarList || window.webkitSpeechGrammarList;
const SpeechRecognitionEvent =
  window.SpeechRecognitionEvent || window.webkitSpeechRecognitionEvent;
const recognition = new SpeechRecognition();
const speechRecognitionList = new SpeechGrammarList();
recognition.continuous = false;
recognition.lang = 'en-US';
recognition.interimResults = false;
recognition.maxAlternatives = 1;

// Event Listeners
mic.addEventListener('click', (e) => {
  console.log('start');
  recognition.start();
});

recognition.onresult = (event) => {
  const guess = event.results[0][0].transcript;
  console.log('direct input guess: ', guess);
  checkGuess(guess);
};

recognition.onspeechend = () => {
  recognition.stop();
};

// Checking if the guess is correct and reflecting that in the DOM
function checkGuess(guess) {
  const guessNum = textToNum(guess);
  console.log('RandomNum: ', randomNum, 'guessNum: ', guessNum);
  if (guessNum == randomNum) {
    console.log('correct!');
  } else {
    console.log('wrong!');
    guessOutput.textContent = guessNum;
  }
}

// Depending on how the speech is recognized, the input could be a number or a word
// Checks for both and always returns a number
function textToNum(textNum) {
  if (!Number(textNum)) {
    let convertedNum =
      textNumArray.findIndex((current) => current == textNum) + 1;
    console.log(convertedNum);
    return convertedNum;
  } else {
    return Number(textNum);
  }
}
