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

  public async list(query = null, userId): Promise<any[]> {
    const dbList = await this.discountCollection
      .aggregate([
        {
          $match: {...query},
        }, {
          $lookup: {
            from: 'redemption',
            let: {discountId: "$uuid"},
            pipeline: [
              {
                $match: {
                  $expr: {
                    $and: [
                      {$eq: ["$userId", userId]},
                      {$eq: ["$discountId", "$$discountId"]}
                    ],
                  }
                }
              }
            ],
            as: 'cooldown',
          }
        },
        {
          $unwind: {
            path: '$cooldown',
            preserveNullAndEmptyArrays: true
          }
        },
        {
          $sort: {
            "cooldown._id": -1
          }
        },
        {
          $group: {
            _id: "$_id",
            desc: { $first: "$desc"},
            sponsor: { $first: "$sponsor"},
            value: { $first: "$value"},
            imageLink:  { $first: "$imageLink"},
            uuid: { $first: "$uuid"},
            cooldown: { $first: "$cooldown"},
          }
        },
        {
          $project: {
            _id: 0,
          }
        }
      ])
      .toArray();

    const discountWithCooldown = dbList.map((discount) => {
      if (discount['cooldown'] != null){
        const today = new Date();
        const lastRedemptionTime = discount['cooldown']['_id'].getTimestamp();
        const diff = (today.getTime() - lastRedemptionTime.getTime()) / 1000;
        if (diff > 86400) {
          return {...discount, cooldown: 0};
        } else {
          return {...discount, cooldown: Math.floor(86400 - diff)}
        }
      } else {
        return {...discount, cooldown: 0}
      }
    })

    return discountWithCooldown;
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
