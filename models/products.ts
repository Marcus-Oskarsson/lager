import config from "../.config/config.json";

const products = {
  getProducts: async () => {
    const response = await fetch(
      `${config.BASE_URL}/products?api_key=${config.API_KEY}`
    );
    const result = await response.json();
    return result.data;
  },
  updateStock: async (itemOptions) => {
    const update_stock_options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...itemOptions,
      }),
    };
    await fetch(`${config.BASE_URL}/products`, update_stock_options);
  },
};

export default products;
