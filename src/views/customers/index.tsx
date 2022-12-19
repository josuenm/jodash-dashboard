import Head from "@/components/head";
import { Pagination } from "@/components/pagination";
import { useCustomer } from "@/contexts/customerContext";
import { motion } from "framer-motion";
import { useRef, useState } from "react";
import { useDrag, useDrop } from "react-dnd";

interface HeadersProps {
  id: number;
  title: string;
  path: string;
}

interface ThProps extends HeadersProps {
  moveHeader: (from: number, to: number) => void;
  index: number;
}

type TypeKey = {
  [key: string]: any;
};

export default function Customers() {
  const [headers, setHeaders] = useState<HeadersProps[]>([
    {
      id: 0,
      title: "Picture",
      path: "picture",
    },
    {
      id: 1,
      title: "Name",
      path: "name",
    },
    {
      id: 2,
      title: "Price",
      path: "price",
    },
    {
      id: 3,
      title: "Document",
      path: "document",
    },
  ]);

  const [currentPage, setCurrentPage] = useState(1);

  const { customers } = useCustomer();

  const renderTd = (path: string, item: TypeKey) => {
    switch (path) {
      case "price":
        return new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
          currencyDisplay: "narrowSymbol",
        }).format(item.price);

      case "picture":
        if (!item.picture) {
          return (
            <div className="w-9 h-9 rounded-md border bg-slate-300 flex justify-center items-center">
              <strong className="text-primary">
                {item.name.slice(0, 1).toUpperCase()}
              </strong>
            </div>
          );
        }

        return (
          <img
            src={item.picture}
            alt={item.name}
            className="w-9 h-9 rounded-md border"
          />
        );

      default:
        return item[path];
    }
  };

  const moveHeader = (from: number, to: number) => {
    const dataFrom = headers.find((item) => item.id === from) as HeadersProps;
    const dataTo = headers[to];
    const fromIndex = headers.findIndex((item) => item.id === from);

    const newHeader = [...headers];
    newHeader[fromIndex] = dataTo;
    newHeader[to] = dataFrom;
    setHeaders(newHeader);
  };

  return (
    <>
      <Head title="Customers" />

      <section className="overflow-x-auto">
        <table className="w-full">
          <thead className="border-b border-b-slate-300">
            <tr>
              {headers.map((item, index) => (
                <Th
                  {...item}
                  key={item.id}
                  index={index}
                  moveHeader={moveHeader}
                />
              ))}
            </tr>
          </thead>

          <tbody>
            {customers
              .slice(currentPage * 30 - 30, currentPage * 30)
              .map((item: TypeKey) => (
                <tr
                  key={item.id}
                  className="md:hover:bg-slate-100 cursor-pointer"
                >
                  {headers.map(({ path }, index) => (
                    <td
                      className={`py-3 md:px-5 ${
                        index > 0 && "border-l border-l-slate-200 px-2"
                      }`}
                      key={index}
                    >
                      {renderTd(path, item)}
                    </td>
                  ))}
                </tr>
              ))}
          </tbody>
        </table>
      </section>

      <section className="py-10 flex justify-center">
        <Pagination
          pages={Math.ceil(customers.length / 30)}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </section>
    </>
  );
}

export function Th({ title, id, moveHeader, index }: ThProps) {
  const ref = useRef(null);

  const [{ isDragging }, dragRef] = useDrag(() => ({
    type: "th",
    item: { id: index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  const [_, dropRef] = useDrop({
    accept: "th",
    drop: (item: HeadersProps) => moveHeader(item.id, index),
  });

  dragRef(dropRef(ref));

  return (
    <th
      ref={ref}
      className={`w-[25%] p-3 text-start cursor-pointer md:hover:bg-slate-100 ${
        index > 0 && "border-l border-l-slate-200"
      }`}
    >
      <motion.div layout>{isDragging ? "" : title}</motion.div>
    </th>
  );
}
