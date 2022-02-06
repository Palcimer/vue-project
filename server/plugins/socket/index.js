require('dotenv').config();
const { Server } = require("socket.io");
const configHandler = require("./configHandler");
const redisAdapter = require('socket.io-redis');
const roomHandler = require('./roomHandler');
const memberHandler = require('./memberHandler');

const { REDIS_HOST, REDIS_PORT } = process.env;
console.log('redis', REDIS_HOST, REDIS_PORT);

module.exports = function (webServer) {
  //webServer = server.js에서 만들어지는 webServer
  const io = new Server(webServer);
  io.adapter(redisAdapter({ host: REDIS_HOST, port: REDIS_PORT }));

  io.on("connection", (socket) => {
    configHandler(io, socket);
    roomHandler(io, socket);
    memberHandler(io, socket);

    console.log("an user connected: " + socket.id);

    socket.on("disconnect", () => {
      console.log("disconnected: " + socket.id)
    });

    

    socket.on("room:send", (data) => {
      console.log(data);
      const msg = data.msg + " 서버 응답";
      switch (data.target) {
        case 1:
          console.log('case 1')
          io.emit('room:msg', { msg });
          break;
        case 2:
          console.log('case 2')
          socket.broadcast.emit('room:msg', { msg });
          break;
        case 3:
          console.log('case 3')
          io.to('testroom').emit('room:msg', { msg })
          break;
        case 4:
          console.log('case 4')
          socket.to('testroom').emit('room:msg', { msg });
          break;
      }
      // const msg = data.msg + " 서버 응답";
      // // socket.broadcast.emit('room:msg', {msg});
      // //roomtest 룸에 있는 나 포함 모두에게 보냄
      // // io.to('roomtest').emit('room:msg', {msg});
      // //roomtest 룸에 있는 나를 제외한 모두에게 보냄 
      // socket.to('roomtest').emit('room:msg', { msg });
    });

    socket.on('room:chat', (data) => {
      const {toId, fromId, userMsg} = data;
      io.to(toId).emit('room:chat', {fromId, userMsg});
    });


    socket.on("config:update", (data) => {
      console.log(data);
      // emit: 모든 연결된 클라이언트에게 데이터를 보냄(자기 자신 포함)
      // io.emit('config:update', {recieve: '응답'});
      // broadcast: 연결된 사용자 본인 제외 클라이언트에게 데이터를 보냄
      socket.broadcast.emit('config:update', data);
    })

  });




}