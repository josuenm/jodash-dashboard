import {
  SalesThisMonthChart,
  SalesTodayChart,
} from "@/components/charts/area-chart";
import Head from "@/components/head";
import { useCustomer } from "@/contexts/customerContext";
import { CustomerProps } from "../../@types/customerType";

interface CardProps {
  title: string;
  value: string | number;
}

export function Card({ title, value }: CardProps) {
  return (
    <div className="bg-white p-5 shadow-around-sm rounded-lg flex flex-col justify-center gap-5 md:col-span-3 duration-300 md:hover:scale-105 cursor-pointer">
      <p className="text-slate-600 text-lg md:text-base font-medium">{title}</p>
      <strong className="text-3xl md:text-2xl">{value}</strong>
    </div>
  );
}

export default function Dashboard() {
  const { customers } = useCustomer();

  const QuantitySoldToday = customers.filter((item) => {
    const customerDate = new Date(item.date);
    const myDate = new Date();

    if (
      customerDate.getMonth() + 1 === myDate.getMonth() + 1 &&
      customerDate.getDate() === myDate.getDate()
    ) {
      return item;
    }
  }).length;

  const SoldToday = customers
    .filter((item) => {
      const customerDate = new Date(item.date);
      const myDate = new Date();

      if (
        customerDate.getFullYear() + 1 === myDate.getFullYear() &&
        customerDate.getMonth() + 1 === myDate.getMonth() + 1 &&
        customerDate.getDate() === myDate.getDate()
      ) {
        return item;
      }
    })
    .reduce((prev: number, arr: CustomerProps) => prev + arr.price, 0);

  const QuantitySoldThisMonth = customers.filter((item) => {
    if (new Date(item.date).getMonth() + 1 === new Date().getMonth() + 1) {
      return item;
    }
  }).length;

  const SoldThisMonth = customers
    .filter((item) => {
      if (new Date(item.date).getMonth() + 1 === new Date().getMonth() + 1) {
        return item;
      }
    })
    .reduce((prev: number, arr: CustomerProps) => prev + arr.price, 0);

  return (
    <>
      <Head title="Home" />

      <section className="flex flex-col gap-6 mb-6 md:grid md:grid-cols-12">
        <Card title="Quantity sold today" value={QuantitySoldToday} />
        <Card
          title="Total sold today"
          value={new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
            currencyDisplay: "narrowSymbol",
          }).format(SoldToday)}
        />
        <Card title="Quantity sold this month" value={QuantitySoldThisMonth} />
        <Card
          title="Total sold this month"
          value={new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
            currencyDisplay: "narrowSymbol",
          }).format(SoldThisMonth)}
        />
      </section>

      <section className="flex flex-col gap-6 mb-12 md:grid md:grid-cols-12">
        <div className="w-full p-5 bg-white rounded-lg shadow-around-sm md:col-span-6">
          <p className="mb-5 text-slate-600 text-lg md:text-base font-medium">
            Sales today
          </p>
          <SalesTodayChart />
        </div>

        <div className="w-full p-5 bg-white rounded-lg shadow-around-sm md:col-span-6">
          <p className="mb-5 text-slate-600 text-lg md:text-base font-medium">
            Sales today
          </p>
          <SalesThisMonthChart />
        </div>
      </section>
    </>
  );
}
