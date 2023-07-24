import React, { useContext } from "react";
import { Outlet, useNavigate } from "react-router";
import { Link } from "react-router-dom";
import styles from "./Navbar.module.scss";
import { NavbarAuth } from "../navbarAuth/NavbarAuth.tsx";
import { GameContext } from "../../common/providers/GameProvider.tsx";

export const Navbar = () => {
  const { gameInProgress } = useContext(GameContext);
  const navigate = useNavigate();
  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (gameInProgress) {
      event.preventDefault();
      const confirmed = window.confirm(
        "Are you sure you want to leave the game?"
      );

      if (confirmed) {
        navigate(event.currentTarget.pathname);
      }
    }
  };
  return (
    <>
      <nav className={styles.container}>
        <div className={styles.left}>
          <Link to={"/"} onClick={handleClick} className={styles.logo}>
            CHESS
          </Link>
          <Link to={"game"} onClick={handleClick}>
            Play
          </Link>
        </div>
        <NavbarAuth onClick={handleClick} />
      </nav>
      <Outlet />
    </>
  );
};
