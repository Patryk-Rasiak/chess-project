import axios from "axios";
import { IToken } from "../interfaces/IToken.ts";

export const refreshToken = (token: IToken) => {
  axios
    .post(
      "http://localhost:8000/auth/refresh/",
      {
        refresh: token?.refreshToken,
      },
      {
        headers: { Authorization: "Bearer " + token?.accessToken },
      }
    )
    .then((response) => {
      token.accessToken = response.data.access;
      localStorage.setItem("jwtToken", JSON.stringify(token));
    });
};
