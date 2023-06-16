import React, { createContext, PropsWithChildren, useEffect } from "react";
import { IToken } from "../interfaces/IToken.ts";
import { getJwtToken } from "../utils/getJwtToken.ts";
import axios from "axios";

interface InitialState {
  username: string | null;
  setUsername: (username: string | null) => void;
}

export const UsernameContext = createContext<InitialState>({
  username: null,
  setUsername: () => null,
});

export const UsernameProvider = ({ children }: PropsWithChildren) => {
  const [username, setUsername] = React.useState<string | null>(null);
  const token: IToken | null = getJwtToken();

  useEffect(() => {
    if (token) {
      axios
        .get("http://localhost:8000/auth/username/", {
          headers: { Authorization: "Bearer " + token?.accessToken },
        })
        .then((response) => {
          setUsername(response.data.username);
        });
    }
  }, []);

  return (
    <UsernameContext.Provider value={{ username, setUsername }}>
      {children}
    </UsernameContext.Provider>
  );
};
