import { Collection as MongoCollection, Db } from 'mongodb';
import { MongoAdapter } from '../MongoAdapter';

class DiscountRepository {
  private db: Db;
  private mongoAdapter: MongoAdapter;
  private _isConnected: boolean;
  private discountCollection: MongoCollection;

  constructor(mongoAdapter: MongoAdapter, collectinName?: string) {
    this.mongoAdapter = mongoAdapter;

    if (collectinName != null) {
      this.connectCollection(collectinName);
    }
  }

  public connectCollection(collectionName: string): void {
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

  public async list(): Promise<any[]> {
    const dbList = await this.discountCollection.find({}).toArray();

    return dbList;
  }

  public async createDiscount(discountDetails): Promise<void> {
    this.discountCollection.insertOne(discountDetails);
  }

  public async deleteDiscount(id: string): Promise<void> {
    this.discountCollection.deleteOne({ uuid: id });
  }
  // public async editDiscount(discountDetails): Promise<void> {
  //   this.discountCollection.updateOne(
  //     { uuid: discountDetails.uuid },
  //     { $set: discountDetails },
  //     { upsert: false }
  //   );
  // }
}

export { DiscountRepository };
