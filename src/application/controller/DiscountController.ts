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

  async createDiscount(req: Request, res: Response) {
    const discountDetails = req.body;
    const mongoAdapter = MongoAdapter.getInstance();

    const discountRepo = new DiscountRepository(
      mongoAdapter,
      'discountDetails'
    );
    await discountRepo.isConnected();
    discountRepo.createDiscount(discountDetails);

    res.status(200).json();
  }

  async deleteDiscount(req: Request, res: Response) {
    const { uuid } = req.body;
    const mongoAdapter = MongoAdapter.getInstance();

    const discountRepo = new DiscountRepository(
      mongoAdapter,
      'discountDetails'
    );
    await discountRepo.isConnected();

    discountRepo.deleteDiscount(uuid);

    res.status(200).json();
  }

  async editDiscounts(req: Request, res: Response) {
    const { uuid } = req.body;

    if (!uuid) {
      res.status(400).json({ message: 'invalid uuid' });
      return;
    }

    const discountDetails = req.body;
    const mongoAdapter = MongoAdapter.getInstance();
    const discountRepo = new DiscountRepository(
      mongoAdapter,
      'discountDetails'
    );
    await discountRepo.isConnected();

    discountRepo.editDiscount(discountDetails);

    res.status(200).json();
  }
}

export { DiscountController };
