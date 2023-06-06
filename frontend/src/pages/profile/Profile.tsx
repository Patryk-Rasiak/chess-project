import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import styles from "./Profile.module.scss";
import { MatchHistory } from "../../components/matchHistory/MatchHistory.tsx";
import axios from "axios";

export const Profile = () => {
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState({
    games_history: [],
    games_played: 0,
    ranking_bullet: 0,
    ranking_blitz: 0,
    ranking_rapid: 0,
  });

  const userStr = window.localStorage.getItem("authUser");
  const user = userStr ? JSON.parse(userStr) : null;

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }

    axios.get(`http://localhost:8000/profiles/${user.id}`).then((response) => {
      console.log(response.data.games_history);
      setProfileData(response.data);
    });
  }, []);

  return (
    <div className={styles.container}>
      <h1>{user.username}</h1>
      <div className={styles.content}>
        <MatchHistory gamesHistory={profileData.games_history} />
        <div className={styles.stats}>
          <h2>Games Played</h2>
          <p>{profileData.games_played}</p>
          <h2>Your rating</h2>
          <h3>Bullet</h3>
          <p>{profileData.ranking_bullet}</p>
          <h3>Blitz</h3>
          <p>{profileData.ranking_blitz}</p>
          <h3>Rapid</h3>
          <p>{profileData.ranking_rapid}</p>
        </div>
      </div>
    </div>
  );
};
