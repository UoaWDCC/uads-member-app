import { Collection as MongoCollection, Db } from 'mongodb';
import { MongoAdapter } from '../../adapters/MongoAdapter';

class EventRepository {
  private db: Db;
  private mongoAdapter: MongoAdapter;
  private _isConnected: boolean;
  private eventCollection: MongoCollection;

  constructor(mongoAdapter: MongoAdapter, collectinName?: string) {
    this.mongoAdapter = mongoAdapter;

    if (collectinName != null) {
      this.connectCollection(collectinName);
    }
  }

  public connectCollection(collectionName: string): void {
    this.mongoAdapter.getDb('event', (err: Error, res: Db) => {
      if (err) throw err;
      this.db = res;
      this.eventCollection = res.collection(collectionName);
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
    const dbList = await this.eventCollection.find({}).toArray();

    return dbList;
  }
}

export { EventRepository };