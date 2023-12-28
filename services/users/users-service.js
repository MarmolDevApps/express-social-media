const bcrypt = require('bcrypt');
const { isSouthOrNorth } = require('../../utils/geoLocation');

/**
 * Gets the business logic parameters in the header parameters.
 *  @param {Object[]} headersParams Object Headers params
 *  @returns {Object} Object with latitude, longitude and language params
 */
const getUserParamsHeader = (headersParams) => {
  const latitude = headersParams['x-user-latitude'];
  const longitude = headersParams['x-user-longitude'];
  const language = headersParams['x-user-language'];
  if (!latitude || !longitude || !language) {
    console.error('ERROR: usersService.getUserParamsHeader:', err.message);
  }
  return { latitude, longitude, language };
};

/**
 * Indicates whether the user is saved in our database or in a third-party API based on geolocation.
 *  @param {Object[]} headersParams Object Headers params
 *  @returns {Promise<boolean>} Indicates whether the user is saved in a local database or in a third-party API
 */
const isLocalUser = async (headersParams) => {
  try {
    const latitude = headersParams['x-user-latitude'];
    const longitude = headersParams['x-user-longitude'];

    const isStoredLocally = (await isSouthOrNorth(latitude, longitude)) === 'N';

    return isStoredLocally;
  } catch (err) {
    console.error('ERROR: usersService.isLocalUser:', err.message);
    throw new Error(err);
  }
};

/**
 * Encrypt the password string with the bcrypt library.
 *  @param {string} password String to encrypt
 *  @returns {Promise<string>} Hashed string
 */
const encryptPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  const hashed_password = await bcrypt.hash(password, salt);
  return hashed_password;
};

module.exports = {
  getUserParamsHeader,
  isLocalUser,
  encryptPassword,
};
