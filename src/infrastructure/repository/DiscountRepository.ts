import { Collection as MongoCollection, Db } from 'mongodb';
import { MongoAdapter } from '../MongoAdapter';

class DiscountRepository {
  private db: Db;
  private mongoAdapter: MongoAdapter;
  private _isConnected: boolean;
  private discountCollection: MongoCollection;

  constructor(mongoAdapter: MongoAdapter, collectionName?: string) {
    this.mongoAdapter = mongoAdapter;

    if (collectionName != null) {
      this.connectCollection(collectionName);
    }
  }

  public connectCollection(collectionName: string): void {
    this._isConnected = false;
    this.mongoAdapter.getDb('discount', (err: Error, res: Db) => {
      if (err) throw err;
      this.db = res;
      this.discountCollection = res.collection(collectionName);
      this._isConnected = true;
    });
  }

  public async isConnected(): Promise<boolean> {
    while (!this._isConnected) {
      await new Promise((resolve) => setTimeout(resolve, 50));
    }

    return true;
  }

  public async list(query = null): Promise<any[]> {
    const dbList = await this.discountCollection
      .find(
        {
          ...query,
        },
        {
          projection: {
            _id: 0,
          },
        }
      )
      .toArray();

    return dbList;
  }
  public async createDiscount(discountDetails): Promise<void> {
    this.discountCollection.insertOne(discountDetails);
  }

  public async deleteDiscount(id: string): Promise<void> {
    this.discountCollection.deleteOne({ uuid: id });
  }

  public async editDiscount(discountDetails): Promise<void> {
    this.discountCollection.updateOne(
      { uuid: discountDetails.uuid },
      { $set: discountDetails },
      { upsert: false }
    );
  }
  public async getRedemptionHistory(userId, discountId): Promise<number> {
    const lastRedemption = await this.discountCollection
      .find({
        userId: userId,
        discountId: discountId,
      })
      .sort({ _id: -1 })
      .limit(1)
      .toArray();

    if (lastRedemption.length > 0) {
      const today = new Date();
      const lastRedemptionTime = lastRedemption[0]['_id'].getTimestamp();
      const diff = (today.getTime() - lastRedemptionTime.getTime()) / 1000;
      if (diff > 86400) {
        return 0;
      } else {
        return Math.floor(86400 - diff);
      }
    }
    return 0;
  }

  public async redeemDiscount(userId, discountId) {
    const redemption = await this.discountCollection.insertOne({
      userId,
      discountId,
    });

    return redemption;
  }
}

export { DiscountRepository };
