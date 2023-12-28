const db = require('../../lib/db');

/**
 * Insert a new user in our database.
 *  @param {Object} { username, email, password, latitude, longitude, language } Object User params
 *  @returns {Promise<number>} Number Id
 */
const insertUser = async ({ username, email, password, latitude, longitude, language }) => {
  try {
    const dbClient = await db.getClient();

    const sql =
      'INSERT INTO users (username, email, password, latitude, longitude, language) VALUES (?, ?, ?, ?, ?, ?)';
    const params = [username, password, email, latitude, longitude, language];

    const result = await dbClient.run(sql, params);
    if (!result.lastID) {
      throw new Error('db not return new item');
    }

    return result.lastID;
  } catch (err) {
    throw err;
  }
};

/**
 * Update a user in our database.
 *  @param {Object} fieldsToUpdate Object Update User params {latitude, longitide, language}
 *  @param {number} userId User id
 *  @returns {Promise<boolean>} Indicates success operation
 */
const updateUser = async (fieldsToUpdate, userId) => {
  try {
    const dbClient = await db.getClient();

    const sqlSegments = fieldsToUpdate.map(([field]) => `${field} = ?`).join(', ');
    const sql = `UPDATE users SET ${sqlSegments}, updated_at = CURRENT_TIMESTAMP WHERE id = ?`;

    const params = fieldsToUpdate.map(([, value]) => value);
    params.push(userId);

    const result = await dbClient.run(sql, params);
    if (result.changes === 0) {
      throw new Error(`User not found with id: ${userId}`);
    }
    return true;
  } catch (err) {
    throw err;
  }
};

/**
 * Get a user with the id in our database.
 *  @param {number} userId User id
 *  @returns {Promise<Object>} User object
 */
const getUserById = async (userId) => {
  try {
    const dbClient = await db.getClient();

    const sql = `SELECT * FROM users WHERE id = ?`;
    const params = [userId];

    const result = await dbClient.get(sql, params);

    return result;
  } catch (err) {
    throw err;
  }
};

/**
 * Delete a user with the id in our database.
 *  @param {number} userId User id
 *  @returns {Promise<boolean>} Indicates success operation
 */
const deleteUser = async (userId) => {
  try {
    const dbClient = await db.getClient();

    const sql = `DELETE FROM users WHERE id = ?`;
    const params = [userId];

    const result = await dbClient.run(sql, params);
    if (result.changes === 0) {
      throw new Error(`User not found with id: ${userId}`);
    }

    return true;
  } catch (err) {
    throw err;
  }
};

module.exports = {
  insertUser,
  updateUser,
  getUserById,
  deleteUser,
};
