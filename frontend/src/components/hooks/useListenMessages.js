import { useEffect } from "react";

import { useSocketContext } from "../../context/useSocketContext";
import useConversation from "../../zustand/useConversation";
import soundofno from "../../assets/sounds/soundofno.mp3.mp3"

const useListenMessages = () => {
	const { socket } = useSocketContext();
	const { messages, setMessages } = useConversation();

	useEffect(() => {
		socket?.on("newMessage", (newMessage) => {
			newMessage.shouldShake = true;
      const sound = new Audio(soundofno);
      sound.play();
			setMessages([...messages, newMessage]);
		});

		return () => socket?.off("newMessage");
	}, [socket, setMessages, messages]);
};
export default useListenMessages;
