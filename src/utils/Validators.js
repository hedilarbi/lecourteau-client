const emailValidator = (email) => {
  const regEx =
    /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;
  if (email.length <= 0 || !email.match(regEx)) {
    return true;
  } else {
    return false;
  }
};

export { emailValidator };
