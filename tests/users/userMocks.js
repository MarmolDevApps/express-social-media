module.exports = {
  northernUser: {
    headers: {
      ['x-user-latitude']: 30.0,
      ['x-user-longitude']: 2.0,
      ['x-user-language']: 'en',
    },
    body: {
      username: 'Marmol',
      password: '12345',
      email: 'marmol@gmail.com',
    },
  },

  southernUser: {
    headers: {
      ['x-user-latitude']: -30.0,
      ['x-user-longitude']: 2.0,
      ['x-user-language']: 'en',
    },
    body: {
      username: 'MarmolB',
      password: '12345',
      email: 'marmolB@gmail.com',
    },
  },
  wrongParamsUser: {
    headers: {
      ['x-user-latitude']: 30.0,
      ['x-user-longitude']: 2.0,
      ['x-user-language']: 'en',
    },
    body: {
      password: '12345',
      email: 'marmol@gmail.com',
    },
  },
};
