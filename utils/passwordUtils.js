const bcrypt = require("bcrypt");

async function hashPassword(password) {
  const hashedPassword = await bcrypt.hash(password, 10);
  return hashedPassword;
}

async function validatePassword(password, userPassword) {
  const match = await bcrypt.compare(password, userPassword);
  return match;
}

module.exports = { hashPassword, validatePassword };
