import { Handler } from 'express';
import { UserController } from '../../controller/UserController';

const userController = new UserController();

//Add more middleware handlers in the array
const get: Handler[] = [userController.getUsers];
const post: Handler[] = [userController.createUser];

export { get as GET_USER, post as POST_USER};
