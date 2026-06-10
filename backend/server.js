import express from "express";
import dotenv from "dotenv";

import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js";
import userRoutes from "./routes/user.routes.js";

import connectToMongoDB from "./db/connectToMongoDB.js";
import {app, server} from "./socket/socket.js";

const PORT = process.env.PORT || 5000

dotenv.config();
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);





// app.get("/", (req, res) => {
//   res.send("hello world!")
// })



server.listen(PORT, () => {
  connectToMongoDB();
  console.log(`Server running on address http://localhost:${PORT}`)
  });


  // socket.js exports 3 things:
//
// app    -> Express application (used for routes, middleware, etc.)
// server -> HTTP server created by Node (used to start the server with server.listen())
// io     -> Socket.IO server instance (used for real-time events)
//
// In this file we only need:
//
// app.use(...)       -> requires app
// server.listen(...) -> requires server
//
// We do NOT import io because we are not using
// io.emit(), io.on(), or io.to() in this file.
//
// If we needed to send or listen to socket events
// here, then we would also import io.