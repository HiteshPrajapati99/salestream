import axios from "axios";

const baseUrl = "http://localhost:5000/store";

//  Get All Products
export const getProduct = async () => {
  const url = `${baseUrl}/product`;
  const token = localStorage.getItem("x-access-token");

  const { data } = await axios.get(url, {
    headers: { "x-access-token": token },
  });
  return data;
};

// Get Product By id
export const getProductById = async (id) => {
  const url = `${baseUrl}/product/${id}`;
  const token = localStorage.getItem("x-access-token");

  const { data } = await axios.get(url, {
    headers: { "x-access-token": token },
  });
  return data;
};

// Delete Single Product

export const deleteProductById = async (_id) => {
  const url = `${baseUrl}/product/delete/${_id}`;
  const token = localStorage.getItem("x-access-token");

  const { data } = await axios.delete(url, {
    headers: { "x-access-token": token },
  });

  return data;
};

//  Delete Selected Products

export const deleteMultipleProducts = async (selectedFiles) => {
  const url = `${baseUrl}/product/delete`;
  const token = localStorage.getItem("x-access-token");

  const { data } = await axios.delete(url, {
    data: selectedFiles,
    headers: { "x-access-token": token },
  });

  return data;
};
