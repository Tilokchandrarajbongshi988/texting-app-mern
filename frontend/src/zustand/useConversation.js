import { create } from "zustand";

const useConversation = create((set) => ({
	selectedConversation: null,
	setSelectedConversation: (selectedConversation) => set({ selectedConversation }),
	messages: [],
	setMessages: (messages) => set({ messages }),
}));

export default useConversation;
/*
ZUSTAND STORE EXPLANATION

This store holds global conversation-related state that can be shared
between multiple components (Sidebar, Conversation, MessageContainer, etc.).

----------------------------------------------------
STATE VARIABLES
----------------------------------------------------

selectedConversation: null

- Stores the currently selected user/conversation.
- Initially null because no chat is selected when the page loads.

Example:

selectedConversation = null

After clicking John:

selectedConversation = {
  _id: "1",
  fullName: "John"
}

----------------------------------------------------

messages: []

- Stores messages for the currently selected conversation.
- Initially empty because no messages have been loaded yet.

----------------------------------------------------
UPDATE FUNCTIONS (ACTIONS)
----------------------------------------------------

setSelectedConversation: (selectedConversation) =>
  set({ selectedConversation })

This syntax is confusing because the same name is used multiple times.

Think of it as:

setSelectedConversation: (user) => {
  set({
    selectedConversation: user
  });
}

Explanation:

1. user is the value passed into the function.
2. set() is Zustand's built-in function for updating state.
3. set({ selectedConversation: user })
   means:
   "Update the store's selectedConversation value with user."

Example:

setSelectedConversation({
  _id: "1",
  fullName: "John"
});

Store before:

{
  selectedConversation: null
}

Store after:

{
  selectedConversation: {
    _id: "1",
    fullName: "John"
  }
}

----------------------------------------------------

setMessages: (messages) =>
  set({ messages })

Equivalent to:

setMessages: (newMessages) => {
  set({
    messages: newMessages
  });
}

Updates the messages array inside the store.

----------------------------------------------------
IMPORTANT CONCEPT
----------------------------------------------------

These are NOT the same thing:

selectedConversation: null

and

(selectedConversation) =>

The first one is a STATE variable stored inside Zustand.

The second one is a FUNCTION PARAMETER that temporarily holds
whatever value is passed into the function.

The author reused the same name, which makes it look confusing.

A clearer version would be:

selectedConversation: null,

setSelectedConversation: (user) =>
  set({
    selectedConversation: user
  })

----------------------------------------------------
FLOW
----------------------------------------------------

User clicks a conversation
        |
        v
setSelectedConversation(user)
        |
        v
set({ selectedConversation: user })
        |
        v
Zustand updates the store
        |
        v
selectedConversation now contains the clicked user
        |
        v
All components using useConversation() re-render
        |
        v
The selected chat can now be highlighted and its
messages can be fetched/displayed.
*/