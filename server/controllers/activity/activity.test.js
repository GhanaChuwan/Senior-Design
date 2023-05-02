const Activity = require("../models/activity");
const Subject = require("../models/subject");
const ActivitySession = require("../models/activitySessions");
const User = require("../models/user");

beforeAll(async () => {
  mongoServer = new MongoMemoryServer();
  const mongoUri = await mongoServer.getUri();
  await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  });
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe("createActivity", () => {
  let subjectId, userId;

  beforeEach(async () => {
    const subject = await Subject.create({ name: "Math" });
    const user = { userId: mongoose.Types.ObjectId() };

    subjectId = subject._id;
    userId = user.userId;
  });

  afterEach(async () => {
    await Subject.deleteMany({});
    await Activity.deleteMany({});
  });

  it("creates an activity with valid data", async () => {
    const data = {
      name: "Activity 1",
      color: "#ffffff",
      description: "This is activity 1",
      subjectId: subjectId.toString(),
    };
    const res = await request(app)
      .post("/activities")
      .send(data)
      .set("Authorization", `Bearer ${userId}`);

    expect(res.status).toBe(201);
    expect(res.body.name).toBe(data.name);
    expect(res.body.color).toBe(data.color);
    expect(res.body.description).toBe(data.description);

    const subject = await Subject.findById(subjectId);
    expect(subject.activities).toContain(res.body._id);
  });

  it("returns an error when subject does not exist", async () => {
    const data = {
      name: "Activity 1",
      color: "#ffffff",
      description: "This is activity 1",
      subjectId: mongoose.Types.ObjectId().toString(),
    };
    const res = await request(app)
      .post("/activities")
      .send(data)
      .set("Authorization", `Bearer ${userId}`);

    expect(res.status).toBe(400);
    expect(res.body.success).toBe(false);
    expect(res.body.message).toBe("failed to create activity");
  });

  it("returns an error when data is invalid", async () => {
    const data = {
      color: "#ffffff",
      subjectId: subjectId.toString(),
    };
    const res = await request(app)
      .post("/activities")
      .send(data)
      .set("Authorization", `Bearer ${userId}`);

    expect(res.status).toBe(400);
    expect(res.body.success).toBe(false);
    expect(res.body.message).toBeTruthy();
  });
});
describe("deleteActivity", () => {
  let subjectId, activityId, userId;

  beforeEach(async () => {
    const subject = await Subject.create({ name: "Math" });
    const activity = await Activity.create({
      name: "Activity 1",
      color: "#ffffff",
      description: "This is activity 1",
      createdBy: mongoose.Types.ObjectId(),
      createdAt: Date.now(),
    });

    const activitySession = await ActivitySession.create({
      activity: activity._id,
      startTime: Date.now(),
      endTime: Date.now(),
    });

    subject.activities.push(activity._id);
    await subject.save();

    subjectId = subject._id;
    activityId = activity._id;
    userId = mongoose.Types.ObjectId();
  });

  afterEach(async () => {
    await Subject.deleteMany({});
    await Activity.deleteMany({});
    await ActivitySession.deleteMany({});
  });

  it("deletes an activity with valid data", async () => {
    const data = {
      subjectId: subjectId.toString(),
      activityId: activityId.toString(),
    };
    const res = await request(app)
      .delete("/activities")
      .send(data)
      .set("Authorization", `Bearer ${userId}`);

    expect(res.status).toBe(200);
    expect(res.body._id).toBe(activityId.toString());

    const subject = await Subject.findById(subjectId);
    expect(subject.activities).not.toContain(activityId);

    const activity = await Activity.findById(activityId);
    expect(activity).toBeNull();

    const activitySessions = await ActivitySession.find({
      activity: activityId,
    });
    expect(activitySessions).toHaveLength(0);
  });

  it("returns an error when subject does not exist", async () => {
    const data = {
      subjectId: mongoose.Types.ObjectId().toString(),
      activityId: activityId.toString(),
    };
    const res = await request(app)
      .delete("/activities")
      .send(data)
      .set("Authorization", `Bearer ${userId}`);

    expect(res.status).toBe(409);
    expect(res.body.success).toBe(false);
    expect(res.body.message).toBeTruthy();
  });

  it("returns an error when activity does not exist", async () => {
    const data = {
      subjectId: subjectId.toString(),
      activityId: mongoose.Types.ObjectId().toString(),
    };
    const res = await request(app)
      .delete("/activities")
      .send(data)
      .set("Authorization", `Bearer ${userId}`);

    expect(res.status).toBe(409);
    expect(res.body.success).toBe(false);
    expect(res.body.message).toBeTruthy();
  });
});
