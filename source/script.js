const chars= ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
const phrases = [
  "curiosity killed the cat",
  "alls well that ends well",
  "a bird in the hand is worth two in the bush",
  "religion is the opiate of the masses",
  "all men die",
  "even bad coffee is better than no coffee at all",
  "i never laugh until i have had my coffee",
  "decaffeinated coffee is the devils blend",
  "Time is an illusion"
];
const title = document.querySelector(".title");
const startGameButton = document.querySelector(".btn__reset");
const overlay = document.getElementById("overlay");
const qwerty = document.getElementById("qwerty");
const qwertyButtons = qwerty.getElementsByTagName("button");
const phrase = document.getElementById("phrase");
const phraseUl = phrase.getElementsByTagName("ul")[0];
const triesLI = document.querySelectorAll("li.tries");

var lives = triesLI.length;
var currentPhraseLetters = "";
var missed = 0;
var letters = 0;

function contains(a, obj){
  for(var i = 0; i < a.length; i++){
    if (a[i] === obj){
      return true;
    }
  }
  return false;
}

function win(){
  // console.log("win() run");
  title.textContent = "You were successful at the Wheel of Success :D";
  startGameButton.textContent = "Play Again!";
  overlay.style.display = "";
  overlay.className = "start win";
}

function checkWin(){
  // console.log("checkWin() run");
  if(letters === 0){
    // console.log("You win!");
    win();
  }
}

function lose(){
  // console.log("lose() run");
  title.textContent = "You lost at the wheel of success :(";
  startGameButton.textContent = "Try Again :)";
  overlay.style.display = "";
  overlay.className = "start lose";
}

function removeLife(){
  // console.log("removeLife() run")
  triesLI[missed - 1].className += "-die";
  lives--;
  // console.log("LOST A LIFE");
  if(lives === 0){
    // console.log("YOU LOST ALL THE LIVES");
    lose();
  }
}

function showLetter(letter){
  // console.log("showLetter() run");
  // console.log("removing " + letter);
  for(var j = 0; j < phraseUl.children.length; j++){
    var letterToCheck = phraseUl.children[j];
    if(letterToCheck.textContent === letter){
      // console.log(letterToCheck);
      letterToCheck.className += " show";
      letters--;
    }
  }
  checkWin();
}

function findOSKKey(letterToBeFound){
  // console.log("getRandomPhraseAsArray() run");
  for (var u = 0; u < qwertyButtons.length; u++){
    if (qwertyButtons[u].textContent === letterToBeFound){
      return qwertyButtons[u];
    }
  }
}

function checkLetter(event, keyboard){
  // console.log("checkLetter() run");
  let key = event.target;

  if(keyboard){
    // console.log("keyboard used");
    key = findOSKKey(event);
  }

  if((key.tagName === "BUTTON" || keyboard) && key.className !== "chosen"){
    // console.log(key.textContent);
    key.className += "chosen";

    var found = false;
    for(var i = 0; i < currentPhraseLetters.length; i++){
      var currentPhraseLetter = currentPhraseLetters[i];
      if(currentPhraseLetter === key.textContent){
        // console.log("is found!!!!!!!");
        // console.log(key);
        found = true;
        showLetter(currentPhraseLetter);
        currentPhraseLetter = "";
        break;
      }
    }
    if(!found){
      // console.log("DIE!!!!!!!");
      missed++;
      removeLife();
    }
  }
}

function getRandomPhraseAsArray(arr){
  //console.log("getRandomPhraseAsArray() run");
  var phraseNumber = Math.floor(Math.random() * (arr.length));
  //console.log(phraseNumber);
  var currentPhrase = arr[phraseNumber];
  //console.log(currentPhrase);
  var currentPhraseLetters = currentPhrase.split("");
  //console.log(currentPhraseLetters);
  letters = currentPhraseLetters.length;
  return currentPhraseLetters;
}

function addPhraseToDisplay(arr){
  // console.log("addPhraseToDisplay() run");
  for (var i = 0; i < currentPhraseLetters.length; i++){
    var li = document.createElement("li");
    li.appendChild(document.createTextNode(arr[i]));
    if(arr[i] === " "){
      li.className += "space";
      letters--;
    }
    else{
      li.className += "letter";
    }
    phraseUl.appendChild(li);
  }
}

function init(){
  // console.log("init() run");
  // Resets Variables
  missed = 0;
  letters = 0;
  lives = triesLI.length;
  //resets keyboard
  const chosenLetters = qwerty.querySelectorAll(".chosen");
  for(var q = 0; q < chosenLetters.length; q++){
    chosenLetters[q].classList.remove("chosen");
  }

  //Resets top phrase
  while(phraseUl.firstChild){
    phraseUl.removeChild(phraseUl.firstChild);
  }

  //Resets Lives class
  for(var l = 0; l < lives; l++){
    triesLI[l].className = "tries";
  }

  currentPhraseLetters = getRandomPhraseAsArray(phrases);
  addPhraseToDisplay(currentPhraseLetters);

  // Event listener for the On-Screen Keyboard
  qwerty.addEventListener("click", checkLetter);

  // Event listener for Keyboard
  document.addEventListener("keypress", function(e){
    if(contains(chars, e.key)){
      checkLetter(e.key.toLowerCase(), true);
    }
    // console.log(e.key);
  });
} //End of init()

startGameButton.addEventListener("click", function(){
  overlay.style.display = "none";
  init();
});
