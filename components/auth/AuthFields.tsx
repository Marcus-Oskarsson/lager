import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { Typography, Forms, Base } from "../../styles";

const AuthFields = ({ auth, setAuth, title, sumbit, navigation }) => {
  const allFields = () => {
    return auth.email && auth.password;
  };

  const buttonDeliveryValid = (
    <TouchableOpacity
      onPress={() => {
        sumbit({ ...auth });
      }}
    >
      <View style={Base.buttonValid}>
        <Text style={{ ...Typography.normalTextColor, ...Typography.button }}>
          Logga in
        </Text>
      </View>
    </TouchableOpacity>
  );
  const buttonDeliveryInvalid = (
    <TouchableOpacity
      onPress={() => {
        sumbit({ ...auth });
      }}
      disabled
    >
      <View style={Base.buttonDisable}>
        <Text style={{ ...Typography.normalTextColor, ...Typography.button }}>
          Fyll i dina uppgifter
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={Base.base}>
      <Text style={{ ...Typography.header2, ...Typography.header2color }}>
        {title}
      </Text>

      <Text style={{ ...Typography.normal, ...Typography.normalTextColor }}>
        E-post
      </Text>
      <TextInput
        onChangeText={(content: string) => {
          setAuth({ ...auth, email: content });
        }}
        value={auth?.email}
        keyboardType="email-address"
        autoCapitalize="none"
        autoCompleteType="email" // eller off
        autoCorrect={false}
        style={{ ...Forms.input, ...Typography.normalTextColor }}
      />

      <Text style={{ ...Typography.normal, ...Typography.normalTextColor }}>
        Lösenord
      </Text>
      <TextInput
        onChangeText={(content: string) => {
          setAuth({ ...auth, password: content });
        }}
        value={auth?.password}
        secureTextEntry={true}
        autoCapitalize="none"
        autoCompleteType="off"
        autoCorrect={false}
        style={{ ...Forms.input, ...Typography.normalTextColor }}
      />
      {allFields() ? buttonDeliveryValid : buttonDeliveryInvalid}

      {title === "Logga in" && (
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Register");
          }}
        >
          <View style={Base.button}>
            <Text
              style={{ ...Typography.normalTextColor, ...Typography.button }}
            >
              Registrera
            </Text>
          </View>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default AuthFields;
