import { IToken } from "../interfaces/IToken.ts";

export const getJwtToken = (): IToken | null => {
  const tokenString = localStorage.getItem("jwtToken");

  if (tokenString) {
    try {
      return JSON.parse(tokenString);
    } catch (error) {
      console.error("Error parsing token:", error);
    }
  }

  return null;
};
