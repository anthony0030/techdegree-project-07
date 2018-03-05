const StartGameButton = document.querySelector('.btn__reset');
const overlayStart = document.getElementById('overlay');
const qwerty = document.getElementById('qwerty');
const phrase = document.getElementById('phrase');
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


function getRandomPhraseArray(arr){
    //do stuff to any arr that is passed in 
} 

function addPhraseToDisplay(arr){
    // do stuff any arr that is passed in, and add to `#phrase ul`
}

function checkLetter(arr){
   
}

function checkWin(arr){
  
}