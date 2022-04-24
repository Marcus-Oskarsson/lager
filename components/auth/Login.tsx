import { useState } from "react";

import Auth from "../../interfaces/auth";
import AuthModel from "../../models/auth";
import AuthFields from "./AuthFields";

const Login = ({ navigation, setIsLoggedIn }) => {
  const [auth, setAuth] = useState<Partial<Auth>>({});

  const doLogin = async () => {
    if (auth.email & auth.password) {
      const result = await AuthModel.loggedIn(auth.email, auth.password);
      setIsLoggedIn(true);
    }
  };

  return (
    <AuthFields
      auth={auth}
      setAuth={setAuth}
      sumbit={doLogin}
      title="Logga in"
      navigation={navigation}
    />
  );
};

export default Login;
