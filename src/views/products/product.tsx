import { ProductProps } from "@/@types/productType";
import { FetchLoadingScreen } from "@/components/loading-screen";
import { useProduct } from "@/contexts/productContext";
import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function Product() {
  const [product, setProduct] = useState<ProductProps>({
    id: "",
    title: "",
    description: "",
    price: 0,
    quantity: 0,
    colors: [],
    categories: [],
    pictures: [],
  });

  const { getProductById, isLoading } = useProduct();

  const { id } = useParams();

  const getProduct = useCallback(async () => {
    const res = await getProductById(id as string);

    if (res) {
      setProduct(res);
    }
  }, []);

  useEffect(() => {
    getProduct();
  }, []);

  return (
    <>
      <Tools />

      {isLoading ? (
        <Skeleton />
      ) : (
        <main className="flex flex-col gap-4">
          <header>
            <h1 className="text-2xl font-bold">{product.title}</h1>
            <p className="text-sm text-neutral-600">
              Available: {product.quantity}
            </p>
          </header>

          <div className="mt-2 overflow-auto">
            <div
              className="flex gap-4"
              style={{
                width: `${
                  product.pictures.length > 1
                    ? `${product.pictures.length * 16}rem`
                    : "100%"
                }`,
              }}
            >
              {product.pictures.length > 1 ? (
                product.pictures.map((img, index) => (
                  <div
                    key={index}
                    className="relative w-60 h-60 border-2 border-slate-400 rounded-md flex justify-center items-center overflow-hidden"
                  >
                    <img
                      src={img.url}
                      className="w-64 h-64 rounded-md object-cover"
                      alt={product.title || "Product image"}
                    />
                  </div>
                ))
              ) : (
                <div className="relative w-full h-60 border-2 border-slate-400 bg-slate-400 rounded-md flex justify-center items-center overflow-hidden">
                  {product.pictures[0]?.url && (
                    <img
                      src={product.pictures[0].url}
                      className="w-full h-64 rounded-md object-cover"
                      alt={product.title || "Product image"}
                    />
                  )}
                </div>
              )}
            </div>
          </div>

          <p className="text-md text-neutral-600 font-medium">
            {product.description}
          </p>

          <div>
            <strong className="text-lg">Colors available</strong>
            <ul className="list-disc">
              {product.colors.map((color, index) => (
                <li key={index} className="text-md">
                  - {color}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <strong className="text-lg">Categories</strong>
            <ul className="list-disc">
              {product.categories.map((category, index) => (
                <li key={index} className="text-md">
                  - {category.name}
                </li>
              ))}
            </ul>
          </div>
        </main>
      )}
    </>
  );
}

function DeleteModal({
  state,
  setState,
}: {
  state: boolean;
  setState: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const { deleteProduct, isLoading } = useProduct();

  const { id } = useParams();

  return (
    <>
      <FetchLoadingScreen state={isLoading} />

      <AnimatePresence>
        {state && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed top-0 left-0 w-full h-screen bg-neutral-100/70 z-30"
              onClick={() => setState(false)}
            />

            <motion.div
              initial={{ opacity: 0, y: -300 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -300 }}
              className="fixed top-1/4 right-0 left-0 w-11/12 mx-auto h-62 bg-white p-4 rounded-md shadow-around-sm z-40"
            >
              <header className="border-b border-neutral-200">
                <h3 className="text-lg font-bold pb-2">Are you sure?</h3>
              </header>
              <p className="my-8 text-md">
                If you delete it, you will not be able to reverse this action.
              </p>
              <footer className="border-t border-neutral-200 py-2 flex justify-end gap-4">
                <button
                  className="bg-transparent text-primary rounded-md px-4 py-2 font-medium"
                  onClick={() => setState(false)}
                >
                  Cancel
                </button>
                <button
                  className="bg-red-500 text-white rounded-md px-4 py-2 font-medium"
                  onClick={() => deleteProduct(id as string)}
                >
                  Delete
                </button>
              </footer>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

function Tools() {
  const [deleteModal, setDeleteModal] = useState(false);

  return (
    <>
      <DeleteModal state={deleteModal} setState={setDeleteModal} />

      <div className="fixed bottom-10 right-2/4 translate-x-2/4 rounded-full bg-primary text-white flex gap-2">
        <button className="text-lg font-medium px-4 py-2">Edit</button>
        <button
          className="text-lg font-medium px-4 py-2"
          onClick={() => setDeleteModal(true)}
        >
          Delete
        </button>
      </div>
    </>
  );
}

function Skeleton() {
  return (
    <div className="w-full rounded-md animate-pulse p-2">
      <div className="w-full h-64 bg-neutral-200 animate-pulse rounded-md" />

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
