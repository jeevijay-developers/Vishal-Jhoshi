import React from "react";
import styles from "./leaderboard.module.css";

const performers: string[] = ["Vikas", "Anish", "Anishk", "Rajeev", "Parv"];

const Leaderboard: React.FC = () => {
  return (
    <div className={styles.leaderboardcontainer}>
      <h2 className={styles.leaderboardheading}>🏆 Leaderboard</h2>

      <div className={styles.leaderboardbox}>
        <div className="label">Top Test Performer</div>
        <ol>
          {performers.map((name, index) => (
            <li key={`test-${index}`}>{`${index + 1}.) ${name}`}</li>
          ))}
        </ol>

        <div className="label">Top Study Time Performer</div>
        <ol>
          {performers.map((name, index) => (
            <li key={`study-${index}`}>{`${index + 1}.) ${name}`}</li>
          ))}
        </ol>
      </div>
    </div>
  );
};

export default Leaderboard;
