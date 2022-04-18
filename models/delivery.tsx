import config from "../.config/config.json";
import OrderItem from "../interfaces/orderItem";
import productModel from "./products";

import Delivery from "../interfaces/Delivery";

const deliveries = {
  getDeliveries: async function getDeliveries() {
    try {
      const response = await fetch(
        `${config.BASE_URL}/deliveries?api_key=${config.API_KEY}`
      );
      const result = await response.json();
      return result.data;
    } catch (error) {
      return [];
    }
  },
  addDelivery: async function addDelivery(delivery: Partial<Delivery>) {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...delivery,
        api_key: config.API_KEY,
      }),
    };
    await fetch(`${config.BASE_URL}/deliveries`, options);

    const oldProduct = await productModel.getProduct(delivery.product_id);
    const itemOptions = {
      id: delivery.product_id,
      name: oldProduct.name,
      stock: oldProduct.stock + delivery.amount,
      api_key: config.API_KEY,
    };
    await productModel.updateStock(itemOptions);
  },
};

export default deliveries;
