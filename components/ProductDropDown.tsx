import { useState, useEffect } from "react";
import { Picker } from "@react-native-picker/picker";

import productModel from "../models/products";
import Product from "../interfaces/product";
import { Typography } from "../styles/";

const ProductDropDown = (props) => {
  const [products, setProducts] = useState<Product[]>([]);
  let productsHash: any = {};

  const reloadProducts = async () => {
    setProducts(await productModel.getProducts());
  };

  useEffect(() => {
    reloadProducts();
  }, []);

  const itemsList = products.map((prod, index) => {
    productsHash[prod.id] = prod;
    return (
      <Picker.Item
        key={index}
        label={prod.name}
        value={prod.id}
        style={Typography.normal}
      />
    );
  });

  return (
    <Picker
      style={Typography.normalTextColor}
      selectedValue={props.delivery?.product_id}
      onValueChange={(itemValue) => {
        props.setDelivery({ ...props.delivery, product_id: itemValue });
        props.setCurrentProduct(productsHash[itemValue]);
        props.checkDelivery();
      }}
    >
      {itemsList}
    </Picker>
  );
};

export default ProductDropDown;
