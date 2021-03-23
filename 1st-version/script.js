//Global constants 
const cluePauseTime = 333;
const nextClueWaitTime = 1000; 

//Global variables
let pattern = []
let progress = 0;
let gamePlaying = false;
let tonePlaying = false;
let volume = 0.9;
let guessCounter = 0;
let clueHoldTime = 600; //how long each clue plays (1 second)
let mistakecount = 0;

// generate random pattern for every game 
function secretPattern(){
  for (i = 0; i < 15; i++) {
    pattern.push(Math.floor(Math.random() * 6) + 1)
  }
}

//Start the game
function startGame(){
  //game variables
  progress = 0;
  gamePlaying = true;
  mistakecount = 0;
  //swap start and stop buttons - hide and un-hide
  document.getElementById("startBtn").classList.add("hidden");
  document.getElementById("stopBtn").classList.remove("hidden");
  secretPattern();
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
  let delay = nextClueWaitTime; //set delay to initial wait time ~ 1000 =  1sec 
  for(let i=0; i<=progress; i++){ // for each clue that is revealed so far
    // console.log("play single clue: " + pattern[i] + " in " + delay + "ms")
    setTimeout(playSingleClue, delay, pattern[i]) // set a timeout to play that clue
    // speed up every time it plays another note 
    delay = (delay - 133) + clueHoldTime; 
    delay = delay + cluePauseTime; //333
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
  // console.log("user guessed: " + btn);
  if(!gamePlaying){
    return;
  }

  //pattern generated - guesscounter starts at 0 
  //btn pressed
  // 5 == 5 
  if(pattern[guessCounter] === btn){
    //guesscounter starts at 0 , progress starts at 0 
    //0 == 0 
    //progress- so we know where we are at in the pattern of 15 digits 
      if(guessCounter === progress) {
        //progress starts at 0 , last digit in the pattern
        // 15 == 15
        if(progress === pattern.length -1){ 
          //player wins the game 
          winGame();
        }else {
          // progress + 1 
          // 0 + 1 = 1 
          progress++;
          // play every clue in the sequence as they are added 
          playClueSequence();
        } 
      }else {
        //guess counter starts 0 and adds 1 as it progresses 
        guessCounter++;
      }
  }else {
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
  5: 234.2,
  6: 324.9
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