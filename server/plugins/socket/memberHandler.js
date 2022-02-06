module.exports = (io, socket) => {
    socket.on("member:admUpdate", (data) => {
        console.log('memberHandler.js', data);
        io.to(data.mb_id).emit('member:admUpdate', data);
    })
}