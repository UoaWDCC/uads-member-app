import { BaseController } from './BaseController';
import { NextFunction, Request, Response } from 'express';
import { MongoAdapter } from '../../infrastructure/MongoAdapter';
import { DiscountRepository } from '../../infrastructure/repository/DiscountRepository';

class DiscountController extends BaseController {
  async getDiscounts(req: Request, res: Response) {
    const userId = res.locals['uid'];
    const mongoAdapter = MongoAdapter.getInstance();
    const discountRepo = new DiscountRepository(
      mongoAdapter,
      'discountDetails'
    );
    await discountRepo.isConnected();

    const result = await discountRepo.list({}, userId);

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

  async getDiscount(req: Request, res: Response) {
    const discountId = parseInt(req.params['id']);
    const userId = res.locals['uid'];

    const mongoAdapter = MongoAdapter.getInstance();
    const discountRepo = new DiscountRepository(
      mongoAdapter,
      'discountDetails'
    );
    await discountRepo.isConnected();

    const query = {
      uuid: discountId,
    };
    const result = await discountRepo.list(query, userId);

    if (result.length < 1) {
      res
        .status(404)
        .send({
          status: 404,
          message: `Cannot find the discount with id ${discountId}`,
        });
      return;
    }

    res.status(200).send( result[0]);
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
  async redeemDiscount(req: Request, res: Response) {
    const discountId = parseInt(req.params['id']);
    const userId = res.locals['uid'];

    const mongoAdapter = MongoAdapter.getInstance();
    const discountRepo = new DiscountRepository(
      mongoAdapter,
      'discountDetails'
    );
    await discountRepo.isConnected();

    const query = {
      uuid: discountId,
    };
    const result = await discountRepo.list(query, userId);

    if (result.length < 1) {
      res
        .status(404)
        .send({
          status: 404,
          message: `Cannot find the discount with id ${discountId}`,
        });
      return;
    }

   const timeUntilAvailable = result[0]['cooldown']


    if (timeUntilAvailable > 0) {
      res.status(400).send(result[0]);
      return;
    }

    discountRepo.connectCollection('redemption')
    await discountRepo.isConnected()
    const success = await discountRepo.redeemDiscount(userId, discountId);

    res.status(200).send({ success: true });
  }
}

export { DiscountController };
