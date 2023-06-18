import React, { useState } from "react";
import { Outlet } from "react-router";
import { Link } from "react-router-dom";
import styles from "./Navbar.module.scss";
import { NavbarAuth } from "../navbarAuth/NavbarAuth.tsx";

export const Navbar = () => {
  return (
    <>
      <nav className={styles.container}>
        <div className={styles.left}>
          <Link to={"/"} className={styles.logo}>
            CHESS
          </Link>
          <Link to={"game"}>Find online game</Link>
          <Link to={"play-friend-guest"}>Play a friend</Link>
        </div>
        <NavbarAuth />
      </nav>
      <Outlet />
    </>
  );
};
