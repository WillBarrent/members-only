const pool = require("./pool");

async function doesUserExist(username) {
  const { rows } = await pool.query("SELECT * FROM users WHERE username = $1", [
    username,
  ]);

  return rows.length === 0;
}

async function createUser(firstName, lastName, username, password) {
  if (!(await doesUserExist(username))) {
    return false;
  }

  await pool.query(
    "INSERT INTO users (firstName, lastName, username, password) VALUES ($1, $2, $3, $4)",
    [firstName, lastName, username, password]
  );

  return true;
}

module.exports = {
  doesUserExist,
  createUser,
};
