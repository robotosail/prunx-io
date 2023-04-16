import { playerId, updatePlayerPosition, createPlayer, addOtherPlayer, removeOtherPlayer, updatePlayerData, playerForId, playerHp, alive } from "./player.js";
// import { io } from "https://cdn.socket.io/4.4.0/socket.io.esm.min.js";
import { scene } from "./three.js";
import { vote, vote2, count1, vote_counter, fireflymap, count2 } from "./map.js";
import { createBullet, updateBulletPosition, addOtherBullet, removeOtherBullet, updateBulletData } from "./weapon.js";
import { otherPlayersId, otherPlayer } from "./player.js";
import { log } from "./guicontrols.js";
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
    // happens when the user joins the game
    sock.on("entergame", function (data) {
      log({ text: data, bgcolor: "purple" });
    });
  });
  ///// Player
  sock.on("createPlayer", function (data) {
    createPlayer(data);
  });
  sock.on("addOtherPlayer", function (data) {
    addOtherPlayer(data); //adds player when someone joins
  });
  //happens when user moves
  sock.on("updatePosition", function (data) {
    updatePlayerPosition(data); //it updates the players position
  });
  sock.on("removeOtherPlayer", function (data) {
    removeOtherPlayer(data); //removes player when someone leaves the game
  });
  sock.emit("requestOldPlayers", {}); // adding the old players
  /////

  //// Bullet
  sock.on("createBullet", function (data) {
    createBullet(data); /// creates a new bullet
  });
  sock.on("addOtherBullet", function (data) {
    addOtherBullet(data); //adds Bullet when someone joins
  });
  sock.on("updateBulletPosition", function (data) {
    updateBulletPosition(data); //it updates the Bullets position
  });
  sock.on("removeOtherBullet", function (data) {
    removeOtherBullet(data); //removes Bullet when someone leaves the game
  });
  sock.emit("requestOldBullets", {}); // adds the old bullets when a new player joins the game.

  ////

  // //shows the player name tag
  sock.emit("nameTag", "what is ur name")

  //happens when user leaves game
  sock.on("LeaveGame", function (data) {
    log({ text: data, bgcolor: "purple" });
  });
  //happens when users are chatting
  sock.on("typing", function (data) {
    log({ text: data })
  });


  class ProgressBar {
    constructor(element, initialVal = 100) {
      this.valueElem = element.querySelector(".progress-val");
      this.fillElem = element.querySelector(".progress-bar-fill");

      this.setValue(initialVal);
    }
    /**
     * 
     * @param {*} newValue 
     */
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
  const hp = new ProgressBar(document.getElementById("progress-bar"));
  // let hplive = 100;

  let thisplayer, killer;

  //// response to player being killed (aka the player doing the shooting)
  /**
   * @param data the current player
   * @param player the player being shot at player
   */
  sock.on("kill", function (data, player) {
    killer = data;
    const currentPlayer = playerForId(player);

    if (currentPlayer.hp <= 0) {
      scene.remove(currentPlayer); // removing the player from the scene

      if (data == playerId) { // send a different message to the killer than to every one else
        log({ text: `You killed ${player}`, color: "red" });
      }
      else {
        log({ text: `${data} killed ${player}`, color: "red" });

      }
      // sock.emit("resetPlayerPos");
      // updating this info
      updatePlayerData();
      sock.emit("updatePosition", player);
    }
  });
  
  /// --- only sent to the player being shot at
  sock.on("kill2", function (data) {
    const blood = document.getElementById("blood");
    thisplayer = playerForId(data);

    if (playerHp.value <= 0) { // check if the hp is less than 0
      playerHp.value = 0
      alive.value = false;
      log({ text: `you were killed by ${killer}`, color: "red" }); // message to the player that was killed
    }
    else { // else reduce health by 10
      playerHp.value -= 3;
      blood.style.opacity += 3;
    }

    thisplayer.hp = playerHp.value; // setting the players health on the server
    hp.setValue(thisplayer.hp); // chaning the health
    

    if (playerHp.value <= 80) { // if player health is less than 50 show the blood
      blood.style.display = "block";
    }

    // increase health after 5 secs
    const addHp = setInterval(function () {
      if (playerHp.value !== 0 && playerHp.value !== 100) {
        playerHp.value += 3
        hp.setValue(playerHp.value);
        blood.style.display = "none";
      }
      else {
        clearInterval(addHp)
      }
    }, 5000)

    updatePlayerData(); // updating the new info
    sock.emit("updatePosition", data);
  })
  
  //happens when the game is updating
  sock.on("GameUpdate", function (data) {
    // alert(data);
    document.getElementsByTagName("body")[0].innerHTML = data.data;
    setTimeout(window.location.reload(), 3000)
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
    // });
  });

}
connects();

export {
  sock,
  clientId,
  connects
}
