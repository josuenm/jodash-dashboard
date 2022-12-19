import { EditProductProps } from "@/@types/productType";
import Head from "@/components/head";
import { FetchLoadingScreen } from "@/components/loading-screen";
import { UploadImage } from "@/components/upload-image";
import { useProduct } from "@/contexts/productContext";
import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { MdClose } from "react-icons/md";
import { RiCloseCircleFill } from "react-icons/ri";
import { useNavigate, useParams } from "react-router-dom";

interface FormGroupProps {
  children?: React.ReactNode | React.ReactNode[];
  className?: string;
}

type KeyString = { [key: string]: any };

type EventOnChange = React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;

export default function EditProduct() {
  const colorInput = useRef<HTMLInputElement>(null);
  const categoryInput = useRef<HTMLInputElement>(null);

  const { id } = useParams();
  const { getProductById } = useProduct();

  const [inputs, setInputs] = useState<EditProductProps>({
    id: "",
    title: "",
    description: "",
    price: 0,
    quantity: 1,
    colors: [],
    categories: [],
    pictures: [],
    uploadedPictures: [],
  });

  const getProduct = useCallback(async () => {
    const res = await getProductById(id as string);

    if (res) {
      setInputs({ ...res, uploadedPictures: [] });
    }
  }, []);

  useEffect(() => {
    getProduct();
  }, []);

  const navigate = useNavigate();

  const [errors, setErrors] = useState({
    title: "",
    description: "",
    price: "",
    quantity: "",
    colors: "",
    categories: "",
  });

  const removeErrorFromInput = (value: string) => {
    const err: KeyString = errors;

    if (err[value]) {
      document
        .querySelector(`#createProductForm [name="${value}"]`)
        ?.classList.remove("border-red-500");
      setErrors((prev) => ({ ...prev, [value]: "" }));
    }
  };

  const onChange = (e: EventOnChange) => {
    removeErrorFromInput(e.target.name);
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const addPicture = (pictures: File[]) => {
    const arrPictures = inputs.uploadedPictures;
    pictures.forEach((pic) => inputs.uploadedPictures.push(pic));

    setInputs((prev) => ({ ...prev, uploadedPictures: arrPictures }));
  };

  const deletePicture = (name: string) => {
    setInputs((prev) => ({
      ...prev,
      uploadedPictures: inputs.uploadedPictures.filter(
        (img) => img.name !== name
      ),
    }));
  };

  const deletePictureThatAlreadyExist = (id: string) => {
    setInputs((prev) => ({
      ...prev,
      pictures: inputs.pictures.filter((img) => img.id !== id),
    }));
  };

  const addColor = () => {
    const color = colorInput.current?.value || "";
    setInputs((prev) => ({ ...prev, colors: [...prev.colors, color] }));
    colorInput.current && (colorInput.current.value = "");
  };

  const deleteColor = (color: string) => {
    setInputs((prev) => ({
      ...prev,
      colors: inputs.colors.filter((c) => c !== color),
    }));
  };

  const addCategory = () => {
    const category = categoryInput.current?.value || "";
    setInputs((prev) => ({
      ...prev,
      categories: [...prev.categories, { name: category }],
    }));
    categoryInput.current && (categoryInput.current.value = "");
  };

  const deleteCategory = (category: { name: string }) => {
    setInputs((prev) => ({
      ...prev,
      categories: inputs.categories.filter((c) => c.name !== category.name),
    }));
  };

  const { editProduct, isLoading } = useProduct();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const requiredStringFields = ["title", "description"];
    const requiredNumberFields = ["price", "quantity"];
    const requriedArrayFields = ["colors", "categories"];

    const fields: KeyString = inputs;

    const notFilled: string[] = [];

    requiredStringFields.forEach((field) => {
      if (fields[field] === "") {
        notFilled.push(field);
      }
    });

    requiredNumberFields.forEach((field) => {
      if (fields[field] === 0) {
        notFilled.push(field);
      }
    });

    requriedArrayFields.forEach((field) => {
      if (fields[field].length === 0) {
        notFilled.push(field);
      }
    });

    if (notFilled.length > 0) {
      notFilled.forEach((field) => {
        setErrors((prev) => ({ ...prev, [field]: "Field is required" }));

        document
          .querySelector(`#createProductForm [name="${field}"]`)
          ?.classList.add("border-red-500");
      });
      return;
    }

    editProduct(inputs);
  };

  return (
    <>
      <Head title="Edit Product" />

      <FetchLoadingScreen state={isLoading} />

      <h2 className="font-bold text-3xl">Create new product</h2>

      <section className="my-8">
        <form
          className="flex flex-col gap-4"
          onSubmit={onSubmit}
          id="createProductForm"
        >
          <FormGroup>
            <label htmlFor="title" className="text-xl font-medium">
              Title:
            </label>
            <input
              type="text"
              name="title"
              id="title"
              className="bg-slate-100 border border-slate-300 rounded-md px-2 py-2 text-lg outline-none focus:border-primary"
              placeholder="Type your title"
              value={inputs.title}
              onChange={onChange}
            />
            {errors.title && <p className="text-red-500">{errors.title}</p>}
          </FormGroup>

          <FormGroup>
            <label htmlFor="description" className="text-xl font-medium">
              Description:
            </label>
            <textarea
              className="bg-slate-100 border border-slate-300 rounded-md px-2 py-2 text-lg outline-none focus:border-primary"
              placeholder="Type your description"
              name="description"
              id="description"
              value={inputs.description}
              onChange={onChange}
            />
            {errors.description && (
              <p className="text-red-500">{errors.description}</p>
            )}
          </FormGroup>

          <FormGroup>
            <label htmlFor="price" className="text-xl font-medium">
              Price:
            </label>
            <div className="grid grid-cols-2 items-center gap-2">
              <input
                type="number"
                name="price"
                id="price"
                className="bg-slate-100 border border-slate-300 rounded-md px-2 py-2 text-lg outline-none focus:border-primary"
                placeholder="Type your price"
                value={inputs.price}
                onChange={onChange}
              />
              <span className="text-lg font-medium">
                {new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: "USD",
                  currencyDisplay: "narrowSymbol",
                }).format(inputs.price)}
              </span>
            </div>
            {errors.price && <p className="text-red-500">{errors.price}</p>}
          </FormGroup>

          <FormGroup>
            <label htmlFor="quantity" className="text-xl font-medium">
              Available quantity:
            </label>
            <input
              type="number"
              name="quantity"
              id="quantity"
              min={1}
              className="bg-slate-100 border border-slate-300 rounded-md px-2 py-2 text-lg outline-none focus:border-primary"
              placeholder="Type a quantity"
              value={inputs.quantity}
              onChange={onChange}
            />
            {errors.quantity && (
              <p className="text-red-500">{errors.quantity}</p>
            )}
          </FormGroup>

          <FormGroup>
            <label htmlFor="colors" className="text-xl font-medium">
              Colors:
            </label>
            <div className="flex flex-col gap-2">
              <div className="flex flex-col gap-2">
                <AnimatePresence>
                  {inputs.colors &&
                    inputs.colors.map((color) => (
                      <motion.div
                        initial={{ opacity: 0, y: -100 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, x: 100 }}
                        key={color}
                        className="shadow-around-sm bg-white rounded-lg px-4 py-3 border border-slate-400 flex justify-between items-center"
                        onClick={() => deleteColor(color)}
                      >
                        <span className="text-slate-600">{color}</span>
                        <MdClose className="w-5 h-5 text-slate-600" />
                      </motion.div>
                    ))}
                </AnimatePresence>
              </div>
              <input
                ref={colorInput}
                type="text"
                name="colors"
                id="colors"
                className="col-span-2 bg-slate-100 border border-slate-300 rounded-md px-2 py-2 text-lg outline-none focus:border-primary"
                placeholder="Type your colors"
                onChange={(e) => removeErrorFromInput(e.target.name)}
              />
              {errors.colors && <p className="text-red-500">{errors.colors}</p>}

              <button
                type="button"
                className="w-fit ml-auto bg-primary px-5 py-2 rounded-md text-md text-white font-medium"
                onClick={addColor}
              >
                Add color
              </button>
            </div>
          </FormGroup>

          <FormGroup>
            <label htmlFor="categories" className="text-xl font-medium">
              Categories:
            </label>
            <div className="flex flex-col gap-2">
              <div className="flex flex-col gap-2">
                <AnimatePresence>
                  {inputs.categories.length > 0 &&
                    inputs.categories.map((category) => (
                      <motion.div
                        initial={{ opacity: 0, y: -100 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, x: 100 }}
                        key={category.name}
                        className="shadow-around-sm bg-white rounded-lg px-4 py-3 border border-slate-400 flex justify-between items-center"
                        onClick={() => deleteCategory(category)}
                      >
                        <span className="text-slate-600">{category.name}</span>
                        <MdClose className="w-5 h-5 text-slate-600" />
                      </motion.div>
                    ))}
                </AnimatePresence>
              </div>
              <input
                ref={categoryInput}
                type="text"
                name="categories"
                id="categories"
                className="col-span-2 bg-slate-100 border border-slate-300 rounded-md px-2 py-2 text-lg outline-none focus:border-primary"
                placeholder="Type your categories"
                onChange={(e) => removeErrorFromInput(e.target.name)}
              />
              {errors.categories && (
                <p className="text-red-500">{errors.categories}</p>
              )}
              <button
                type="button"
                className="w-fit ml-auto bg-primary px-5 py-2 rounded-md text-md text-white font-medium"
                onClick={addCategory}
              >
                Add category
              </button>
            </div>
          </FormGroup>

          <FormGroup>
            <label htmlFor="pictures" className="text-xl font-medium">
              Pictures:
            </label>

            <UploadImage
              pictures={inputs.uploadedPictures}
              addPicture={addPicture}
              deletePicture={deletePicture}
            />
            {inputs.pictures.length > 0 && (
              <div className="mt-5">
                <label className="text-xl font-medium">
                  Photos that already exist:
                </label>
                <div className="mt-2 overflow-auto">
                  <div
                    className="flex gap-4"
                    style={{ width: `${inputs.pictures.length * 12}rem` }}
                  >
                    {inputs.pictures.map((picture, index) => (
                      <div
                        key={index}
                        className="relative w-44 h-44 border-2 border-slate-400 rounded-md flex justify-center items-center overflow-hidden"
                      >
                        <RiCloseCircleFill
                          className="w-9 h-9 absolute top-2 right-2 text-white"
                          onClick={() =>
                            deletePictureThatAlreadyExist(picture.id)
                          }
                        />
                        <img
                          src={picture.url}
                          className="w-48 h-48 rounded-md object-cover"
                          alt="Picture that already exist"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </FormGroup>

          <FormGroup className="pt-6 border-t border-t-slate-300">
            <button
              type="submit"
              className="bg-primary px-5 py-2 rounded-md text-md text-white font-medium"
            >
              Confirm edition
            </button>
            <button
              type="button"
              className="px-5 py-2 rounded-md text-md text-primary font-medium"
              onClick={() => navigate("/products")}
            >
              Cancel
            </button>
          </FormGroup>
        </form>
      </section>
    </>
  );
}

function FormGroup({ children, className }: FormGroupProps) {
  return <div className={`flex flex-col gap-1 ${className}`}>{children}</div>;
}
