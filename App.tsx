import { StatusBar } from "expo-status-bar";
import { Image, StyleSheet, Text, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import Stock from "./components/Stock";
import bookcases from "./assets/bookcases.jpg";

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.base}>
        <Text style={styles.text}>Boklager för webapp</Text>
        <Image source={bookcases} style={styles.image} />
        <Stock />
        <StatusBar style="light" />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  image: {
    width: 320,
    height: 240,
  },
  base: {
    flex: 1,
    backgroundColor: "#000",
    padding: 16,
  },
  text: {
    color: "#efefef",
    fontSize: 24,
    marginBottom: 32,
    marginTop: 32,
  },
});
