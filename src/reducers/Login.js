const initialState = {
  role: "",
  token: null,
};

const Login = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case "LOOGIN":
      const { role, token } = payload;
      localStorage.setItem("token", token);
      localStorage.setItem("role", role);
      return { role, token };

    case "LOGOUT":
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      return { role: "", token: null };

    default:
      const storedToken = localStorage.getItem("token");
      const storedRole = localStorage.getItem("role");
      if (storedToken && storedRole) {
        return { token: storedToken, role: storedRole };
      } else return state;
  }
};

export default Login;

export const signIn = (data) => {
  return {
    type: "LOOGIN",
    payload: data,
  };
};

export const signOut = (data) => {
  return {
    type: "LOGOUT",
    payload: data,
  };
};
