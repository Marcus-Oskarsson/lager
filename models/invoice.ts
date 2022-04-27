import config from "../.config/config.json";
import storageModel from "./storage";
import Invoice from "../interfaces/invoice";

const invoices = {
  getInvoices: async function getInvoices() {
    const accessToken = await storageModel.readToken();
    try {
      const response = await fetch(
        `${config.BASE_URL}/invoices?api_key=${config.API_KEY}`,
        { headers: { "x-access-token": accessToken.token } }
      );
      const result = await response.json();
      return result.data;
    } catch (error) {
      return [];
    }
  },
  addInvoice: async function addInvoice(invoice: Partial<Invoice>) {
    const accessToken = await storageModel.readToken();
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": accessToken.token,
      },
      body: JSON.stringify({
        ...invoice,
        api_key: config.API_KEY,
      }),
    };
    await fetch(`${config.BASE_URL}/invoices`, options);
  },
};

export default invoices;
