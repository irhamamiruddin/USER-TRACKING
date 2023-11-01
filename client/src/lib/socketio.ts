import { io } from "socket.io-client";

const socket = process.env.REACT_APP_WEB_SOCKET_SERVER || "ws://localhost:5000";
const IO = io(socket);

export default IO;