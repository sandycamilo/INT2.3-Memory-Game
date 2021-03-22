// global constants
//how long each clue plays (1 second)
const cluePlayTime = 1000; 
const cluePauseTime = 333;
const nextClueWaitTime = 1000; 

// global variables
let pattern = [2, 5, 4, 1, 2, 6, 2, 6, 3, 4, 1, 6];
let progress = 0;
let gamePlaying = false;
let tonePlaying = false;
// volume of the tone 
let volumeTone = 0.9;
let guessCounter = 0;

// start the game  
function startGame(){
  //game variables
  progress = 0;
  gamePlaying = true;
  //swap start and stop buttons - when you press start you can see stop now
  document.getElementById("start").classList.add("hidden");
  document.getElementById("stop").classList.remove("hidden");
  playClues();
}

// stop the game
function stopGame(){
  //game variables
  gamePlaying = false;
  //swap start and stop buttons - hide and un-hide
  document.getElementById("start").classList.remove("hidden");
  document.getElementById("stop").classList.add("hidden");
}

// light the buttons and dim the buttons
function lightButton(btn){
  document.getElementById("button"+btn).classList.add("lit")
}
function dimButton(btn){
  document.getElementById("button"+btn).classList.remove("lit")
}

// play one single clue 
function playSingleClue(btn){
  if(gamePlaying){
    lightButton(btn);
    // generate sound 
    playTone(btn,cluePlayTime);
    // built in javascript function - set time out
    setTimeout(dimButton,cluePlayTime,btn);
  }
}

// play all of the clues 
function playClues(){
  guessCounter = 0;
  // set delay to initial wait time
  let delay = nextClueWaitTime;
  // for each clue that is revealed so far
  for(let i=0;i<=progress;i++){ 
    // console.log("play single clue: " + pattern[i] + " in " + delay + "ms")
    // set a timeout to play that clue
    setTimeout(playSingleClue,delay,pattern[i]) 
    delay += cluePlayTime 
    delay += cluePauseTime;
  }
}

// user loses the game - display message
function loseGame(){
  stopGame();
  alert("Game Over. You lost :(");
}

// user wins the game - display message
function winGame(){
  stopGame();
  alert("Congrats! You won! :D");
}

function guess(btn){
  // console.log("user guessed: " + btn);
  if(!gamePlaying){
    return;
  }

  //if the user is correct 
  if(pattern[guessCounter] === btn){
    if(guessCounter === progress) {
      if(progress === pattern.length -1){ 
         winGame();
      }else {
        // if the pattern is correct to what the player is inputng go to the next clue 
        progress++;
        playClues();
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
  5: 259.2,
  6: 429.2
}
function playTone(btn,len){ 
  o.frequency.value = freqMap[btn]
  g.gain.setTargetAtTime(volumeTone,context.currentTime + 0.05,0.025)
  tonePlaying = true
  setTimeout(function(){
    stopTone()
  },len)
}
function startTone(btn){
  if(!tonePlaying){
    o.frequency.value = freqMap[btn]
    g.gain.setTargetAtTime(volumeTone,context.currentTime + 0.05,0.025)
    tonePlaying = true
  }
}
function stopTone(){
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