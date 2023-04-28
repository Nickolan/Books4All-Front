export const getCart = (key) => {
  if (localStorage.getItem(key)) {
    return JSON.parse(localStorage.getItem(key));
  }
};

export const setCart = (key, data) => {
  const cart = [];

  return localStorage.setItem(key, JSON.stringify(data));
};

export const getTheme = (key) => {
  if (localStorage.getItem(key)) {
    return JSON.parse(localStorage.getItem(key));
  }
};

export const setTheme = (key, data) => {
  const theme = "";
  return localStorage.setItem(key, JSON.stringify(data));
};
