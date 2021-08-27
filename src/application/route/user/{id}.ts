import { Handler } from 'express';
import { UserController } from '../../controller/UserController';

const userController = new UserController();

const get: Handler[] = [userController.getUsers];

export { get as GET_USER_ID };
