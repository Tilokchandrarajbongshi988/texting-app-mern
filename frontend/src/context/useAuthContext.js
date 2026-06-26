import { useContext } from "react";
import AuthContext from "./AuthContextObject";

export const useAuthContext = () => {
  return useContext(AuthContext);
};
