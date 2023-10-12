import { Db, Collection as MongoCollection } from 'mongodb';

import { IVoucher } from '../../domain/Entities';
import { MongoAdapter } from '../MongoAdapter';

class VoucherRepository {
  private db: Db;
  private mongoAdapter: MongoAdapter;
  private _isConnected: boolean;
  private voucherCollection: MongoCollection;

  constructor(mongoAdapter: MongoAdapter, collectinName?: string) {
    this.mongoAdapter = mongoAdapter;

    if (collectinName != null) {
      this.connectCollection(collectinName);
    }
  }

  public connectCollection(collectionName: string): void {
    this.mongoAdapter.getDb('voucher', (err: Error, res: Db) => {
      if (err) throw err;
      this.db = res;
      this.voucherCollection = res.collection(collectionName);
      this._isConnected = true;
    });
  }

  public async isConnected(): Promise<boolean> {
    while (!this._isConnected) {
      await new Promise((resolve) => setTimeout(resolve, 50));
    }

    return true;
  }

  public async list(query): Promise<any[]> {
    const dbList = await this.voucherCollection.find(query).toArray();

    return dbList;
  }

  public async redeemDiscount(userId, discountId) {
    const redemption = await this.voucherCollection.insertOne({
      userId,
      discountId,
    });

    return redemption;
  }
}

export { VoucherRepository };
