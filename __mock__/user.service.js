const login = () => {
  return new Promise(res => {
    setTimeout(() => {
      res();
    }, 2000);
  });

};


const getUserProfile = () => {
  return new Promise(res => {
    setTimeout(() => {
      res('Terry');
    }, 2000);
  });
};

export default {login, getUserProfile};
