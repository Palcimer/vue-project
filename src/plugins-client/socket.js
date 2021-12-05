import io from 'socket.io/client-dist/socket.io';
import Vue from 'vue';

const socket = io('/');

socket.onAny((event, ...args) => {
    // 서버의 emit을 받음
    console.log('SOCKET', event, args);
  });

Vue.prototype.$socket = socket;