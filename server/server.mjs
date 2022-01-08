//importing the socket.io admin ui
//visit https://admin.socket.io/ for admin commands
import {createServer} from "http";
import express from "express";
import {Server} from 'socket.io';
import world from "./player_state.mjs";
import world2  from "./bullet_state.mjs";
import {instrument} from "@socket.io/admin-ui";
import {makeId} from "./game.mjs";
import dirname from "path"
const port = process.env.PORT;
const user = process.env.USER;
const key = process.env.PASS;
 
//getting the express function
const app = express();
//the client rooms
const clientRooms = [];

//creating the server
const httpServer = createServer(app);

//initating the folder
const clientPath = `${dirname}/../client`;

app.use(express.static(clientPath));

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
    password:  key// "TgwmUthr33.js" is pAs
  }
});
// {
  //   /* options */
  //   maxHttpBufferSize: 2e8,
  //   pingTimeout: 60000
  // }
  io.setMaxListeners(0);
  
  console.log("A user joined");
  
  io.on("connection", (client) => {
  //getting the amount of users connected to the server
  // const count = io.engine.clientsCount;

  //the game code
  let code = makeId(7);
  // let code = "test"; // -- for debuggin only
  client.join(code);
  clientRooms.push(code);

  const id = client.id;
  console.log(`${id} joined ` + code);
  console.log(clientRooms);

  //when the user enters the game
  client.on("entergame", (text) => {
    io.to(code).emit("entergame", text);
  });

  //show the player the game code
  client.on("show code", (data) => {
    data = code;
    io.to(code).emit("show code", data);
  });

  //when the user is chatting
  client.on("typing", (text) => {
    io.to(code).emit("typing", text);
  });

  //making the users see each other
  world.addPlayer(id);

  //creating the player connection
  let player = world.playerForId(id);
  io.emit("createPlayer", player);

  //brodcasting the other player
  io.emit("addOtherPlayer", player);

  client.on("requestOldPlayers", function () {
    for (let i = 0; i < world.players.length; i++) {
      if (world.players[i].playerId !== id)
        client.emit("addOtherPlayer", world.players[i]);
    }
  });

  //updating the position of the player
  client.on("updatePosition", function (data) {
    let newData = world.updatePlayerData(data);
    io.emit("updatePosition", newData);
  });

  //making the players see the other players bullet
  world2.addBullet(id);

  //creating the bullet connection
  let bullet = world2.bulletForId(id);
  io.emit("createBullet", bullet);

  //brodcasting the other players bullet
  io.emit("addOtherBullet", bullet);

  client.on("requestOldBullets", function () {
    for (let i = 0; i < world2.bullets.length; i++) {
      if (world2.bullets[i].bulletId !== id)
        io.emit("addOtherBullet", world2.bullets[i]);
    }
  });

  //updating the position of the bullets
  client.on("updateBulletPosition", function (data) {
    let newData2 = world2.updateBulletData(data);
    io.emit("updateBulletPosition", newData2);
    bullet.bulletZ += 10;
  });

  //when the user wants to create a new game
  client.on("newGame", function () {
    client.leave(code)
    let roomName = makeId(7);
    code = roomName;
    // clientRooms[client.id] = roomName;
    client.emit("gameCode", roomName);
    client.join(roomName);
    clientRooms.push(roomName);
    io.to(roomName).emit("show code", roomName);    
  });

  // when the user wants to join a game
  client.on("joinGame", function (gameCode) {
    for (let i = 0; i < clientRooms.length; i++) {
      if (gameCode === clientRooms[i]) {
        console.log(gameCode)
        client.emit("check");
        // client.join(gameCode);
      //   console.log(`${id} is now in room ${gameCode}`);
      return;
      } 
      if (gameCode !== clientRooms[i]) {
        console.log("wrong code");
      return;
      }
    }
  });

  //happens when the player dies
  client.on("playerKilled", function () {
    client.broadcast.emit("kill_log", `${client.id}`);
    // console.log(`${client.id} killed`);
  });

  client.on("clicked1", function () {
    io.emit("clicked1");
  });

  client.on("clicked2", function () {
    io.emit("clicked2");
  });

  //show the player the game code
  client.on("nameTag", function(data){
    io.emit("nameTag");
  });
  //happens when the game is been updated
  // io.emit("game_update", "the game is been updated, please wait a while then refresh");

  //when the user leaves
  client.on("disconnect", () => {
    
    ////
    let index1 = clientRooms.indexOf(code);
    //remove the clients room from the client arry
    clientRooms.splice(index1, 1);
    console.log(clientRooms);

    console.log(`${id} left the game`);
    io.to(code).emit("LeaveGame", `someone left the game`);
    //removing the player when they leave
    io.emit("removeOtherPlayer", player);
    world.removePlayer(player);
    //removing the bullet when player leaves
    io.emit("removeOtherBullet", bullet);
    world2.removeBullet(bullet);
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
