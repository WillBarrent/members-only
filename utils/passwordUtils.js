async function genPassword(password) {
  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  return hashedPassword;
}

async function validPassword(password, userPassword) {
  const match = await bcrypt.compare(password, userPassword);
  return match;
}

module.exports = { genPassword, validPassword };
