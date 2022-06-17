import mongoose from 'mongoose';
import supertest from 'supertest';
import * as UserService from '../service/user.service';
import createServer from '../utils/server';

const app = createServer();
const userId = new mongoose.Types.ObjectId().toString();
const mockUserPayload = {
    _id: userId,
    email: "test2@gmail.com",
    name: "Test Doe Two",
}

const mockUserInput = {
    email: "test@gmail.com",
    name: "Test Doe",
    password: "password123",
    passwordConfirmation: "password123",
};

describe('User', () => {

    describe('User registration', () => {
        describe('Given the username and password are valid', async () => {
            it('Should return the user payload', async () => {
                const createUserServiceMock = jest
                    .spyOn(UserService, 'createUser')
                    // @ts-ignore
                    .mockReturnValueOnce(mockUserPayload);

                const { statusCode, body } = await supertest(app)
                    .post('/api/users')
                    .send(mockUserInput);

                expect(statusCode).toBe(200);
                expect(body).toEqual(mockUserPayload);
                expect(createUserServiceMock).toHaveBeenCalledWith(mockUserInput);
            });
        });

        describe('Given the passwords do not match', async () => {
            it('Should return a 400', async () => {
                const editedUserInput = {
                    ...mockUserInput,
                    passwordConfirmation: "notmatching",
                }
                const createUserServiceMock = jest
                    .spyOn(UserService, 'createUser')
                    // @ts-ignore
                    .mockReturnValueOnce(mockUserPayload);

                const { statusCode } = await supertest(app)
                    .post('/api/users')
                    .send(editedUserInput);

                expect(statusCode).toBe(400);
                expect(createUserServiceMock).not.toHaveBeenCalled();
            });
        });

        describe('Given the user service throws', async () => {
            it('Should return 409 error', async () => {
                const createUserServiceMock = jest
                    .spyOn(UserService, 'createUser')
                    .mockRejectedValue("Mocking a error, 409 returned");

                const { statusCode } = await supertest(app)
                    .post('/api/users')
                    .send(mockUserInput);

                expect(statusCode).toBe(409);
                expect(createUserServiceMock).toHaveBeenCalled();
            });
        });
    });

    describe('Create user session', () => {

        describe('Given the username and password are valid', async () => {
            it('Should return a signed accessToken and refreshToken', async () => {
                
            });
        });

    });

});