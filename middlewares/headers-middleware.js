const LANGUAGE_DEFAULT = 'en';
/**
 * Middleware to intercept the user headers.
 * If you do not provide the latitude, longitude the request will be rejected. Assuming this is the business context and is considered blocking. Language default is english
 *  @param {object} request Object Express
 *  @param {object} response Object Express
 *  @param {function} next Function Express
 */
const headersMiddleware = (req, res, next) => {
  try {
    const latitude = req.headers['x-user-latitude'];
    const longitude = req.headers['x-user-longitude'];
    const language = req.headers['x-user-language'];

    if (!latitude || !longitude) throw new Error('Invalid headers provided');
    if (!language) req.headers['x-user-language'] = LANGUAGE_DEFAULT;

    next();
  } catch (error) {
    console.error('ERROR: userHeadersMiddleware:', error.message);
    error.status = 400;
    error.message = 'Invalid headers provided';
    next(error);
  }
};

module.exports = headersMiddleware;
