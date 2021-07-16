import * as Joi from 'joi';

export const point2D = Joi.object({
  x: Joi.string(),
  y: Joi.number,
}).meta({ className: 'Point' });
