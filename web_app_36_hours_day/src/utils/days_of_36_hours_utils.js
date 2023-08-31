export default class DaysOf35HoursUtils {
  static MillisecondsInSecond36 = 666;
  static MillisecondsInMinute36 = 60 * 666;
  static MillisecondsInHour36 = 60 * 60 * 666;

  static calculateTimeLostIn36HoursDay(startHour = 6) {
    // startHour must be a number from 0 - 23
    const currentTime = new Date();
    const startHourDate = new Date(
      currentTime.getFullYear(),
      currentTime.getMonth(),
      currentTime.getDate(),
      startHour,
      0,
      0,
      0
    );

    if (currentTime.getHours() < startHour) {
      startHourDate.setDate(startHourDate.getDate() - 1);
    }

    const realMilliseconds = currentTime.getTime();
    const startHourMilliseconds = startHourDate.getTime();
    const timeDifference = realMilliseconds - startHourMilliseconds;

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
  }
}
