// import { io } from "https://cdn.socket.io/4.4.0/socket.io.esm.min.js";
import {map1} from "./villageMap.js";
import {map2} from "./firefly.js";

const fireflymap = document.getElementsByClassName("card-holder");
const mapholder = document.getElementById("map-container");
const sock = io();
let breakTimer = document.getElementById("breaktimer");
let vote_counter = document.getElementsByClassName("vote_counter");
let vote = {value:0};
let vote2 = {value:0};
let count1 = {value:0},
  count2 = {value:0};


//triggered when the show timer event is ready
sock.on("showBreakTimer", showBreakTimer);
//triggered on the updateBreak Timer event
sock.on("updateBreakTimer", updateBreakTimer);
//triggered on the end Break Timer event
sock.on("endBreakTimer", endBreakTimer);
//showing the timer
function showBreakTimer() {
  breakTimer.style.display = "block";
}

//updating the timer
function updateBreakTimer(data) {
  breakTimer.innerHTML = data;
}
//randomly runs functions
function randomFrom(array) {
  return array[Math.floor(Math.random() * array.length)];
}

//stoping the timer from continuing
function endBreakTimer() {
  breakTimer.style.display = "none";
  mapholder.style.display = "none";

  //checking if the vote for map one is greater or less
  if (count1.value > count2.value) {
    setTimeout(map1, 1000);
  } else if (count2.value > count1.value) {
    setTimeout(map2, 1000);
  } // checks if the vote is the same or is empty
  else if (count1.value === count2.value || (count1.value === 0 && count2.value === 0)) {
    setTimeout(randomFrom([map1, map2]), 1000);
  }
}

//loading the next map
//adding a click eventListener to each map
fireflymap[0].addEventListener("click", function () {
  sock.emit("clicked1");
});

fireflymap[1].addEventListener("click", function () {
  sock.emit("clicked2");
});


export{
  vote,
  vote2,
  count1,
  vote_counter,
  fireflymap,
  count2
}