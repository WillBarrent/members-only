const bcrypt = require("bcrypt");

async function hashPassword(password) {
  const hashedPassword = await bcrypt.hash(password, 10);
  console.log(hashedPassword);
  return hashedPassword;
}

async function validatePassword(password, userPassword) {
  const match = bcrypt.compare(userPassword, password);
  return match;
}

module.exports = { hashPassword, validatePassword };
