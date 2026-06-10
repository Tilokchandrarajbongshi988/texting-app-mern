import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();

const server = http.createServer(app);
const io = new Server(server, {
	cors: {
		origin: ["http://localhost:3000"],
		methods: ["GET", "POST"],
	},
});


export const getReceiverSocketId = (receiverId) => {
	return userSocketMap[receiverId];
};


const userSocketMap = {};
io.on("connection", (socket) => {
	console.log("a user connected", socket.id);

  const userId = socket.handshake.query.userId;
  if (userId != "undefined") userSocketMap[userId] = socket.id;
  io.emit("getOnlineUsers", Object.keys(userSocketMap));
	
	// socket.on() is used to listen to the events. can be used both on client and server side
	socket.on("disconnect", () => {
    delete userSocketMap[userId];
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
	});
});

export { app, io, server };

/*
=========================================
SOCKET.IO ONLINE USERS FLOW
=========================================

1. Express is NOT the actual server.
   Express is a framework that helps us handle routes.

2. Node creates the real HTTP server:

   const server = http.createServer(app);

   app (Express) is attached to the HTTP server.

3. Socket.IO is attached to the same HTTP server:

   const io = new Server(server);

   Now the HTTP server can handle:
   - Normal HTTP requests (Express)
   - Real-time socket connections (Socket.IO)

   Structure:

         HTTP Server
              |
      -----------------
      |               |
    Express       Socket.IO

4. io is the Socket.IO server instance.

   io.on("connection", callback)

   means:

   "When a user connects, run this callback."

5. Socket.IO automatically creates a socket object
   for every connected user and passes it into
   the callback.

   io.on("connection", (socket) => {})

   socket is NOT a function.
   socket is an object representing one user's
   connection.

   Important properties:

   socket.id
   -> unique socket id for this connection

   socket.on(...)
   -> listen for events

   socket.emit(...)
   -> send event to this user

6. During connection the frontend sends:

   io("http://localhost:5000", {
     query: {
       userId: authUser._id
     }
   })

   This userId can be accessed on the server:

   const userId = socket.handshake.query.userId;

7. userSocketMap stores:

   User ID -> Socket ID

   Example:

   {
     "123": "abc123",
     "456": "xyz789"
   }

   This line creates the mapping:

   userSocketMap[userId] = socket.id;

   Example:

   userSocketMap["123"] = "abc123";

8. After storing the user, the server sends
   the updated online users list:

   io.emit(
     "getOnlineUsers",
     Object.keys(userSocketMap)
   );

   Object.keys() returns only the keys.

   Example:

   {
     "123": "abc123",
     "456": "xyz789"
   }

   becomes:

   ["123", "456"]

   These are the online user IDs.

9. io.emit(...)

   emit = send event

   First argument:
   event name

   Second argument:
   data

   Example:

   io.emit(
     "getOnlineUsers",
     ["123", "456"]
   );

   This broadcasts to ALL connected users.

10. Frontend listens:

   socket.on("getOnlineUsers", (onlineUsers) => {
      ...
   });

   When the server emits the event,
   every client receives the updated list.

11. Disconnect flow:

   socket.on("disconnect", () => {

      delete userSocketMap[userId];

      io.emit(
        "getOnlineUsers",
        Object.keys(userSocketMap)
      );
   });

   When user leaves:

   - remove user from map
   - recalculate online users
   - broadcast updated list

12. Complete timeline:

   User connects
        ↓
   connection event fires
        ↓
   get userId from handshake
        ↓
   store:
   userId -> socketId
        ↓
   emit updated online users
        ↓
   frontend updates UI

   User disconnects
        ↓
   disconnect event fires
        ↓
   remove user from map
        ↓
   emit updated online users
        ↓
   frontend removes online indicator

13. Why store userId -> socketId ?

   Later when user A sends a message
   to user B:

   receiverSocketId =
   userSocketMap[receiverId];

   The server can find the receiver's
   active socket and send the message
   only to that user.

=========================================
*/