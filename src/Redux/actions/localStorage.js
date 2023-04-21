export const getCart = (key) => {
  if (localStorage.getItem(key)) {
    return JSON.parse(localStorage.getItem(key));
  }
  console.log("localStorage empty");
};

export const setCart = (key, data) => {
  const cart = [];

  return localStorage.setItem(key, JSON.stringify(data));
};
