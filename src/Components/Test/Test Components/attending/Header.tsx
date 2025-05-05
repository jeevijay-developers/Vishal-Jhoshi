import React, { useMemo } from "react";
import CountdownTimer from "./CountdownTimer";
import { useSelector } from "react-redux";
import { RootState } from "@/Redux/Store";
import { BsPatchPlus } from "react-icons/bs";

type Props = {
  mobileView: boolean;
};

const Header: React.FC<Props> = ({ mobileView }) => {
  const test = useSelector((state: RootState) => state.attend);
  const user = useSelector((state: any) => state.user);
  // const userAnswers = useSelector((state: RootState) => state.answer.questions);

  // Memoized Time Difference
  const timeDifference = useMemo(() => {
    const currentTime = new Date();
    const currentMinutes =
      currentTime.getHours() * 60 + currentTime.getMinutes();
    const [startHour, startMinute] = test.time.split(":").map(Number);
    const testStartMinutes = startHour * 60 + startMinute;
    const testEndMinutes = testStartMinutes + parseInt(test.timeDuration, 10);
    return testEndMinutes - currentMinutes;
  }, [test.time, test.timeDuration]);

  return (
    <header className="w-fit bg-primary">
      <section
        className={`d-flex justify-content-between align-items-center  ${
          mobileView ? "flex-column" : "flex-row gap-3"
        }  w-100 p-2`}
      >
        <div className="left d-flex justify-content-center align-items-center gap-3 flex-row">
          {!mobileView && (
            <img
              src={`https://vjnucleus.com/assets/logo-DKwk0pbO.png`}
              alt="image"
              height={50}
              width={50}
            />
          )}

          <h3>{test.testName}</h3>
        </div>
        <div className="right  align-items-center flex-row">
          <div>
            Candidate name : <b>{user.name}</b>
          </div>
          <CountdownTimer minutes={Number(timeDifference)} />
          {/* <CountdownTimer minutes={Number(test.timeDuration)} /> */}
        </div>
      </section>
    </header>
  );
};

export default Header;
