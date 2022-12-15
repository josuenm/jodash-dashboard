import { useCustomer } from "@/contexts/customerContext";
import { helper } from "@/utils";
import {
  CategoryScale,
  Chart as ChartJS,
  LinearScale,
  LineElement,
  PointElement,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);

interface AreaChartProps {
  labels: string[];
  data: number[];
}

export function AreaChart({ labels, data }: AreaChartProps) {
  const options = {
    responsive: true,
    plugins: {},
    locale: "pt-BR",
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        ticks: {
          callback: (value: any, index: any) => {
            return new Intl.NumberFormat("pt-BR", {
              style: "currency",
              currency: "BRL",
            }).format(value);
          },
        },
        beginAtZero: true,
      },
    },
  };

  const dataOptions = {
    labels,
    datasets: [
      {
        data,
        borderColor: "rgb(0, 89, 255)",
        backgroundColor: "rgba(0, 89, 255, 0.5)",
        pointBorderColor: "transparent",
        pointBorderWidth: 0,
        tension: 0.5,
      },
    ],
  };

  return <Line options={options} data={dataOptions} />;
}

export function SalesTodayChart() {
  const { customers } = useCustomer();

  const labels = helper.labelToday();
  const data = helper.embedTodayLabel(customers);

  return <AreaChart labels={labels} data={data} />;
}

export function SalesThisMonthChart() {
  const { customers } = useCustomer();

  const labels = helper.labelThisMonth();
  const data = helper.embedThisMonthLabel(customers);

  return <AreaChart labels={labels} data={data} />;
}
