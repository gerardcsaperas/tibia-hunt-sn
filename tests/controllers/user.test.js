const request = require("supertest");
const app = require("../../test.app");
// Mocks
// For now, we'll just write every document...

// Database
const mongoose = require("mongoose");
const User = require("../../api/models/user");

describe("User Controller Tests", () => {
    describe("Integration Tests", () => {

        beforeAll( async () => {
            mongoose.set('useNewUrlParser', true);
			mongoose.set('useFindAndModify', false);
			mongoose.set('useCreateIndex', true);
			mongoose.set('useUnifiedTopology', true);
            connection = await mongoose.connect(`mongodb://${process.env.DB_TEST_HOST}/${process.env.DB_TEST_NAME}`);
            console.log(process.env.API_URL)
        })

        afterEach( async () => {
            await User.deleteMany();
        })

        afterAll(() => {
            jest.restoreAllMocks();
        });
        
        describe("POST Users", () => {
            test("If I provide the correct data, I can post a User", async () => {
                const user = {
                    _id: "601cee4eb153381684e36dad",
                    username: "Test",
                    email: "test@gmail.com",
                    password: "test1234",
                }
                const response = await request(app).post(`/TibiaHuntingRecords_Api/user`).send(user);
                expect(response.status).toEqual(201);
                expect(response.body).toHaveProperty("user");
                expect(response.body).toHaveProperty("token");
            })

            test("I shouldn't be able to post two users with the same email", async () => {
                
                const user = {
                    _id: "601cee4eb153381684e36dad",
                    username: "Test",
                    email: "test@gmail.com",
                    password: "test1234",
                }

                const userOne = new User(user);
                await userOne.save();

                const userWithSameEmail = {
                    username: "userWithSameEmail",
                    email: "test@gmail.com",
                    password: "test1234",
                }

                const response = await request(app).post(`/TibiaHuntingRecords_Api/user`).send(userWithSameEmail);
                expect(response.status).toEqual(400);
                expect(response.body).toHaveProperty("message", "There was an error saving your user. Error: User validation failed: email: The specified email address is already in use.");
            })

            test("I shouldn't be able to post two users with the same username", async () => {
                const user = {
                    _id: "601cee4eb153381684e36dad",
                    username: "Test",
                    email: "test@gmail.com",
                    password: "test1234",
                }

                const userOne = new User(user);
                await userOne.save();

                const userWithSameUsername = {
                    username: "Test",
                    email: "different@gmail.com",
                    password: "test1234",
                }
                
                const response = await request(app).post(`/TibiaHuntingRecords_Api/user`).send(userWithSameUsername);
                expect(response.status).toEqual(400);
                expect(response.body).toHaveProperty("message", "There was an error saving your user. Error: User validation failed: username: The specified username already exists.")
            })

            test("I shouldn't be able to create a user without providing a username", async () => {
                const user = {
                    email: "different@gmail.com",
                    password: "test1234",
                }

                const response = await request(app).post(`/TibiaHuntingRecords_Api/user`).send(user);
                expect(response.status).toEqual(400);
                expect(response.body).toHaveProperty("message", "There was an error saving your user. Error: User validation failed: username: Path `username` is required.");
            })

            test("I shouldn't be able to create a user without providing an email", async () => {
                const user = {
                    username: "Test",
                    password: "test1234",
                }

                const response = await request(app).post(`/TibiaHuntingRecords_Api/user`).send(user);
                expect(response.status).toEqual(400);
                expect(response.body).toHaveProperty("message", "There was an error saving your user. Error: User validation failed: email: Path `email` is required.");
            })

            test("I shouldn't be able to create a user without providing a password", async () => {
                const user = {
                    username: "Test",
                    email: "test@gmail.com",
                }

                const response = await request(app).post(`/TibiaHuntingRecords_Api/user`).send(user);
                expect(response.status).toEqual(400);
                expect(response.body).toHaveProperty("message", "There was an error saving your user. Error: User validation failed: password: Path `password` is required.");
            })

            test("I shouldn't be able to create a user whose password length is less than 8 digits", async () => {
                const user = {
                    username: "Test",
                    email: "test@gmail.com",
                    password: "1234567"
                }

                const response = await request(app).post(`/TibiaHuntingRecords_Api/user`).send(user);
                expect(response.status).toEqual(400);
                console.log(response.body);
            })

            test("I shouldn't be able to create a user with custom stars", async () => {
                const user = {
                    _id: "601cee4eb153381684e36dad",
                    username: "Test",
                    email: "test@gmail.com",
                    password: "test1234",
                    stars: 5
                }

                const response = await request(app).post(`/TibiaHuntingRecords_Api/user`).send(user);
                expect(response.status).toEqual(201);
                expect(response.body).toHaveProperty("user");
                expect(response.body.user).toHaveProperty("stars", 0);
                expect(response.body).toHaveProperty("token");
            })
        })

        describe("PUT Users", () => {
            test("I should not be able to update another user's User", async () => {

            })
        })
    })
})
