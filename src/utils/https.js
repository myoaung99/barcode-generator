import axios from "axios";
const BACKEND_URL = "https://glow-test-api.herokuapp.com/api/v1";

// customer
export const getAllMembers = async (token, page) => {
  const response = await axios.get(BACKEND_URL + "/customer", {
    params: {
      page: page,
    },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
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
  const url = BACKEND_URL + "/customer/" + customer_id;

  const response = await axios.delete(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data.deletedCustomer.customer_name;
};

export const patchCustomer = async (customer_id, data, token) => {
  const url = BACKEND_URL + "/customer/" + customer_id;

  const response = await axios.patch(url, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  console.log(response);
};

// auth
export const loginSystemAdmin = async (username, password) => {
  const url = BACKEND_URL + "/auth/login";

  const response = await axios.post(url, {
    username: username,
    password: password,
  });

  return response.data.token;
};

// admims

export const getAllSystemAdmins = async (token) => {
  const response = await axios.get(BACKEND_URL + "/admin", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data.admins;
};

export const createSystemAdmin = async (username, password, token) => {
  const url = BACKEND_URL + "/admin";
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
  return response.data.createdAdmin;
};

export const deleteSystemAdmin = async (admin_id, token) => {
  const url = BACKEND_URL + "/admin/" + admin_id;

  const response = await axios.delete(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  console.log(response);
  // return response.data.deletedCustomer.customer_name;
};
