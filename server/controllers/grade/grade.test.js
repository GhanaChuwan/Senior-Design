const mongoose = require("mongoose");
const Grade = require("../../models/grade");
const Subject = require("../../models/subject");
const User = require("../../models/user");

const {
    createGrade,
    getAllGrades,
    deleteGrade,
} = require("../gradesController");

describe("gradesController", () => {
    beforeAll(async () => {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true,
        });
    });

    afterAll(async () => {
        await mongoose.connection.close();
    });

    describe("createGrade", () => {
        it("should create a new grade", async () => {
            const req = {
                body: {
                    gradeName: "Test Grade",
                    gradeType: "Test Type",
                    gradePoints: 90,
                    subjectId: "60c5b0081e2d5c5c71938177",
                },
                user: {
                    userId: "60c5b0081e2d5c5c71938177",
                },
            };
            const res = {
                status: jest.fn(() => res),
                json: jest.fn(),
            };

            await createGrade(req, res);

            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith(expect.any(Object));
        });

        it("should return an error if subject does not exist", async () => {
            const req = {
                body: {
                    gradeName: "Test Grade",
                    gradeType: "Test Type",
                    gradePoints: 90,
                    subjectId: "invalid_id",
                },
                user: {
                    userId: "60c5b0081e2d5c5c71938177",
                },
            };
            const res = {
                status: jest.fn(() => res),
                json: jest.fn(),
            };

            await createGrade(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({
                success: false,
                message: "failed to create Grade",
            });
        });
    });

    describe("getAllGrades", () => {
        it("should return a list of all grades for a subject", async () => {
            const req = {
                body: {
                    subjectId: "60c5b0081e2d5c5c71938177",
                },
                user: {
                    userId: "60c5b0081e2d5c5c71938177",
                },
            };
            const res = {
                status: jest.fn(() => res),
                json: jest.fn(),
            };

            await getAllGrades(req, res);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(expect.any(Array));
        });

        it("should return an error if subject does not exist", async () => {
            const req = {
                body: {
                    subjectId: "invalid_id",
                },
                user: {
                    userId: "60c5b0081e2d5c5c71938177",
                },
            };
            const res = {
                status: jest.fn(() => res),
                json: jest.fn(),
            };

            await getAllGrades(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith(expect.any(Object));
        });
    });

    describe('deleteGrade function', () => {
        let req;
        let res;

        beforeEach(() => {
            req = {
                body: {
                    subjectId: 'subject1',
                    grade: {
                        _id: 'grade1',
                    },
                },
                user: {
                    userId: 'user1',
                },
            };
            res = {
                status: jest.fn(() => res),
                json: jest.fn(),
            };
        });

        afterEach(() => {
            jest.resetAllMocks();
        });

        it('should delete a grade from the subject and return the updated list of grades', async () => {
            const subject = new Subject({
                _id: 'subject1',
                name: 'Math',
                createdBy: 'user1',
                grades: ['grade1', 'grade2', 'grade3'],
            });
            const grade = new Grade({
                _id: 'grade1',
                gradeName: 'Test 1',
                gradeType: 'exam',
                gradePoints: 90,
                createdBy: 'user1',
            });
            jest.spyOn(Subject, 'findOne').mockResolvedValue(subject);
            jest.spyOn(Subject.prototype, 'save').mockResolvedValue();
            jest.spyOn(Grade, 'findByIdAndDelete').mockResolvedValue(grade);
            jest.spyOn(Grade, 'findById').mockResolvedValue(grade);

            await deleteGrade(req, res);

            expect(Grade.findByIdAndDelete).toHaveBeenCalledWith('grade1');
            expect(subject.grades).not.toContain('grade1');
            expect(Grade.findById).toHaveBeenCalledTimes(2);
            expect(Grade.findById).toHaveBeenCalledWith('grade2');
            expect(Grade.findById).toHaveBeenCalledWith('grade3');
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith([grade, grade]);
        });

        it('should return an error message if the subject does not exist', async () => {
            jest.spyOn(Subject, 'findOne').mockResolvedValue(null);

            await deleteGrade(req, res);

            expect(Subject.findOne).toHaveBeenCalledWith({
                name: 'subject1',
                createdBy: 'user1',
            });
            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({
                success: false,
                message: 'Subject not found',
            });
        });

        it('should return an error message if the grade does not exist', async () => {
            jest.spyOn(Subject, 'findOne').mockResolvedValue({});
            jest.spyOn(Grade, 'findByIdAndDelete').mockResolvedValue(null);

            await deleteGrade(req, res);

            expect(Grade.findByIdAndDelete).toHaveBeenCalledWith('grade1');
            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({
                success: false,
                message: 'Grade not found',
            });
        });

        it('should return an error message if there is an error', async () => {
            jest.spyOn(Subject, 'findOne').mockRejectedValue(new Error('Database error'));

            await deleteGrade(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({
                success: false,
                message: 'Database error',
            });
        });
    });



});