import { useState, useEffect, useMemo } from "react";
import { useAuthContext } from "./useAuthContext";
import io from "socket.io-client";
import SocketContext from "./SocketContextObject";

export const SocketContextProvider = ({ children }) => {
  const [onlineUsers, setOnlineUsers] = useState([]);
  const { authUser } = useAuthContext();

  const socket = useMemo(() => {
    if (!authUser) return null;

    return io("https://texting-app-mern-4.onrender.com", {
      query: {
        userId: authUser._id,
      },
    });
  }, [authUser]);

  useEffect(() => {
    if (!socket) return;

    socket.on("getOnlineUsers", (users) => {
      setOnlineUsers(users);
    });

    return () => {
      socket.close();
    };
  }, [socket]);

  return (
    <SocketContext.Provider value={{ socket, onlineUsers }}>
      {children}
    </SocketContext.Provider>
  );
};
