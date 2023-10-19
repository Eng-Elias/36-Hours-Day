import store from "./storage_utils";

export default class DaysOf35HoursUtils {
  static MillisecondsInSecond36 = 666;
  static MillisecondsInMinute36 = 60 * 666;
  static MillisecondsInHour36 = 60 * 60 * 666;

  static defaultStartHour = 6;
  static startHourLocalStorageKey = "start_hour_in_36_hours_day";

  static storeStartHourInLocalStorage(startHour) {
    store.set(DaysOf35HoursUtils.startHourLocalStorageKey, startHour);
  }

  static getStartHourFromLocalStorage() {
    return store.get(DaysOf35HoursUtils.startHourLocalStorageKey);
  }

  static getStartHourFromLocalStorageOrDefault() {
    return DaysOf35HoursUtils.getStartHourFromLocalStorage().then((data) => {
      return data ?? DaysOf35HoursUtils.defaultStartHour;
    });
  }

  static calculateTimeLostIn36HoursDay(
    startHour = DaysOf35HoursUtils.defaultStartHour
  ) {
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
