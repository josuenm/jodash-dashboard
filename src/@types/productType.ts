interface CategoryProps {
  id?: string;
  name: string;
}

export interface LocalProductProps {
  title: string;
  description: string;
  price: number;
  quantity: number;
  colors: string[];
  categories: CategoryProps[];
  pictures: File[];
}

export interface ProductProps {
  id: string;
  title: string;
  description: string;
  price: number;
  quantity: number;
  colors: string[];
  categories: CategoryProps[];
  pictures: {
    id: string;
    url: string;
  }[];
}

export interface EditProductProps {
  id: string;
  title: string;
  description: string;
  price: number;
  quantity: number;
  colors: string[];
  categories: CategoryProps[];
  pictures: {
    id: string;
    url: string;
  }[];
  uploadedPictures: File[];
}
