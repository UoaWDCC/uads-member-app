import { Handler } from 'express';
import { UserController } from '../../controller/UserController';

const userController = new UserController();

const get: Handler[] = [userController.getUserByID];
const put: Handler[] = [userController.modifyUser];
const del: Handler[] = [userController.deleteUser];

export { get as GET_USER_ID, put as PUT_USER, del as DELETE_USER };
