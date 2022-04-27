import { createNativeStackNavigator } from "@react-navigation/native-stack";

import InvoiceList from "./InvoiceList";
import InvoiceForm from "./InvoiceForm";

const Stack = createNativeStackNavigator();

const Invoices = (props) => {
  return (
    <Stack.Navigator initialRouteName="List">
      <Stack.Screen name="List">
        {(screenProps) => (
          <InvoiceList {...screenProps} setIsLoggedIn={props.setIsLoggedIn} />
        )}
      </Stack.Screen>
      <Stack.Screen name="Form" component={InvoiceForm} />
    </Stack.Navigator>
  );
};
export default Invoices;
