import styles from "./NavbarAuth.module.scss";
import { Link } from "react-router-dom";
import React from "react";
import { getJwtToken } from "../../common/utils/getJwtToken.ts";
// import { TokenContext } from "../../common/providers/TokenProvider.tsx";

export const NavbarAuth = ({
  onClick,
}: {
  onClick: (event: React.MouseEvent<HTMLAnchorElement>) => void;
}) => {
  // const token = useContext(TokenContext);
  const token = getJwtToken();
  const handleLogout = (event: React.MouseEvent<HTMLAnchorElement>) => {
    window.localStorage.removeItem("jwtToken");
    onClick(event);
  };

  // View User's username if logged in, else show Sign In and Sign Up buttons
  if (token) {
    return (
      <div className={styles.dropdown}>
        <span>{token.ownerUsername}</span>
        <div className={styles.dropdownContent}>
          <Link to={"/profile"} onClick={onClick}>
            Profile
          </Link>
          <Link to={"/login"} className={styles.button} onClick={handleLogout}>
            Logout
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.auth}>
      <Link to={"login"} onClick={onClick} id={styles.signin}>
        Sign In
      </Link>
      <Link to={"signup"} onClick={onClick}>
        Sign Up
      </Link>
    </div>
  );
};
