import { Server } from "socket.io";
import express from "express";
import http from "http";
import cors from "cors";

const PORT = 5000;
const app = express();
const server = new http.Server(app);
const io = new Server(server, { cors: { origin: "*" } });

// Parsing JSON
app.use(express.json());

// Enable CORS
app.use(cors({ origin: "*" }));

io.on("connection", async (socket: any) => {
    console.log("User connected:", socket.id);

    // When a user disconnects
    socket.on("disconnect", () => {
        console.log(`User ${socket.id} disconnected`);
    });

    // When a user is idle
    socket.on("user-idle", (userId: any) => {
        console.log(`User ${userId} is idle`);
    });
});

// Start the server and listen on the pre-defined port
server.listen(PORT, () => {
    console.log(`Server is listening on port: ${PORT}`);
});

// Handle server errors
server.on("error", (error) => {
    console.error("Server error:", error);
});