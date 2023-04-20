export const getCart = (key) => {
  return JSON.parse(localStorage.getCart(key));
};

export const setCart = (key, data) => {
  return localStorage.setItem(key, JSON.stringify(data));
};
