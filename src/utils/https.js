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
  console.log(token);
  const response = await axios.post(url, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

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

  await axios.patch(url, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getFilteredCustomers = async (filterData, token) => {
  const { columnField: field, operatorValue: operator, value } = filterData;

  const httpConfig = {
    operator,
    field,
    value,
  };

  const url = BACKEND_URL + "/customer/filter";

  const response = await axios.get(url, {
    params: httpConfig,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  console.log(response);
  return response.data.members;
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

// admins
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

  await axios.delete(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
