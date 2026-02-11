import { io } from "socket.io-client";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const socket = io(API_BASE_URL, {
    withCredentials: true,
    autoConnect: false,
});
socket.on("connect", () => {
    console.log("Connected to WS server", socket.id);

    // Example: join a queue room
});

// socket.emit("joinQueue", { queueId: 123, userId: 456 });
// // Listen for messages from server
// socket.on("queueUpdate", (data) => {
//     console.log("Queue update:", data);
// });

// Optional: handle disconnect/reconnect
socket.on("disconnect", () => {
    console.log("Disconnected from server");
});