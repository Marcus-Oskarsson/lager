import { createNativeStackNavigator } from "@react-navigation/native-stack";

import OrderList from "../components/OrderList";
import PickList from "../components/PickList";

const Stack = createNativeStackNavigator();

const Pick = (props) => {
  return (
    <Stack.Navigator initialRouteName="List">
      <Stack.Screen name="List" component={OrderList} />
      <Stack.Screen name="Details">
        {(screenProps) => (
          <PickList {...screenProps} setProducts={props.setProducts} />
        )}
      </Stack.Screen>
    </Stack.Navigator>
  );
};
export default Pick;
