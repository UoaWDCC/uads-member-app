import { Collection as MongoCollection, Db } from 'mongodb';
import { MongoAdapter } from '../MongoAdapter';

class UserRepository {
  private db: Db;
  private mongoAdapter: MongoAdapter;
  private _isConnected: boolean;
  private userCollection: MongoCollection;

  constructor(mongoAdapter: MongoAdapter, collectinName?: string) {
    this.mongoAdapter = mongoAdapter;

    if (collectinName != null) {
      this.connectCollection(collectinName);
    }
  }

  public connectCollection(collectionName: string): void {
    this.mongoAdapter.getDb('user', (err: Error, res: Db) => {
      if (err) throw err;
      this.db = res;
      this.userCollection = res.collection(collectionName);
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
    const dbList = await this.userCollection.find({}).toArray();

    return dbList;
  }
}

export { UserRepository };
