function getMixin(vm) {
	const { socket } = vm.$options;
	if(socket) {
		return  socket.call(vm);
	}
}

const clientMixin = {
    data() {
        return {
            socketEvents: [],
        }
    },
	mounted() {
		const socket = getMixin(this);
		if(socket) {
			this.socketEvents = Object.keys(socket);
            for(const ev of this.socketEvents) {
                this.$socket.on(ev, socket[ev]);
            } 
            console.log(this.socketEvents);
		}
	},
    destroyed() {
        for(const ev of this.socketEvents) {
            this.$socket.offn(ev);
        } 
    }
}

export default clientMixin;