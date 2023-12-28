const USERS = [];

/**
 * Insert a new user in in the supposed third party API.
 *  @param {Object} { username, email, password, latitude, longitude, language } Object User params
 *  @returns {Promise<number>} Number Id
 */
const insertUser = ({ username, email, password, latitude, longitude, language }) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const userExist = USERS.find((u) => u.username === username || u.email === email);
      if (userExist) {
        return reject('usersSouthernAPIService.insertUser:  User exists');
      }

      const newId = USERS.length + 1;
      const newUser = {
        id: newId,
        username,
        email,
        password,
        latitude,
        longitude,
        language,
        created_at: new Date(),
        updated_at: new Date(),
      };
      USERS.push(newUser);

      resolve(newId);
    }, 1000);
  });
};

/**
 * Update a user in in the supposed third party API.
 *  @param {Object} fieldsToUpdate Object Update User params  {latitude, longitide, language}
 *  @param {number} userId User id
 *  @returns {Promise<boolean>} Indicates success operation
 */
const updateUser = (fieldsToUpdate, userId) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const idxUser = USERS.findIndex((u) => u.id == userId);
      if (idxUser === -1) {
        return reject('usersSouthernAPIService.updateUser:  User not found');
      }

      //Array to object. The logic could be improved but I show use of reduce and adapt the input arguments as the users-db-service.
      const params = fieldsToUpdate.reduce((a, v) => ({ ...a, [v[0]]: v[1] }), {});
      USERS[idxUser] = { ...USERS[idxUser], ...params, updated_at: new Date() };

      resolve(true);
    }, 1000);
  });
};

/**
 * Get a user with the id in the supposed third party API.
 *  @param {number} userId User id
 *  @returns {Promise<Object>} User object
 */
const getUserById = (userId) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const idxUser = USERS.findIndex((u) => u.id == userId);
      if (idxUser === -1) {
        return reject('usersSouthernAPIService.updateUser:  User not found');
      }

      resolve(USERS[idxUser]);
    }, 1000);
  });
};

/**
 * Delete a user with the id in the supposed third party API.
 *  @param {number} userId User id
 *  @returns {Promise<boolean>} Indicates success operation
 */
const deleteUser = (userId) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const idxUser = USERS.findIndex((u) => u.id == userId);
      if (idxUser === -1) {
        return reject('usersSouthernAPIService.deleteUser:  User not found');
      }

      USERS.splice(idxUser, 1);
      resolve(true);
    }, 1000);
  });
};

module.exports = {
  insertUser,
  updateUser,
  getUserById,
  deleteUser,
};
