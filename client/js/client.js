import {updatePlayerPosition, createPlayer, addOtherPlayer, removeOtherPlayer, updatePlayerData} from "./player.js";
import { io } from "https://cdn.socket.io/4.4.0/socket.io.esm.min.js";
import {scene} from "./three.js";
import {vote, vote2, count1, vote_counter, fireflymap, count2} from "./map.js";
import {createBullet, updateBulletPosition, addOtherBullet, removeOtherBullet, updateBulletData} from "./weapon.js";
import { otherPlayersId, otherPlayer } from "./player.js";
import {log} from "./guicontrols.js";

const sock = io(
  {
    //helps player reconnect back to server
    reconnection: false
  }
);
//player name tag
let clientId = sock.id;

let clientRoom;

function connects() {
  //shows the player when they connect
   sock.on("connect", function () {
  sock.emit("entergame", `someone joined the game`);
  sock.emit("show code");

  // //shows the player name tag
    sock.emit("nameTag")

    sock.emit("requestOldPlayers", {});
    //the bullets
    sock.emit("requestOldBullets", {});
  
  //happens when the user connects to the game
  sock.on("join", function(data){
    log({text: data})
  });

  // happens when the user joins the game
  sock.on("entergame", function(data){
    log({text: data, bgcolor: "purple"});
  });

  //happens when user leaves game
  sock.on("LeaveGame", function(data){
    log({text: data, bgcolor: "purple"});
  });

  //shows the user the game code
  sock.on("show code", function (data) {
    clientRoom = data;
    console.log(clientRoom);
    log({text: clientRoom});
  });

  //happens when users are chatting
  sock.on("typing", function(data){
    log({text: data})
  }, clientRoom);

  //happens when user moves
  //it updates the players position
  sock.on("updatePosition", function (data) {
    updatePlayerPosition(data);
  });

  //creates player every time someone joins
  sock.on("createPlayer", function (data) {
    createPlayer(data);
  });

  //adds player when someone joins
  sock.on("addOtherPlayer", function (data) {
    addOtherPlayer(data);
  });

  //removes player when someone leaves the game
  sock.on("removeOtherPlayer", function (data) {
    removeOtherPlayer(data);
  });

  /**/
  //when the user shoots
  //it updates the players position
  sock.on("updateBulletPosition", function (data) {
    updateBulletPosition(data);
  });

  //creates bullet every time player shoots
  sock.on("createBullet", function (data) {
    createBullet(data);
  });

  //adds bullet when other player shoots
  sock.on("addOtherBullet", function (data) {
    addOtherBullet(data);
  });

  //removes bullet when someone leaves the game
  sock.on("removeOtherBullet", function (data) {
    removeOtherBullet(data);
  });

  class ProgressBar {
    constructor(element, initialVal = 100) {
      this.valueElem = element.querySelector(".progress-val");
      this.fillElem = element.querySelector(".progress-bar-fill");

      this.setValue(initialVal);
    }
    setValue(newValue) {
      if (newValue < 0) {
        newValue = 0;
      } else if (newValue > 100) {
        newValue = 100;
      }
      this.value = newValue;
      this.update();
    }
    update() {
      const percentage = this.value + "%";

      this.fillElem.style.width = percentage;
      this.valueElem.textContent = percentage;
    }
  }

  //messages that the player has been killed
  let hp = new ProgressBar(document.getElementById("progress-bar"));
  let hplive = 100;
  sock.on("kill_log", function (data) {
    let blood = document.getElementById("blood");
    hplive -= 5;
    hp.setValue(hplive);
    blood.style.display = "block";

    if (document.querySelector(".progress-bar-fill").style.width === "0%") {
      log({text: `${otherPlayersId[1]} killed by ${data}`, bgcolor: "red"});
      scene.remove(otherPlayer);
    }
  });

  //happens when the game is updating
  sock.on("game_update", function (data) {
    // alert(data);
    document.getElementsByTagName("body")[0].innerHTML = data;
  });

  sock.on("clicked1", function () {
    vote.value++;
    count1.value = vote.value;
    vote_counter[0].innerHTML = count1.value;
    fireflymap[0].classList.add("selected");
  });

  sock.on("clicked2", function () {
    vote2.value++;
    count2.value = vote2.value;
    vote_counter[1].innerHTML = count2.value;
    fireflymap[1].classList.add("selected");
  });
});

}
connects();

export{
  sock,
  clientId,
  connects
}
