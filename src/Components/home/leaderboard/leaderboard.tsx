import React from "react";
import styles from "./leaderboard.module.css";

const performers: string[] = ["Vikas", "Anish", "Anishk", "Rajeev", "Parv"];

const Leaderboard: React.FC = () => {
  return (
    <div className={styles.leaderboardcontainer}>
      <h1 className={`${styles.leaderboardheading} my-4`}>🏆 Leaderboard</h1>

      <div className={`${styles.leaderboardbox}  `}>
        <div className="position-relative">
          <div
            className="label position-absolute"
            style={{
              top: "-30px",
              left: "-60px",
              padding: "10px 20px",
              background: "white",
              border: "3px solid #fec001",
              borderRadius: "20px",
              color: "#00000082",
            }}
          >
            {" "}
            <p className="m-0 p-0 fw-bold">Top Test Performer</p>
          </div>
          <ul className="pt-3">
            {performers.map((name, index) => (
              <li
                key={`test-${index}`}
                className="py-2 text-left fw-bold"
                style={{
                  textAlign: "left",
                }}
              >{`${index + 1}.) ${name}`}</li>
            ))}
          </ul>
        </div>

        <div
          className="position-relative"
          style={{
            paddingTop: "30px",
          }}
        >
          <div
            className="label position-absolute"
            style={{
              top: "0px",
              left: "-60px",
              padding: "10px 20px",
              background: "white",
              borderRadius: "20px",
              border: "3px solid #fec001",
              color: "#00000082",
            }}
          >
            {" "}
            <p className="m-0 p-0 fw-bold">Top Study Time Performer</p>
          </div>
          <ul className="pt-3">
            {performers.map((name, index) => (
              <li
                key={`test-${index}`}
                className="py-2 text-left fw-bold"
                style={{
                  textAlign: "left",
                }}
              >{`${index + 1}.) ${name}`}</li>
            ))}
          </ul>
        </div>
        {/* <div
          className="label position-absolute"
          style={{
            top: "-30px",
            left: "-30px",
            padding: "10px 20px",
            background: "white",
            borderRadius: "20px",
            color: "black",
          }}
        >
          <p className="m-0 p-0">Top Study Time Performer</p>
          <ul>
            {performers.map((name, index) => (
              <li key={`study-${index}`}>{`${index + 1}.) ${name}`}</li>
            ))}
          </ul>
        </div> */}
      </div>
    </div>
  );
};

export default Leaderboard;
