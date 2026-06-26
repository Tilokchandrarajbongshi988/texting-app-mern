import { createContext } from "react";

const SocketContext = createContext({
  socket: null,
  onlineUsers: [],
});

export default SocketContext;
