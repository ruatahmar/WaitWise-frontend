import { io } from "socket.io-client";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const createSocket = () => {
    const socket = io(API_BASE_URL, {
        withCredentials: true,
        autoConnect: false,
    });

    socket.on("connect", () => console.log("WS connected", socket.id));
    socket.on("disconnect", () => console.log("WS disconnected"));

    return socket;
};