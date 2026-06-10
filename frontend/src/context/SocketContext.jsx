import { createContext, useState, useEffect, useContext } from "react";
import { useAuthContext } from "./AuthContext";
import io from "socket.io-client";

const SocketContext = createContext();

export const useSocketContext = () => {
  return useContext(SocketContext);
};

export const SocketContextProvider = ({ children }) => {
	const [socket, setSocket] = useState(null);
	const [onlineUsers, setOnlineUsers] = useState([]);
	const { authUser } = useAuthContext();

	useEffect(() => {
		if (authUser) {
			const socket = io("http://localhost:5000", {
				query: {
					userId: authUser._id,
				},
			});

			setSocket(socket);

      socket.on("getOnlineUsers", (users) =>{
				console.log("Received online users:", users);
        setOnlineUsers(users);
      })

			return () => socket.close();
		} else {
			if (socket) {
				socket.close();
				setSocket(null);
			}
		}
	}, [authUser]);

	return <SocketContext.Provider value={{ socket, onlineUsers }}>{children}</SocketContext.Provider>;
};

/*
======================== SOCKET CONTEXT FLOW ========================

WHY SOCKET CONTEXT?

- We need the socket connection and online users in multiple components.
- Instead of passing socket as props everywhere, we store it in React Context.
- Any component can access it using useSocketContext().

--------------------------------------------------------------------

1. CREATE CONTEXT

const SocketContext = createContext();

- Creates an empty global box.
- Later we put socket and onlineUsers inside this box.

--------------------------------------------------------------------

2. CUSTOM HOOK

export const useSocketContext = () => {
  return useContext(SocketContext);
};

- Shortcut for useContext(SocketContext).
- Allows components to access Context values easily.

--------------------------------------------------------------------

3. STATE

const [socket, setSocket] = useState(null);
const [onlineUsers, setOnlineUsers] = useState([]);

Initially:

socket = null
onlineUsers = []

--------------------------------------------------------------------

4. GET LOGGED-IN USER

const { authUser } = useAuthContext();

- Gets the currently logged-in user.
- Needed because the server must know which user is connecting.

--------------------------------------------------------------------

5. useEffect RUNS WHEN authUser CHANGES

useEffect(() => {

}, [authUser]);

Runs when:
- User logs in
- User logs out
- authUser changes

--------------------------------------------------------------------

6. CREATE SOCKET CONNECTION

if (authUser) {

  const socket = io("http://localhost:5000", {
    query: {
      userId: authUser._id,
    },
  });

}

- io() creates and returns a Socket Object.
- userId is sent to the server.
- Server now knows which user connected.

Example:

userId = "123"

Server receives:

New connection
User ID = 123

--------------------------------------------------------------------

7. STORE SOCKET IN STATE

setSocket(socket);

- The socket returned by io() is stored in React state.
- Before:

socket = null

- After:

socket = SocketObject

Now the entire app can access this socket.

--------------------------------------------------------------------

8. LISTEN FOR ONLINE USERS

socket.on("getOnlineUsers", (users) => {
  setOnlineUsers(users);
});

- Server emits an array of online user IDs.

Example:

["123", "456", "789"]

- Client receives it.
- Updates onlineUsers state.

--------------------------------------------------------------------

9. CLEANUP FUNCTION

return () => socket.close();

IMPORTANT:

React expects a FUNCTION to be returned.

Wrong:

return socket.close();

This closes immediately.

Correct:

return () => socket.close();

This gives React a function to run later.

React runs cleanup:
- When component unmounts
- Before useEffect runs again

Purpose:
- Disconnect old socket
- Prevent memory leaks
- Prevent multiple connections

--------------------------------------------------------------------

10. LOGOUT CASE

else {
  if (socket) {
    socket.close();
    setSocket(null);
  }
}

When:

authUser = null

Meaning:

- User logged out
- Close socket connection
- Remove socket from state

Before:

socket = SocketObject

After:

socket = null

--------------------------------------------------------------------

11. PROVIDER

<SocketContext.Provider
  value={{ socket, onlineUsers }}
>
  {children}
</SocketContext.Provider>

Stores:

{
  socket,
  onlineUsers
}

inside Context.

All child components can access them.

====================================================================
HOW CONVERSATION COMPONENT USES SOCKET CONTEXT
====================================================================

const { onlineUsers } = useSocketContext();

- Gets onlineUsers array from Context.

Example:

onlineUsers = ["123", "456", "789"]

--------------------------------------------------------------------

const isOnline = onlineUsers.includes(conversation._id);

Checks:

"Is this conversation user's ID present in the online users array?"

Example:

conversation._id = "456"

onlineUsers.includes("456")

Result:

true

isOnline = true

--------------------------------------------------------------------

{isOnline && (
  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
)}

If isOnline is true:
- Show green dot

If isOnline is false:
- Show nothing

--------------------------------------------------------------------

COMPLETE FLOW

User logs in
      ↓
SocketContext creates socket connection
      ↓
userId sent to server
      ↓
Server stores user and socketId
      ↓
Server builds onlineUsers array
      ↓
Server emits "getOnlineUsers"
      ↓
SocketContext receives array
      ↓
setOnlineUsers(users)
      ↓
Context updates
      ↓
Conversation component re-renders
      ↓
onlineUsers.includes(conversation._id)
      ↓
true / false
      ↓
Show or hide green online indicator

====================================================================
*/