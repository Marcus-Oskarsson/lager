import { View, Text, TextInput, Button } from "react-native";
import { Typography, Forms, Base } from "../../styles";

const AuthFields = ({ auth, setAuth, title, sumbit, navigation }) => {
  return (
    <View>
      <Text>{title}</Text>

      <Text>E-post</Text>
      <TextInput
        onChangeText={(content: string) => {
          setAuth({ ...auth, email: content });
        }}
        value={auth?.email}
        keyboardType="email-address"
        autoCapitalize="none"
        autoCompleteType="email" // eller off
        autoCorrect={false}
      />

      <Text>Lösenord</Text>
      <TextInput
        onChangeText={(content: string) => {
          setAuth({ ...auth, password: content });
        }}
        value={auth?.password}
        secureTextEntry={true}
        autoCapitalize="none"
        autoCompleteType="off"
        autoCorrect={false}
      />
      <Button
        title={title}
        onPress={() => {
          sumbit({ ...auth });
        }}
      />
      {title === "Logga in" && (
        <Button
          title="Registrera"
          onPress={() => {
            navigation.navigate("Register");
          }}
        />
      )}
    </View>
  );
};

export default AuthFields;
