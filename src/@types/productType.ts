export interface LocalProductProps {
  title: string;
  description: string;
  price: number;
  quantity: number;
  colors: string[];
  categories: {
    name: string;
  }[];
  pictures: File[];
}

export interface ProductProps {
  id: string;
  title: string;
  description: string;
  price: number;
  quantity: number;
  colors: string[];
  categories: {
    id: string;
    name: string;
  }[];
  pictures: {
    id: string;
    url: string;
  }[];
}
