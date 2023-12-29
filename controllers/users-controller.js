const usersDBService = require('../services/users/users-db-service');
const usersSouthernAPIService = require('../services/users/users-southernapi-service');
const usersService = require('../services/users/users-service');

/**
 * Create a new User operation.
 *  @param {Object} req Object Request Express
 *  @param {Object} res Object Response Express
 *  @returns {Promise<Object>} Response Express with the operation resulkt
 */
const createUser = async (req, res) => {
  try {
    const { latitude, longitude, language } = usersService.getUserParamsHeader(req.headers);
    const { username, email, password } = req.body;
    const isLocalUser = await usersService.isLocalUser(req.headers);

    if (!username || !password || !email || !latitude || !longitude || !language) {
      return res.status(400).json({
        error: 'This fields (username, password, email) are mandatory',
      });
    }

    const hashPassword = await usersService.encryptPassword(password);

    const paramsUser = {
      username,
      email,
      password: hashPassword,
      latitude,
      longitude,
      language,
    };
    const result = isLocalUser
      ? await usersDBService.insertUser(paramsUser)
      : await usersSouthernAPIService.insertUser(paramsUser);

    return res.status(201).json({ id: result });
  } catch (err) {
    console.error(err?.message ?? err, { correlationId: req.correlationId });
    return res.status(400).json({ error: 'Error creating user' });
  }
};

/**
 * Update User operation.
 *  @param {Object} req Object Request Express
 *  @param {Object} res Object Response Express
 *  @returns {Promise<Object>} Response Express with the operation resulkt
 */
const updateUser = async (req, res) => {
  try {
    const { latitude, longitude, language } = usersService.getUserParamsHeader(req.headers);
    const isLocalUser = await usersService.isLocalUser(req.headers);
    const userId = req.params.id;
    const fields = {
      latitude,
      longitude,
      language,
    };
    const nonNullFields = Object.entries(fields).filter(([_, value]) => !!value);
    if (!nonNullFields.length) {
      return res.status(400).json({ error: `No parameters have been received to update` });
    }
    if (!userId) {
      return res.status(400).json({ error: `userId not received` });
    }

    const result = isLocalUser
      ? await usersDBService.updateUser(nonNullFields, userId)
      : await usersSouthernAPIService.updateUser(nonNullFields, userId);

    return res.status(200).json({ success: result });
  } catch (err) {
    console.error(err?.message ?? err, { correlationId: req.correlationId });
    return res.status(400).json({ error: 'Error updating user' });
  }
};

/**
 * Get a User by Id operation.
 *  @param {Object} req Object Request Express
 *  @param {Object} res Object Response Express
 *  @returns {Promise<Object>} Response Express with the operation resulkt
 */
const getUserById = async (req, res) => {
  try {
    const isLocalUser = await usersService.isLocalUser(req.headers);
    const userId = req.params.id;

    if (!userId) {
      return res.status(400).json({ error: `userId not received` });
    }

    const user = isLocalUser
      ? await usersDBService.getUserById(userId)
      : await usersSouthernAPIService.getUserById(userId);

    if (!user) {
      return res.status(404).json({ error: `User not found with id: ${userId}` });
    }

    const { password, ...userWithoutPassword } = user;

    return res.status(200).json(userWithoutPassword);
  } catch (err) {
    console.error(err?.message ?? err, { correlationId: req.correlationId });
    return res.status(400).json({ error: 'Error getting user' });
  }
};

/**
 * Get a User by Username operation.
 *  @param {Object} req Object Request Express
 *  @param {Object} res Object Response Express
 *  @returns {Promise<Object>} Response Express with the operation resulkt
 */
const getUserByUsername = async (req, res) => {
  try {
    const isLocalUser = await usersService.isLocalUser(req.headers);
    const username = req.params.username;

    if (!username) {
      return res.status(400).json({ error: `username not received` });
    }

    const user = isLocalUser
      ? await usersDBService.getUserByUsername(username)
      : await usersSouthernAPIService.getUserByUsername(username);

    if (!user) {
      return res.status(404).json({ error: `User not found with username: ${username}` });
    }

    const { password, ...userWithoutPassword } = user;

    return res.status(200).json(userWithoutPassword);
  } catch (err) {
    console.error(err?.message ?? err, { correlationId: req.correlationId });
    return res.status(400).json({ error: 'Error getting user' });
  }
};

/**
 * Delete a User operation.
 *  @param {Object} req Object Request Express
 *  @param {Object} res Object Response Express
 *  @returns {Promise<Object>} Response Express with the operation resulkt
 */
const deleteUser = async (req, res) => {
  try {
    const isLocalUser = await usersService.isLocalUser(req.headers);
    const userId = req.params.id;
    if (!userId) {
      return res.status(400).json({ error: `userId not received` });
    }

    const result = isLocalUser
      ? await usersDBService.deleteUser(userId)
      : await usersSouthernAPIService.deleteUser(userId);

    return res.status(200).json({ success: result });
  } catch (err) {
    console.error(err?.message ?? err, { correlationId: req.correlationId });
    return res.status(400).json({ error: 'Error deleting user' });
  }
};

module.exports = {
  createUser,
  updateUser,
  getUserById,
  getUserByUsername,
  deleteUser,
};
