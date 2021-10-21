import { BaseController } from './BaseController';
import { NextFunction, Request, Response } from 'express';
import { MongoAdapter } from '../../infrastructure/MongoAdapter';
import { DiscountRepository } from '../../infrastructure/repository/DiscountRepository';

class DiscountController extends BaseController {
  async getDiscounts(req: Request, res: Response) {
    const mongoAdapter = MongoAdapter.getInstance();

    const discountRepo = new DiscountRepository(
      mongoAdapter,
      'discountDetails'
    );
    await discountRepo.isConnected();

    const result = await discountRepo.list();

    res.status(200).json(result);
  }
}

export { DiscountController };
