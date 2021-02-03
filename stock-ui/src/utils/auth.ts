/**
 * @description set login token in client
 * @param {string} token
 */
export const setToken = (token: string) => {
  window.localStorage.setItem("token", token);
};

/**
 * @description get login token in client
 */
export const getToken = () => {
  return window.localStorage.getItem("token");
};

export const control = () => {};
