const isEmpty = (value) => {
  return !value || value.trim() === "";
};

const userCredentialsAreValid = (username, password) => {
  return username && password && password.trim().length >= 6;
};

const userDetailsAreValid = (
  username,
  password,
  fullname,
  street,
  postal,
  city
) => {
  return (
    userCredentialsAreValid(username, password) &&
    !isEmpty(fullname) &&
    !isEmpty(street) &&
    !isEmpty(postal) &&
    !isEmpty(city)
  );
};

const passwordIsConfirmed = (password, confirmPassword) => {
  return password === confirmPassword;
};

module.exports = { userDetailsAreValid, passwordIsConfirmed };
