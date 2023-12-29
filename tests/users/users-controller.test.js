const userMocks = require('./userMocks');
const db = require('../../lib/db');
const {
  createUser,
  getUserById,
  getUserByUsername,
  updateUser,
  deleteUser,
} = require('../../controllers/users-controller'); // Importa las funciones que deseas probar
const mockRequest = () => {
  const req = {};
  req.body = {};
  req.headers = {};
  req.params = {};
  return req;
};
const mockResponse = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

let clearedDB = false;
beforeAll(async () => {
  if (!clearedDB) {
    const dbClient = await db.getClient();
    await dbClient.exec('DELETE FROM friendships');
    await dbClient.exec('DELETE FROM users');
    console.log('\tDatabase cleared!');
    clearedDB = true;
  }
});

let idNorthernUser;

describe('Users Controller Integration Tests', () => {
  let req, res;

  beforeEach(async () => {
    req = mockRequest();
    res = mockResponse();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('Create user', () => {
    describe('Create a new user in Northern hemisphere', () => {
      it('it should create a new user in Northern hemisphere and return 201', async () => {
        req.headers = { ...req.headers, ...userMocks.northernUser.headers };
        req.body = { ...req.body, ...userMocks.northernUser.body };

        await createUser(req, res);

        expect(res.status).toHaveBeenCalledWith(201);
      });
    });

    describe('Create a new user in the shouthern hemisphere', () => {
      it('it should create a new user in shouthern hemisphere and return 201', async () => {
        req.headers = { ...req.headers, ...userMocks.southernUser.headers };
        req.body = { ...req.body, ...userMocks.southernUser.body };

        await createUser(req, res);

        expect(res.status).toHaveBeenCalledWith(201);
      });
    });

    describe('Create a new user with the same email', () => {
      it('it should create a new user with the same params', async () => {
        req.headers = { ...req.headers, ...userMocks.southernUser.headers };
        req.body = { ...req.body, ...userMocks.southernUser.body };

        await createUser(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
      });
    });

    describe('Create a new user with wrongs params', () => {
      it('it should has a status code 400 with error this field are mandatory', async () => {
        req.headers = { ...req.headers, ...userMocks.wrongParamsUser.headers };
        req.body = { ...req.body, ...userMocks.wrongParamsUser.body };

        await createUser(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
      });
    });

    describe('Create a new user with wrongs headers params', () => {
      it('it should has a status code 400 with error headers params (latitude, longitude and language) are mandatory', async () => {
        req.body = { ...req.body, ...userMocks.southernUser.body };

        await createUser(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
      });
    });
  });

  describe('Update user', () => {
    describe('Update a user in Northern hemisphere', () => {
      it('it should update a user in Northern hemisphere and return 200', async () => {
        req.headers = { ...req.headers, ...userMocks.southernUser.headers };
        req.params.id = 1;

        await updateUser(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
      });
    });

    describe('Update a user in the shouthern hemisphere', () => {
      it('it should update a user in the shouthern hemisphere and return 200', async () => {
        req.headers = { ...req.headers, ...userMocks.southernUser.headers };
        req.params.id = 1;

        await updateUser(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
      });
    });

    describe('Update a new user withoud userId param', () => {
      it('it should has a status code 400 with error userId not received', async () => {
        req.headers = { ...req.headers, ...userMocks.southernUser.headers };

        await createUser(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
      });
    });

    describe('Update a user with wrongs headers params', () => {
      it('it should has a status code 400 with error headers params (latitude, longitude and language) are mandatory', async () => {
        req.params.id = 1;

        await createUser(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
      });
    });
  });

  describe('Get user by Id', () => {
    describe('Get a user by id in Northern hemisphere', () => {
      it('it should get a user by id in Northern hemisphere and return 200', async () => {
        req.headers = { ...req.headers, ...userMocks.southernUser.headers };
        req.params.id = 1;

        await getUserById(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
      });
    });

    describe('Get a user by id in the shouthern hemisphere', () => {
      it('it should get a user by id in the shouthern hemisphere and return 200', async () => {
        req.headers = { ...req.headers, ...userMocks.southernUser.headers };
        req.params.id = 1;

        await getUserById(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
      });
    });

    describe('Get a user withoud userId param', () => {
      it('it should has a status code 400 with error userId not received', async () => {
        req.headers = { ...req.headers, ...userMocks.southernUser.headers };

        await getUserById(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
      });
    });

    describe('Update a user with wrongs headers params', () => {
      it('it should has a status code 400 with error headers params (latitude, longitude and language) are mandatory', async () => {
        req.params.id = 1;

        await getUserById(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
      });
    });
  });

  describe('Get user by Username', () => {
    describe('Get a user by Username in Northern hemisphere', () => {
      it('it should get a user by Username in Northern hemisphere and return 200', async () => {
        req.headers = { ...req.headers, ...userMocks.northernUser.headers };
        req.params.username = userMocks.northernUser.body.username;

        await getUserByUsername(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
      });
    });

    describe('Get a user by Username in the shouthern hemisphere', () => {
      it('it should get a user by Username in the shouthern hemisphere and return 200', async () => {
        req.headers = { ...req.headers, ...userMocks.southernUser.headers };
        req.params.username = userMocks.southernUser.body.username;

        await getUserByUsername(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
      });
    });

    describe('Get a user withoud Username param', () => {
      it('it should has a status code 400 with error Username not received', async () => {
        req.headers = { ...req.headers, ...userMocks.southernUser.headers };

        await getUserByUsername(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
      });
    });

    describe('Update a user with wrongs headers params', () => {
      it('it should has a status code 400 with error headers params (latitude, longitude and language) are mandatory', async () => {
        req.params.username = userMocks.southernUser.body.username;

        await getUserByUsername(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
      });
    });
  });

  describe('Delete user', () => {
    describe('Delete a user by id in the shouthern hemisphere', () => {
      it('it should Delete a user by id in the shouthern hemisphere and return 200', async () => {
        req.headers = { ...req.headers, ...userMocks.southernUser.headers };
        req.params.id = 1;

        await deleteUser(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
      });
    });

    describe('Delete a user withoud userId param', () => {
      it('it should has a status code 400 with error userId not received', async () => {
        req.headers = { ...req.headers, ...userMocks.southernUser.headers };

        await deleteUser(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
      });
    });

    describe('Update a user with wrongs headers params', () => {
      it('it should has a status code 400 with error headers params (latitude, longitude and language) are mandatory', async () => {
        req.params.id = 1;

        await deleteUser(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
      });
    });
  });
});
