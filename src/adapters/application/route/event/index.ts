import { Handler } from 'express';
import { EventController } from '../../controller/EventController';

const eventController = new EventController();

//Add more middleware handlers in the array
const get: Handler[] = [eventController.getEvents];

export { get as GET_EVENT };
