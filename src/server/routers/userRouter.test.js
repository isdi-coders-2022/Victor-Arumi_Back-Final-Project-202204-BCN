const request = require("supertest");
const { MongoMemoryServer } = require("mongodb-memory-server");
const { default: mongoose } = require("mongoose");
const connectDB = require("../../database");
const app = require("..");
const User = require("../../database/models/User");

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  await connectDB(mongoServer.getUri());
});

afterEach(async () => {
  await User.deleteMany({});
});

afterAll(async () => {
  await mongoose.connection.close();
  await mongoServer.stop();
});

const newUserData = {
  username: "testusername",
  password: "newpassword",
  name: "testname",
  profilePicture: "testpicture.jpg",
};

describe("Given a POST /users/register/ endpoint", () => {
  describe("When it receives a request with a valid new user", () => {
    test("Then it should respond with 201 status code", async () => {
      await request(app).post("/user/register").send(newUserData).expect(201);
    });
  });

  describe("When it receives a request with a wrong new user", () => {
    test("Then it should respond with 400 status code and the created user", async () => {
      const badNewUserData = {
        username: "testusername",
        wrongproperty: "newpassword",
        name: "newname",
      };

      await request(app)
        .post("/user/register")
        .send(badNewUserData)
        .expect(400);
    });
  });

  describe("When it receives a request with a user that already exists", () => {
    test("Then it should respond with 409 status code", async () => {
      await User.create(newUserData);

      await request(app).post("/user/register").send(newUserData).expect(409);
    });
  });
});

describe("Given a POST /users/login/ endpoint", () => {
  describe("When it receives a request with an existing user and it's right password", () => {
    test("Then it should respond with a 200 status code", async () => {
      await request(app).post("/user/register").send(newUserData).expect(201);

      await request(app).post("/user/login").send(newUserData).expect(200);
    });
  });

  describe("When it receives a request with a wrong username", () => {
    test("Then it should respond with a 403 status code", async () => {
      await request(app).post("/user/register").send(newUserData).expect(201);

      await request(app)
        .post("/user/login")
        .send({
          username: "wrongUsername",
          password: newUserData.password,
          name: newUserData.name,
        })
        .expect(403);
    });
  });

  describe("When it receives a request with a wrong password", () => {
    test("Then it should respond with a 403 status code", async () => {
      await request(app).post("/user/register").send(newUserData).expect(201);

      await request(app)
        .post("/user/login")
        .send({
          username: newUserData.username,
          password: "wrong password",
          name: newUserData.name,
        })
        .expect(403);
    });
  });

  describe("When it receives a request with wrong properties", () => {
    test("Then it should respond with a 400 status code", async () => {
      await request(app).post("/user/register").send(newUserData).expect(201);

      await request(app)
        .post("/user/login")
        .send({ wrong: "wrong" })
        .expect(400);
    });
  });
});