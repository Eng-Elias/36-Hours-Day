import React, { useEffect, useRef, useState } from "react";
import { useMediaQuery } from "@mui/material";
// import PropTypes from "prop-types";
import "../styles/clock.scss";
import DaysOf35HoursUtils from "../utils/days_of_36_hours_utils";
import TextToSpeechUtils from "../utils/text_to_speech_utils";

function Clock(props) {
  const isMobile = useMediaQuery("@media (max-width: 500px)");

  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [day, setDay] = useState("");

  const secondRef = useRef();
  const minuteRef = useRef();
  const hourRef = useRef();

  const { startHour, setPassedTime } = props;

  const mobileDifference = 70;

  useEffect(() => {
    let interval;
    (function () {
      const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];
      const days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ];

      function getTime() {
        let date = new Date();

        const time = date.toLocaleString("en-US", {
            hour: "numeric",
            minute: "numeric",
            hour12: true,
          }),
          day = date.getDay(),
          month = date.getMonth();

        // for 36-hour time
        const lostTime =
          DaysOf35HoursUtils.calculateTimeLostIn36HoursDay(startHour);

        setPassedTime(lostTime);

        const ds = lostTime.lostSeconds * 6,
          dm = lostTime.lostMinutes * 6,
          dh = (lostTime.lostHours + 1) * 10;

        date = date.getDate() + " . " + months[month];

        secondRef.current.style.transform = `rotate(${ds}deg)`;
        minuteRef.current.style.transform = `rotate(${dm}deg)`;
        hourRef.current.style.transform = `rotate(${dh}deg)`;

        setDate(date);
        setTime(time);
        setDay(days[day]);

        if (lostTime.lostMinutes === 0 && lostTime.lostSeconds === 0) {
          const hourWord = lostTime.lostHours > 1 ? "hours" : "hour";
          TextToSpeechUtils.speakText(`
            ${lostTime.lostHours} ${hourWord} passed, you have ${
            36 - lostTime.lostHours
          } ${hourWord}.
          `);
        }
      }

      interval = setInterval(getTime, 666);
      getTime();
    })();

    return () => {
      clearInterval(interval);
    };
  }, [startHour, setPassedTime]);

  return (
    <div className="clock-container">
      <div className="clock-digital">
        <div className="date">{date}</div>
        <div className="time">{time}</div>
        <div className="day">{day}</div>
      </div>
      <div className="clock-analog">
        <div className="spear"></div>
        <div className="hour" ref={hourRef}>
          {Array.from({ length: 36 }, (_, index) => index + 1).map((i) => (
            <span
              key={i}
              style={{
                transform: `rotate(${i * 10}deg) translateX(${
                  isMobile ? 100 - mobileDifference : 100
                }px)`,
              }}
            >
              {i}
            </span>
          ))}
        </div>
        <div className="minute" ref={minuteRef}>
          {Array.from({ length: 60 }, (_, index) => index).map((i) => (
            <span
              key={i}
              style={{
                transform: `rotate(${i * 6}deg) translateX(${
                  isMobile ? 145 - mobileDifference : 145
                }px)`,
              }}
            >
              {i}
            </span>
          ))}
        </div>
        <div className="second" ref={secondRef}>
          {Array.from({ length: 60 }, (_, index) => index).map((i) => (
            <span
              key={i}
              style={{
                transform: `rotate(${i * 6}deg) translateX(${
                  isMobile ? 195 - mobileDifference : 195
                }px)`,
              }}
            >
              {i}
            </span>
          ))}
        </div>
        <div className="dail">
          {Array.from({ length: 60 }, (_, index) => index).map((i) => (
            <span
              key={i}
              style={{
                transform: `rotate(${i * 6}deg) translateX(${
                  isMobile ? 230 - mobileDifference : 230
                }px)`,
              }}
            >
              {i}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

Clock.propTypes = {};

export default Clock;
