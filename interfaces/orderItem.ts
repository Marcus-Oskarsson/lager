import Specifiers from "./specifiers";

interface OrderItem {
  product_id: number;
  amount: number;
  article_number: string;
  name: string;
  description: string;
  specifiers: Partial<Specifiers>;
  stock: number;
  location: string;
  price: number;
}

export default OrderItem;
