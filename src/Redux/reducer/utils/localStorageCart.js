
// Detecta cambio en mi estado cart y lo guarda en el localStorage
const WAIT_INTERVAL = 500;

export const localStorageCartMiddleware = store => {
  let timer = null;
  return next => action => {
    const result = next(action);
    clearTimeout(timer);
    timer = setTimeout(() => {
      localStorage.setItem('cart', JSON.stringify(store.getState().cart));
    }, WAIT_INTERVAL);
    return result;
  };
};
//Me trae el cart guardado en el localStorage y lo guarda en mi estado cart
export const persistedCart = localStorage.getItem('cart')
  ? JSON.parse(localStorage.getItem('cart'))
  : [];

  