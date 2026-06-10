import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";
import { getReceiverSocketId, io } from "../socket/socket.js";


export const sendMessage = async (req, res) => {
  try {
    // message is came fromt the front end it can send message through front end evenyou dont see on the link then receiver id is from the link when we click a specific chat it has own id then it trigger this by getting the id router.post("/send/:id",that why we dont do _id then senderid came from the protectroute when we find the user and since mongo has own id like this _id so we did this
    const {message}= req.body;
    const {id: receiverId}= req.params; //this is same as this const receiverId = req.params.id;
    const senderId = req.user._id
    //so in here {participants: {$all: [senderId, receiverId]} {} means it findone takes object query and after participants {} thsi because it is looking for multiple conditions after it finds the mathcing participants in the conversation collection it return the participant ids and the _id
    let conversation= await Conversation.findOne({
      participants: {$all: [senderId, receiverId]}
    })


    //instead of using the new conversation we can use create its a shortcut since no message is send it save this {_id: "conv123",participants: [senderId, receiverId],messages: []}
    if(!conversation) {
      conversation = await Conversation.create({
        participants: [senderId, receiverId],
      })


    // read below
    }
    const newMessage = new Message({
      senderId,
      receiverId,
      message,
    })

    if(newMessage) {
      conversation.messages.push(newMessage._id);
    }
    //run in parallel
    await Promise.all([conversation.save(), newMessage.save()]);
    const receiverSocketId = getReceiverSocketId(receiverId);
		if (receiverSocketId) {
			// io.to(<socket_id>).emit() used to send events to specific client
			io.to(receiverSocketId).emit("newMessage", newMessage);
		}


    res.status(201).json(newMessage);
    // what is happening here is after it saves the  sender id and the receiver id the message section of the conversation. message remains empty then when the Message schema is called to create a new object  it saves the original message came from the front end not the id then after creating the object it stores in the memory for now not yet saved on the collection of Message then it checks if the newMessage variable contains data which is true it pushes the _id which got created from the new Message and this _id was given by the mongo but remember it hs not saved yet then it pushes the id to the conversation.message secction then it saves both the collections at once / reason for doing this is not to make the conversation. mesage section mesy with the messages
  } catch (error) {
    console.log("error in sendMessage controller: ", error.message)
    res.status(500).json({error: "Internal server error"});
  }
};

export const getMessages = async (req, res) => {
  try {
    const {id:userToChatId} = req.params;
    const senderId = req.user._id;

    const conversation = await Conversation.findOne({participants: {$all: [senderId, userToChatId]},}).populate("messages");

    if(!conversation) return res.status(200).json([]);
    
    const messages = conversation.messages;


    res.status(200).json(messages);

  } catch (error) {
     console.log("error in getMessages controller: ", error.message)
    res.status(500).json({error: "Internal server error"});
  
  }
}
 