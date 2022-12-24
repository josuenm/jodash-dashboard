import { ProductProps } from "@/@types/productType";
import Head from "@/components/head";
import { useProduct } from "@/contexts/productContext";
import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Products() {
  const [products, setProducts] = useState<ProductProps[]>([]);

  const { getAllProducts, isLoading } = useProduct();

  const getAllProductsCallback = useCallback(async () => {
    const res = await getAllProducts();

    if (res.length > 0) {
      setProducts(res);
    }
  }, []);

  useEffect(() => {
    getAllProductsCallback();
  }, []);

  return (
    <>
      <Head title="Products" />

      <section>
        <h2 className="font-bold text-3xl">Create a product</h2>
        <p className="text-slate-600 mb-3">
          Create your product with title, description, price and photos
        </p>
        <Link to="add">
          <button className="bg-primary px-5 py-2 rounded-md text-md text-white font-medium">
            Create new product
          </button>
        </Link>
      </section>

      <section className="my-20">
        <h2 className="font-bold text-xl mb-5">Products</h2>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
          {isLoading
            ? [0, 1, 2, 3, 4].map((skeleton) => (
                <SkeletonProductCard key={skeleton} />
              ))
            : products.map((product) => (
                <ProductCard {...product} key={product.id} />
              ))}
        </div>
      </section>
    </>
  );
}

function SkeletonProductCard() {
  return (
    <div className="w-full h-80 border border-neutral-400 shadow-around-sm rounded-md bg-white animate-pulse p-2">
      <div className="w-full h-48 bg-neutral-200 animate-pulse rounded-md" />

      <footer className="mt-5">
        <div className="w-[60%] h-5 bg-neutral-200 rounded-full" />

        <div className="flex flex-col gap-2 mt-5">
          <div className="w-[90%] h-5 bg-neutral-200 rounded-full" />
          <div className="w-[80%] h-5 bg-neutral-200 rounded-full" />
        </div>
      </footer>
    </div>
  );
}

function ProductCard({
  id,
  title,
  pictures,
  price,
  description,
}: ProductProps) {
  return (
    <Link
      to={`/products/${id}`}
      className="w-full h-[300px] border border-neutral-400 shadow-around-sm rounded-md bg-white overflow-hidden p-1 flex flex-col justify-between"
    >
      <div className="w-full w-full h-96 bg-slate-300 rounded-md flex justify-center items-center">
        {pictures.length > 0 ? (
          <img
            src={pictures[0].url}
            alt={title || "Product image"}
            className="w-full h-full rounded-md bg-neutral-200 object-cover"
          />
        ) : (
          <strong className="text-primary">No Picture</strong>
        )}
      </div>
      <main>
        <strong className="text-lg">{title}</strong>
        <p className="text-md text-neutral-600">
          {description.length > 80
            ? description.slice(0, 80) + "..."
            : description}
        </p>
      </main>
      <strong className="text-lg self-end">
        {new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
          currencyDisplay: "narrowSymbol",
        }).format(price)}
      </strong>
    </Link>
  );
}
