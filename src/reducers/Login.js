const initialState = {
  role: "",
  token: null,
  user: null,
};


const Login = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case "LOOGIN":
      const { role, token, user } = payload;
      localStorage.setItem("token", token);
      localStorage.setItem("role", role);
      localStorage.setItem("user", JSON.stringify(user));

      return { role, token, user };

    case "LOGOUT":
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      localStorage.removeItem("user");

      return { role: "", token: null , user: null};

    default:
      const storedToken = localStorage.getItem("token");
      const storedRole = localStorage.getItem("role");
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
