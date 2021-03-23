import '../components/Game/Game'

//Global constants 
const clueHoldTime = 1000; //how long each clue plays (1 second)
const cluePauseTime = 333;
const nextClueWaitTime = 1000; 
const start = document.getElementById("startBtn")
const stop = document.getElementById("stopBtn")
const lit = document.getElementById("button")
const clear = document.getElementById("button")

//Global variables
let pattern = [2, 5, 4, 3, 2, 1, 2, 4, 6, 3, 2, 1, 4, 6, 6];
let progress = 0;
let gamePlaying = false;
let tonePlaying = false;
let volume = 0.9;
let guessCounter = 0;

// helper function - turn pattern into digits 
function wordToNum(word) {
  if (word === "one") {
    return 1
  } else if (word === 'two') {
    return 2
  } else if (word === 'three') {
    return 3
  } else if (word === 'four') {
    return 4
  } else if (word === 'five') {
    return 5 
  } else if (word === 'six') {
    return 6
  }
}

//Start the game
export function startGame(){
  //game variables
  progress = 0;
  gamePlaying = true;
  //swap start and stop buttons - hide and un-hide
    start.classList.add("hidden");
    stop.classList.remove("hidden");
  playClueSequence();
}


//Stop the game
export function stopGame(){
  gamePlaying = false;
  //swap start and stop buttons
  start.classList.remove("hidden");
  stop.classList.add("hidden");
}

//Lit and clearing buttons
function lightButton(btn){
  (lit + btn).classList.add("lit")
  document.getElementById("button" + btn).classList.add("lit")
}

function clearButton(btn){
  (clear + btn).classList.remove("lit")
}

//Play a single clue 
function playSingleClue(btn){
  if(gamePlaying){
    lightButton(btn);
    playTone(btn,clueHoldTime);
    // setTimeout is a built in javascript function 
    setTimeout(clearButton,clueHoldTime,btn);
  }
}

//Play whole clue sequence 
function playClueSequence(){
  guessCounter = 0;
  let delay = nextClueWaitTime; //set delay to initial wait time
  for(let i=0;i<=progress;i++){ // for each clue that is revealed so far
    // console.log("play single clue: " + pattern[i] + " in " + delay + "ms")
    setTimeout(playSingleClue,delay,pattern[i]) // set a timeout to play that clue
    delay += clueHoldTime 
    delay += cluePauseTime;
  }
}

//User loses the game 
function loseGame(){
  stopGame();
  alert("Game Over. You lost.");
}

//User wins the game 
function winGame(){
  stopGame();
  alert("Congrats! You won!");
}

//User makes a guess - turn to play
export function guess(btn){
  btn = wordToNum(btn)
  // console.log("user guessed: " + btn);
  if(!gamePlaying){
    return;
  }

  //if the user is correct 
  if(pattern[guessCounter] === btn){
    if(guessCounter === progress) {
      //if it reaches the last one in the pattern list 
      if(progress === pattern.length -1){ 
        //player wins the game 
         winGame();
      }else {
        //if the player is inputing correct keys that match the pattern
        //add another key to play until it reaches the end 
        //play back current sequence
        progress++;
        playClueSequence();
      } 
    }else {
      //player is advancing, so we check the next guess - add onother to the counter
      guessCounter++;
    }
  }else {
    //the user's guess was incorrect so game is over
    loseGame();
  }
}

//Generating sound
// Sound Synthesis Functions
const freqMap = {
  1: 261.6,
  2: 329.6,
  3: 392,
  4: 466.2,
  5: 342.0,
  6: 200.2
}
function playTone(btn,len){ 
  o.frequency.value = freqMap[btn]
  g.gain.setTargetAtTime(volume,context.currentTime + 0.05,0.025)
  tonePlaying = true
  setTimeout(function(){
    stopTone()
  },len)
}
export function startTone(btn){
  btn = wordToNum(btn)
  if(!tonePlaying){
    o.frequency.value = freqMap[btn]
    g.gain.setTargetAtTime(volume,context.currentTime + 0.05,0.025)
    tonePlaying = true
  }
}
export function stopTone(){
    g.gain.setTargetAtTime(0,context.currentTime + 0.05,0.025)
    tonePlaying = false
}

//Page Initialization
// Init Sound Synthesizer
var context = new AudioContext()
var o = context.createOscillator()
var g = context.createGain()
g.connect(context.destination)
g.gain.setValueAtTime(0,context.currentTime)
o.connect(g)
o.start(0)