// import { createContext, PropsWithChildren, useEffect, useState } from "react";
//
// import { IToken } from "../interfaces/IToken.ts";
// import { getJwtToken } from "../utils/getJwtToken.ts";
//
// export const TokenContext = createContext<IToken | null>(null);
//
// export const TokenProvider = ({ children }: PropsWithChildren) => {
//   const [token, setToken] = useState<IToken | null>(null);
//
//   useEffect(() => {
//     const jwtToken = getJwtToken();
//     if (jwtToken) setToken(jwtToken);
//   }, []);
//
//   return (
//     <TokenContext.Provider value={token}>{children}</TokenContext.Provider>
//   );
// };
