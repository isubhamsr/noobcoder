import { API } from "../../backend";

export const createOrder = (userId, token, orderData) => {
  const formData = new FormData();

  for (const name in orderData) {
    formData.append(name, orderData[name]);
  }

  return fetch(`${API}order/add/${userId}/${token}/`, {
    method: "POST",
    body: formData,
  })
    .then((responce) => {
      return responce.json();
    })
    .catch((error) => {
      // console.log(error.message);
      return error.message;
    });
};
