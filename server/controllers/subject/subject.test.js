// const request = require("supertest");
// const app = require("../app");
const mongoose = require("mongoose");
const Subject = require("../models/subject");
const User = require("../models/user");

describe("createSubject", () => {
  const { userId } = req.user;
  beforeAll(async () => {
    connect = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    const user = await User.findById(userId);

    user = await User.create({
      email: email,
      password:password,
    });
  });

  afterAll(async () => {
    await User.deleteMany({});
    await Subject.deleteMany({});
    await mongoose.disconnect();
  });

  it("should create a subject and associate it with the user", async () => {
    const response = await request(app)
      .post("/subjects")
      .send({ name: "Math", color: "red" })
      .set("Authorization", `Bearer ${user.generateAuthToken()}`);

    expect(response.status).toBe(201);
    expect(response.body.name).toBe("Math");
    expect(response.body.color).toBe("red");

    const subject = await Subject.findById(response.body._id);
    expect(subject.name).toBe("Math");
    expect(subject.color).toBe("red");
    expect(subject.createdBy.toString()).toBe(user._id.toString());

    const updatedUser = await User.findById(user._id);
    expect(updatedUser.subjects).toContainEqual(subject._id.toString());
  });

  it("should return an error if the request is missing a name or color", async () => {
    const response = await request(app)
      .post("/subjects")
      .send({})
      .set("Authorization", `Bearer ${user.generateAuthToken()}`);

    expect(response.status).toBe(400);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toMatch(/name.+required/);
  });
});
