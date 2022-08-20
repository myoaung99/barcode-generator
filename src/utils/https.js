import axios from "axios";
const BACKEND_URL = "https://glow-test-api.herokuapp.com/api/v1";

export const getAllMembers = async (token) => {
  const response = await axios.get(BACKEND_URL + "/customer", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data.members;
};

export const loginAdmin = async (username, password) => {
  const url = BACKEND_URL + "/auth/login";

  const response = await axios.post(url, {
    username: username,
    password: password,
  });

  return response.data.token;
};

export const createAdmin = async (username, password, token) => {
  const url = BACKEND_URL + "/auth/admin";

  const response = await axios.post(
    url,
    {
      username: username,
      password: password,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  console.log(response);
  // return response.data.token;
};

export const createBarcode = async (data, token) => {
  const url = BACKEND_URL + "/customer";
  const { vip_code, customer_name } = data;
  const response = await axios.post(
    url,
    {
      customer_name: customer_name,
      vip_code: vip_code,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data.customer;
};

export const deleteCustomer = async (customer_id, token) => {
  const url =
    "https://glow-test-api.herokuapp.com/api/v1/customer/" + customer_id;

  const response = await axios.delete(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data.deletedCustomer.customer_name;
};
