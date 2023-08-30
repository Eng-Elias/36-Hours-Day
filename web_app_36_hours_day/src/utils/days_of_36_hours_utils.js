export default class DaysOf35HoursUtils {
  static MillisecondsInHour36 = 2160000;
  static MillisecondsInMinute36 = 36000;
  static MillisecondsInSecond36 = 600;

  static getTimeLostIn36HoursDay(startHour = 6) {
    // startHour must be a number from 0 - 23
    const currentTime = new Date();
    if (currentTime.getHours() >= startHour) {
      const realMilliseconds = currentTime.getTime();
      const sixAMMilliseconds = new Date(
        currentTime.getFullYear(),
        currentTime.getMonth(),
        currentTime.getDate(),
        startHour,
        0,
        0,
        0
      ).getTime();
      const timeDifference = realMilliseconds - sixAMMilliseconds;

      // Calculate lost time in 36-hour day
      const lostHours = Math.floor(
        timeDifference / DaysOf35HoursUtils.MillisecondsInHour36
      );
      const remainingTime1 =
        timeDifference % DaysOf35HoursUtils.MillisecondsInHour36;
      const lostMinutes = Math.floor(
        remainingTime1 / DaysOf35HoursUtils.MillisecondsInMinute36
      );
      const remainingTime2 =
        remainingTime1 % DaysOf35HoursUtils.MillisecondsInMinute36;
      const lostSeconds = Math.floor(
        remainingTime2 / DaysOf35HoursUtils.MillisecondsInSecond36
      );

      return {
        lostHours: lostHours,
        lostMinutes: lostMinutes,
        lostSeconds: lostSeconds,
      };
    } else {
      // handle hours which are less than startHour
    }
  }
}
