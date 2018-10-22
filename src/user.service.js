export const login = () => {
  return new Promise(res => {
    setTimeout(() => {
      res();
    }, 2000);
  });
};


export const getUserProfile = () => {
  return new Promise(res => {
    setTimeout(() => {
      res('Terry');
    }, 2000);
  });
};
