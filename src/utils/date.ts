import {fillZero} from "./string";

type DateFormat =
  | "YYYY-MM-DD"
  | "YYYY년 MM월"
  | "MM-DD"
  | "YY-MM-DD [HH:MM]"
  | "YYYY년 MM월 DD일";

export class DateUtils {
  static MINUTE = 60 * 1000;
  static HOUR = 60 * DateUtils.MINUTE;
  static DAY = 24 * DateUtils.HOUR;
  static WEEK = 7 * DateUtils.DAY;
  static MONTH = 30 * DateUtils.DAY;
  static YEAR = 365 * DateUtils.DAY;

  static getTommorow = () => {
    const date = new Date();
    date.setDate(date.getDate() + 1);
    return date;
  };

  static getPast = (count: number, std?: Date) => {
    const date = std ?? new Date();
    date.setDate(date.getDate() - count);
    return date;
  };

  static getFuture = (count: number, std?: Date) => {
    const date = std ?? new Date();
    date.setDate(date.getDate() + count);
    return date;
  };

  static getMonthAgo = (count: number) => {
    const date = new Date();
    date.setMonth(date.getMonth() - count);
    return date;
  };

  static isDiffMonth = (date1: Date, date2: Date) => {
    return date1.getMonth() !== date2.getMonth();
  };

  static format = (date: Date, format: DateFormat) => {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();

    const now = new Date();

    switch (format) {
      case "YYYY-MM-DD":
        return `${year}-${fillZero(month, 2)}-${fillZero(day, 2)}`;
      case "YYYY년 MM월":
        return `${year}년 ${fillZero(month, 2)}월`;
      case "MM-DD":
        if (now.getFullYear() !== year) {
          return `${year}-${fillZero(month, 2)}-${fillZero(day, 2)}`;
        }
        return `${fillZero(month, 2)}-${fillZero(day, 2)}`;
      case "YY-MM-DD [HH:MM]":
        return `${String(year).slice(2)}-${fillZero(month, 2)}-${fillZero(
          day,
          2
        )} [${fillZero(date.getHours(), 2)}:${fillZero(date.getMinutes(), 2)}]`;
      default:
        throw new Error("Invalid date format");
    }
  };
}
