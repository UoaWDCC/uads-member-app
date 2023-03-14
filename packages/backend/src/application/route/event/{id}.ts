import { Handler } from 'express';
import { EventController } from '../../controller/EventController';

const eventController = new EventController();

const get: Handler[] = [eventController.getEvents];

export { get as GET_EVENT_ID };
