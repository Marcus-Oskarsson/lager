import { StatusBar } from "expo-status-bar";
import { Image, Text, ScrollView } from "react-native";
import { Base, Typography } from "../styles";

import Stock from "../components/Stock";
import bookcases from "../assets/bookcases.jpg";

const Home = ({ products, setProducts }) => {
  return (
    <ScrollView style={Base.base}>
      <Text style={{ ...Typography.header1, ...Typography.normalTextColor }}>
        Boklager
      </Text>
      <Image source={bookcases} style={Base.image} />
      <Stock products={products} setProducts={setProducts} />
      <StatusBar style="light" />
    </ScrollView>
  );
};

export default Home;
