import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import styles from "./Profile.module.scss";
import { MatchHistory } from "../../components/matchHistory/MatchHistory.tsx";
import { createAxiosInstance } from "../../common/utils/axiosInstance.tsx";
import { IToken } from "../../common/interfaces/IToken.ts";
import { getJwtToken } from "../../common/utils/getJwtToken.ts";

export const Profile = () => {
  const navigate = useNavigate();
  const axiosInstance = createAxiosInstance(navigate);
  const [profileData, setProfileData] = useState({
    username: "",
    games_history: [],
    games_played: 0,
    ranking_bullet: 0,
    ranking_blitz: 0,
    ranking_rapid: 0,
  });

  const token: IToken | null = getJwtToken();

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    axiosInstance.get(`/users/profile/`).then((response) => {
      setProfileData(response.data);
    });
  }, []);

  return (
    <div className={styles.container}>
      <h1>{profileData.username}</h1>
      <div className={styles.content}>
        <MatchHistory gamesHistory={profileData.games_history} />
        <div className={styles.stats}>
          <h2>Games Played</h2>
          <p>{profileData.games_history.length}</p>
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
