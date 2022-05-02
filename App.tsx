import { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import Home from "./screens/Home";
import Pick from "./screens/Pick";
import Deliveries from "./screens/Deliveries";
import Auth from "./components/auth/Auth";
import Invoices from "./components/invoices/Invoices";
import Ship from "./components/ship/Ship";

import Product from "./interfaces/product";

import authModel from "./models/auth";

import { Base } from "./styles";

const App = () => {
  const [products, setProducts] = useState<Partial<Product[]>>([]);
  const [isLoggedIn, setIsLoggedIn] = useState<Boolean>(false);

  const Tab = createBottomTabNavigator();

  const routeIcons = {
    Lager: "home",
    Plock: "list",
    Inleveranser: "receipt-outline",
    Faktura: "mail",
    "Logga in": "lock-closed-outline",
    Skicka: "archive",
  };

  useEffect(async () => {
    setIsLoggedIn(
      await authModel.loggedIn() /* Vi kommer tillbaka till denna funktion. */
    );
  }, []);

  return (
    <SafeAreaView style={Base.container}>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName = routeIcons[route.name] || "alert";

              return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: "white",
            tabBarInactiveTintColor: "gray",
            tabBarActiveBackgroundColor: "black",
            tabBarInactiveBackgroundColor: "black",
          })}
        >
          <Tab.Screen name="Lager">
            {() => <Home products={products} setProducts={setProducts} />}
          </Tab.Screen>
          <Tab.Screen name="Plock">
            {() => <Pick setProducts={setProducts} />}
          </Tab.Screen>
          <Tab.Screen name="Inleveranser">
            {() => <Deliveries setProducts={setProducts} />}
          </Tab.Screen>
          {isLoggedIn ? (
            <Tab.Screen name="Faktura">
              {() => <Invoices setIsLoggedIn={setIsLoggedIn} />}
            </Tab.Screen>
          ) : (
            <Tab.Screen name="Logga in">
              {() => <Auth setIsLoggedIn={setIsLoggedIn} />}
            </Tab.Screen>
          )}
          <Tab.Screen name="Skicka" component={Ship} />
        </Tab.Navigator>
      </NavigationContainer>
      <StatusBar style="light" />
    </SafeAreaView>
  );
};

export default App;
