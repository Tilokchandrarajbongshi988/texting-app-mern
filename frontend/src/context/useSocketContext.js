import { useContext } from "react";
import SocketContext from "./SocketContextObject";

export const useSocketContext = () => {
  return useContext(SocketContext);
};
