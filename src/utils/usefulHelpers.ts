export const usefulHelpers = {
  compareDateRange: (start: Date, end: Date, date: Date) => {
    const getYear = (d: Date) => Number(d.getFullYear());
    const getMonth = (d: Date) => Number(d.getMonth() + 1);
    const getDay = (d: Date) => Number(d.getDate());

    if (getYear(date) >= getYear(start) && getYear(date) <= getYear(end)) {
      if (
        getMonth(date) >= getMonth(start) &&
        getMonth(date) <= getMonth(end)
      ) {
        if (getMonth(start) === getMonth(date)) {
          if (getDay(date) >= getDay(start) && getDay(date) <= getDay(end)) {
            return true;
          }
        }
        if (getMonth(end) === getMonth(date)) {
          if (getDay(date) <= getDay(end) && getDay(date) >= getDay(start)) {
            return true;
          }
        }
        return true;
      }
      return false;
    }

    return false;
  },
};
