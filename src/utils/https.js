import axios from "axios";

export const getAllMembers = async (token) => {
  const response = await axios.get(
    "https://glow-test-api.herokuapp.com/api/v1/customer",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  console.log(response);
};

const authenticate = async (username, password) => {
  const url = `https://glow-test-api.herokuapp.com/api/v1/auth/login`;

  const response = await axios.post(url, {
    username: username,
    password: password,
  });

  return response.data.token;
};

export const loginUser = (username, password) => {
  return authenticate(username, password);
};
