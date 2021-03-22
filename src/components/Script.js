//Global constants 
const clueHoldTime = 1000; //how long each clue plays (1 second)
const cluePauseTime = 333;
const nextClueWaitTime = 1000; 

//Global variables
var pattern = [2, 2, 4, 3, 2, 1, 2, 4];
var progress = 0;
var gamePlaying = false;
var tonePlaying = false;
var volume = 0.9;
var guessCounter = 0;

//Start the game
function startGame(){
  //game variables
  progress = 0;
  gamePlaying = true;
  //swap start and stop buttons - hide and un-hide
  document.getElementById("startBtn").classList.add("hidden");
  document.getElementById("stopBtn").classList.remove("hidden");
  playClueSequence();
}

//Stop the game
function stopGame(){
  //game variables
  gamePlaying = false;
  //swap start and stop buttons - hide and un-hide
  document.getElementById("startBtn").classList.remove("hidden");
  document.getElementById("stopBtn").classList.add("hidden");
}

//Lighting and clearing buttons
function lightButton(btn){
  document.getElementById("button"+btn).classList.add("lit")
}
function clearButton(btn){
  document.getElementById("button"+btn).classList.remove("lit")
}

//Playing a single clue 
function playSingleClue(btn){
  if(gamePlaying){
    lightButton(btn);
    playTone(btn,clueHoldTime);
    // built in javascript function 
    setTimeout(clearButton,clueHoldTime,btn);
  }
}

//Playing whole clue sequence 
function playClueSequence(){
  guessCounter = 0;
  let delay = nextClueWaitTime; //set delay to initial wait time
  for(let i=0;i<=progress;i++){ // for each clue that is revealed so far
    console.log("play single clue: " + pattern[i] + " in " + delay + "ms")
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

function guess(btn){
  console.log("user guessed: " + btn);
  if(!gamePlaying){
    return;
  }

  //if the user is correct 
  if(pattern[guessCounter] == btn){
    //if computer turn is equal to where the player is 
    if(guessCounter == progress) {
      //if it reaches the last one in the pattern list 
      if(progress == pattern.length -1){ 
        //player wins the game 
         winGame();
      }else {
        //f the pattern is correct to what the player is inputng
        progress++;
        // add next segment until it reaches the end 
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
  4: 466.2
}
function playTone(btn,len){ 
  o.frequency.value = freqMap[btn]
  g.gain.setTargetAtTime(volume,context.currentTime + 0.05,0.025)
  tonePlaying = true
  setTimeout(function(){
    stopTone()
  },len)
}
function startTone(btn){
  if(!tonePlaying){
    o.frequency.value = freqMap[btn]
    g.gain.setTargetAtTime(volume,context.currentTime + 0.05,0.025)
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