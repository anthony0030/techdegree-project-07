const StartGameButton = document.querySelector('.btn__reset');
const overlayStart = document.getElementById('overlay');
const qwerty = document.getElementById('qwerty');
const phrase = document.getElementById('phrase');
const phraseUl = phrase.getElementsByTagName('ul')[0];
var missed = 0;

const phrases = [
	"curiosity killed the cat",
	"alls well that ends well",
	"a bird in the hand is worth two in the bush",
	"religion is the opiate of the masses",
	"all men die"
];



StartGameButton.addEventListener('click', function(){ 
	overlayStart.style.display = "none";
});

qwerty.addEventListener('click', function(e){ 
	console.log(e.target.textContent);
});



function getRandomPhraseAsArray(arr){
	var phraseNumber = Math.floor(Math.random() * (arr.length  + 1));
	// console.log(phraseNumber);
	var curentPhrase = arr[phraseNumber];
	// console.log(curentPhrase);
	var curentPhraseLetters = curentPhrase.split('');
	// console.log(curentPhraseLetters);
	return curentPhraseLetters
} 

const phraseArray = getRandomPhraseAsArray(phrases);

function addPhraseToDisplay(arr){
  for (var i = 0; i < phraseArray.length; i++) { 
	  var li = document.createElement("li");
	  li.appendChild(document.createTextNode(arr[i]));
	  if(arr[i] === " "){li.className += "space"}
	  else {li.className += "letter"}
	  phraseUl.appendChild(li);
	}
}

addPhraseToDisplay(phraseArray); 

function checkLetter(arr){
   
}

function checkWin(arr){
  
}