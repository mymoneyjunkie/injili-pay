// src/socket.js
import { io } from "socket.io-client";

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL; // or your deployed server IP/domain

//console.log(SOCKET_URL);

const socket = io(SOCKET_URL, {
  transports: ["websocket"], // ensures real-time connection
  autoConnect: false,        // optional: allows manual connect
});

export default socket;
