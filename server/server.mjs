//importing the socket.io admin ui
//visit https://admin.socket.io/ for admin commands
import { createServer } from "http";
import express from "express";
import { Server } from 'socket.io';
import world from "./player_state.mjs";
import world2 from "./bullet_state.mjs";
import { instrument } from "@socket.io/admin-ui";
import { makeId } from "./game.mjs";
import dirname from "path"
import { fileURLToPath } from 'url';
import path from "path"
import dotenv from "dotenv"
dotenv.config()
const port = process.env.PORT;
const user = process.env.USER;
const key = process.env.PASS;
// allows you to use __dirname
// const __dirname = dirname(fileURLToPath(import.meta.url));
//getting the express function
const app = express();
//the client rooms
const clientRooms = [];

//creating the server
const httpServer = createServer(app);

//initating the folder
const clientPath = `${dirname}/../client`;

app.use(express.static(clientPath));
// allows access to the use of theses scripts
// app.use('/build/', express.static(path.join(__dirname, "/three/build")));
// app.use('/jsm/', express.static(path.join(__dirname, "/three/examples/jsm")));
// app.use('/dist/', express.static(path.join(__dirname, "/cannon-es/dist")));
// app.use('/dist/', express.static(path.join(__dirname, "/cannon-es-debugger/dist")));
const io = new Server(httpServer, {
  cors: {
    origin: ["https://admin.socket.io"],
    credentials: true
  }
})


instrument(io, {
  auth: { //can also be false
    type: "basic",
    username: user,
    password: key// "TgwmUthr33.js" is pAs
  },
  //   /* options */
    maxHttpBufferSize: 2e8,
    pingTimeout: 60000,
});
// {
//   /* options */
//   maxHttpBufferSize: 2e8,
//   pingTimeout: 60000
// }
// io.setMaxListeners(0);

const list = []
io.on("connection", (client) => {
  const id = client.id;

  console.log("A user joined");

  //getting the amount of users connected to the server
  console.log("There are " + io.engine.clientsCount);

  //the game code
  // let code = makeId(7);
  // let code = "test"; // -- for debuggin only
  // client.join(code);
  // clientRooms.push(code);

  list.push(id)
  console.log(list)
  // console.log(clientRooms);

  //creating the player connection
  world.addPlayer(id);
  const player = world.playerForId(id);
  client.emit("createPlayer", player);

  //brodcasting the other player but the client
  client.broadcast.emit("addOtherPlayer", player);

  client.on("requestOldPlayers", function () {
    for (let i = 0; i < world.players.length; i++) {
      if (world.players[i].playerId !== id)
        client.emit("addOtherPlayer", world.players[i]);
    }
  });
  //updating the position of the player
  client.on("updatePosition", function (data) {
    let newData = world.updatePlayerData(data);
    client.broadcast.emit("updatePosition", newData);
  });

  //creating the player connection
  world2.addBullet(id);
  const bullet = world2.bulletForId(id);
  client.emit("createBullet", bullet);

  //brodcasting the other bullet but the client
  client.broadcast.emit("addOtherBullet", bullet);

  client.on("requestOldBullets", function () {
    for (let i = 0; i < world2.bullets.length; i++) {
      if (world2.bullets[i].bulletId !== id)
        client.emit("addOtherBullet", world2.bullets[i]);
    }
  });

  //updating the position of the bullet
  client.on("updateBulletPosition", function (data) {
    let newData = world2.updateBulletData(data);
    client.broadcast.emit("updateBulletPosition", newData);
  });

  //happens when the player dies
  client.on("playerKilled", function (data) {
    let unknownPlayer = true;
    for (let i = 0; i < list.length; i++) {
      if (data == list[i]) { // first check if playerid is in the list of all the players
        client.broadcast.to(data).emit("kill2", client.id); // sends to the specific player
        unknownPlayer = false;
        return io.emit("kill", client.id, data) //sends to all players
      }
      // else if (data !== list[i]) {
      //   console.log("Not in list") // check if the player Id is in the list
      //   io.emit("removeOtherPlayer", world.playerForId(data));
      //   world.removePlayer(world.playerForId(data));
      //   list.splice(i, 1);
      // }
    }
    // if (unknownPlayer == true) {
    //   // client.broadcast.to(data).disconnectSockets()
    // }
  });

  client.on("clicked1", function () {
    io.emit("clicked1");
  });

  client.on("clicked2", function () {
    io.emit("clicked2");
  });

  //show the player the game code
  client.on("nameTag", function (data) {
    client.broadcast.emit("nameTag", data);
  });
  //when the user enters the game
  client.on("entergame", (text) => {
    io.emit("entergame", text);
  });

  //when the user is chatting
  client.on("typing", (text) => {
    io.emit("typing", text);
  });

  // io.emit("GameUpdate", { data: "Game has updated please refresh the page" })  

  //happens when the game is been updated
  // io.emit("game_update", "the game is been updated, please wait a while then refresh");

  //when the user leaves
  client.on("disconnecting", () => {
    console.log("There are " + io.engine.clientsCount + " players left in the server")
    list.splice(list.indexOf(player.playerId), 1)
    // io.in(id).disconnectSockets();
    console.log(`${id} left the game`);
    io.emit("LeaveGame", `someone left the game`);
    //removing the player when they leave
    io.emit("removeOtherPlayer", player);
    world.removePlayer(player);
  });
});

/*putting it at the end or begining of the connect 
function will prevent it from glitching
when user refreshes page
*/
//the timer mech
let interval;
let countdownTimer, remaingSeconds;
const startingMinutes = 4;
let time = startingMinutes * 60;
/* set the timer to count down for every sec*/
interval = setInterval(counter, 1000);

function counter() {
  /* the minute*/
  let minutes = Math.floor(time / 60);
  /* the second*/
  let seconds = time % 60;
  /* if the seconds is less than 10 then it should display 0 to the next number*/
  seconds = seconds < 10 ? "0" + seconds : seconds;
  /*adding the count down to show in the html*/
  io.emit("timer", `${minutes} : ${seconds}`);

  /* decreaseaing the timer*/
  time--;
  /* if the timer is less than 0 it should stop*/
  if (time <= startingMinutes) {
    clearInterval(interval);
    //setting the map time to 0
    time = 0;

    //the data to change the map
    io.emit("stoptimer", "0 : 00");

    countdownTimer = setInterval(displayMapTimer, 1000);
  }
}

let seconds = 10;

function displayMapTimer() {
  let minutes = Math.round((seconds - 30) / 60);
  remaingSeconds = seconds % 60;

  //showing the timer
  io.emit("showBreakTimer");

  if (remaingSeconds < 10) {
    remaingSeconds = "0" + remaingSeconds;
  }

  seconds--;
  console.log("seconds:" + seconds);
  //updating the timer
  io.emit("updateBreakTimer", minutes + ":" + remaingSeconds);

  if (seconds <= 0) {
    seconds = 0;
    remaingSeconds = 0;
    //removing the timer
    clearInterval(countdownTimer);
    io.emit("endBreakTimer");
  }
}

// when an error happens on the server
httpServer.on("error", (err) => {
  console.error("An error Happened please fix it and try again" + err);
});

//letting the server listen on a port
httpServer.listen(port, () => {
  console.log(`server running on port ${port}`);
});
