import config from "../.config/config.json";
import OrderItem from "../interfaces/orderItem";
import productModel from "./products";

const orders = {
  getOrders: async function getOrders() {
    const response = await fetch(
      `${config.BASE_URL}/orders?api_key=${config.API_KEY}`
    );
    const result = await response.json();

    return result.data;
  },
  pickOrder: async function pickOrder({ id, name, order_items }) {
    order_items.forEach(async (item: Partial<OrderItem>) => {
      let itemOptions = {
        id: item.product_id,
        name: item.name,
        stock: item.stock - item.amount,
        api_key: config.API_KEY,
      };
      await productModel.updateStock(itemOptions);
    });

    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id,
        name,
        status_id: 200,
        api_key: config.API_KEY,
      }),
    };
    await fetch(`${config.BASE_URL}/orders`, options);
  },
};

export default orders;
