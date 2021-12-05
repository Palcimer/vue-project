const { Server } = require("socket.io");
const configHandler = require("./configHandler");

module.exports = function(webServer) {
    //webServer = server.js에서 만들어지는 webServer
    const io = new Server(webServer);

    io.on("connection", (socket) => {
        configHandler(io, socket);

        console.log("an user connected: " + socket.id);

        socket.on("disconnect", () => {
          console.log("disconnected: " + socket.id)
        });

        socket.on("room:join", (roomName) => {
          console.log('room:join', roomName);
          socket.join(roomName);
        });

        socket.on("room:leave", (roomName) => {
          console.log('room:leave', roomName);
          socket.leave(roomName);
        });

        socket.on("room:send", (data) => {
          console.log(data);
          const msg = data.msg + " 서버 응답";
          // socket.broadcast.emit('room:msg', {msg});
          //roomtest 룸에 있는 나 포함 모두에게 보냄
          // io.to('roomtest').emit('room:msg', {msg});
          //roomtest 룸에 있는 나를 제외한 모두에게 보냄 
          socket.to('roomtest').emit('room:msg', {msg});
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