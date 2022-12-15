import { helper } from ".";
import { CustomerProps } from "../@types/customerType";

export const chartHelper = {
  labelToday: () => {
    const label = [];

    label.push("12am");
    for (let i = 1; i < 12; i++) {
      label.push(`${i}am`);
    }

    label.push("12pm");
    for (let i = 1; i < 12; i++) {
      label.push(`${i}pm`);
    }

    return label;
  },

  labelThisMonth: () => {
    const label = [];

    for (let i = 1; i <= new Date(2022, 11, 0).getDate(); i++) {
      label.push(`day ${i}`);
    }

    return label;
  },

  embedTodayLabel: (customers: CustomerProps[]) => {
    const filtered = customers
      .filter((item) => {
        const customerDate = new Date(item.date);
        const todayDate = new Date();

        const getYear = (d: Date) => d.getFullYear();
        const getMonth = (d: Date) => d.getMonth() + 1;
        const getDay = (d: Date) => d.getDate();

        if (
          getYear(todayDate) === getYear(customerDate) &&
          getMonth(todayDate) === getMonth(customerDate) &&
          getDay(todayDate) === getDay(customerDate)
        ) {
          return item;
        }
      })
      .sort((a: CustomerProps, b: CustomerProps) => {
        const aDate: any = new Date(a.date);
        const bDate: any = new Date(b.date);

        return aDate - bDate;
      });

    const label = helper.labelToday();
    const earnings: number[] = [];

    label.forEach(() => earnings.push(0));

    filtered.forEach((item) => {
      const hour = new Date(item.date).getHours();

      earnings[hour] = earnings[hour] + item.price;
    });

    return earnings;
  },

  embedThisMonthLabel: (customers: CustomerProps[]) => {
    const filtered = customers
      .filter((item) => {
        const customerDate = new Date(item.date);
        const todayDate = new Date();

        const getYear = (d: Date) => d.getFullYear();
        const getMonth = (d: Date) => d.getMonth() + 1;

        if (
          getYear(todayDate) === getYear(customerDate) &&
          getMonth(todayDate) === getMonth(customerDate)
        ) {
          return item;
        }
      })
      .sort((a: CustomerProps, b: CustomerProps) => {
        const aDate: any = new Date(a.date);
        const bDate: any = new Date(b.date);

        return aDate - bDate;
      });

    const label = helper.labelThisMonth();
    const earnings: number[] = [];

    label.forEach(() => earnings.push(0));

    filtered.forEach((item) => {
      const day = new Date(item.date).getDate() - 1;

      earnings[day] = earnings[day] + item.price;
    });

    return earnings;
  },
};
