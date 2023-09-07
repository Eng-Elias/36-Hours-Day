import React, { useEffect, useRef, useState } from "react";
// import PropTypes from "prop-types";
import "../styles/clock.scss";
import DaysOf35HoursUtils from "../utils/days_of_36_hours_utils";

function Clock(props) {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [day, setDay] = useState("");

  const secondRef = useRef();
  const minuteRef = useRef();
  const hourRef = useRef();

  const { startHour, setPassedTime } = props;

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
          dh = lostTime.lostHours * 10;

        date = date.getDate() + " . " + months[month];

        secondRef.current.style.transform = `rotate(${ds}deg)`;
        minuteRef.current.style.transform = `rotate(${dm}deg)`;
        hourRef.current.style.transform = `rotate(${dh}deg)`;

        setDate(date);
        setTime(time);
        setDay(days[day]);
      }

      interval = setInterval(getTime, 666);
      getTime();
    })();

    return () => {
      clearInterval(interval);
    };
  }, [startHour]);

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
                transform: `rotate(${i * 10}deg) translateX(100px)`,
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
                transform: `rotate(${i * 6}deg) translateX(145px)`,
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
                transform: `rotate(${i * 6}deg) translateX(195px)`,
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
                transform: `rotate(${i * 6}deg) translateX(230px)`,
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
