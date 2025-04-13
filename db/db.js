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

async function giveMembership(userId) {
  await pool.query("UPDATE users SET membership = true WHERE id = $1", [
    userId,
  ]);
}

async function isUserTheMember(userId) {
  const { rows: user } = await pool.query(
    "SELECT membership FROM users WHERE id = $1",
    [userId]
  );

  if (user[0]["membership"] === true) {
    return true;
  }

  return false;
}

async function getUserName(userId) {
  const { rows: user } = await pool.query(
    "SELECT username FROM users WHERE id = $1",
    [userId]
  );

  return user[0]["username"];
}

async function createNewMessage(title, message, added, authorId) {
  await pool.query(
    "INSERT INTO messages (author_id, title, text, added) VALUES ($1, $2, $3, $4)",
    [authorId, title, message, added]
  );
}

module.exports = {
  doesUserExist,
  createUser,
  giveMembership,
  isUserTheMember,
  getUserName,
  createNewMessage,
};
