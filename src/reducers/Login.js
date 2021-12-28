const initialState = {
  role: null,
  token: "",
  user: null,
};


const Login = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case "LOOGIN":
      const { role, token, user } = payload;
      localStorage.setItem("token", token);
      localStorage.setItem("role", JSON.stringify(role));
      localStorage.setItem("user", JSON.stringify(user));

      return { role, token, user };

    case "LOGOUT":
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      localStorage.removeItem("user");

      return { role: null, token: "" , user: null};

    default:
      const storedToken = localStorage.getItem("token");
      const storedRole = JSON.parse(localStorage.getItem("role"));
      const storedUser = JSON.parse(localStorage.getItem("user"));

      if (storedToken && storedRole && storedUser) {
        return { token: storedToken, role: storedRole, user: storedUser };
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
