import { BaseController } from './BaseController';
import { NextFunction, Request, Response } from 'express';
import { MongoAdapter } from '../../infrastructure/MongoAdapter';
import { VoucherRepository } from '../../infrastructure/repository/VoucherRepository';

class VoucherController extends BaseController {
  async getVouchers(req: Request, res: Response) {
    // const userId = res.locals['uid'];
    // const mongoAdapter = MongoAdapter.getInstance();
    // const voucherRepo = new VoucherRepository(
    //   mongoAdapter,
    //   'voucherDetails'
    // );
    // await voucherRepo.isConnected();

    // const result = await voucherRepo.list({}, userId);

    // res.status(200).json(result);
  }

  async createVoucher(req: Request, res: Response) {
    // const discountDetails = req.body;
    // const mongoAdapter = MongoAdapter.getInstance();

    // const discountRepo = new VoucherRepository(
    //   mongoAdapter,
    //   'discountDetails'
    // );
    // await discountRepo.isConnected();
    // discountRepo.createDiscount(discountDetails);

    // res.status(200).json();
  }

  async getVoucher(req: Request, res: Response) {
    // const discountId = parseInt(req.params['id']);
    // const userId = res.locals['uid'];

    // const mongoAdapter = MongoAdapter.getInstance();
    // const discountRepo = new VoucherRepository(
    //   mongoAdapter,
    //   'discountDetails'
    // );
    // await discountRepo.isConnected();

    // const query = {
    //   uuid: discountId,
    // };
    // const result = await discountRepo.list(query, userId);

    // if (result.length < 1) {
    //   res
    //     .status(404)
    //     .send({
    //       status: 404,
    //       message: `Cannot find the discount with id ${discountId}`,
    //     });
    //   return;
    // }

    // res.status(200).send( result[0]);
    }
    
  async deleteVoucher(req: Request, res: Response) {
    // const { uuid } = req.body;
    // const mongoAdapter = MongoAdapter.getInstance();

    // const discountRepo = new VoucherRepository(
    //   mongoAdapter,
    //   'discountDetails'
    // );
    // await discountRepo.isConnected();

    // discountRepo.deleteDiscount(uuid);

    // res.status(200).json();
  }

  async editVouchers(req: Request, res: Response) {
    // const { uuid } = req.body;

    // if (!uuid) {
    //   res.status(400).json({ message: 'invalid uuid' });
    //   return;
    // }

    // const discountDetails = req.body;
    // const mongoAdapter = MongoAdapter.getInstance();
    // const discountRepo = new VoucherRepository(
    //   mongoAdapter,
    //   'discountDetails'
    // );
    // await discountRepo.isConnected();

    // discountRepo.editDiscount(discountDetails);

    // res.status(200).json();
    }
    
  async redeemVoucher(req: Request, res: Response) {
//     const discountId = parseInt(req.params['id']);
//     const userId = res.locals['uid'];

//     const mongoAdapter = MongoAdapter.getInstance();
//     const discountRepo = new VoucherRepository(
//       mongoAdapter,
//       'discountDetails'
//     );
//     await discountRepo.isConnected();

//     const query = {
//       uuid: discountId,
//     };
//     const result = await discountRepo.list(query, userId);

//     if (result.length < 1) {
//       res
//         .status(404)
//         .send({
//           status: 404,
//           message: `Cannot find the discount with id ${discountId}`,
//         });
//       return;
//     }

//    const timeUntilAvailable = result[0]['cooldown']


//     if (timeUntilAvailable > 0) {
//       res.status(400).send(result[0]);
//       return;
//     }

//     const success = await discountRepo.redeemDiscount(userId, discountId);

//     res.status(200).send({ success: true });
  }
}

export { VoucherController };
