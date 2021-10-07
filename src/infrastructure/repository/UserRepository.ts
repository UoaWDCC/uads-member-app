import { Collection as MongoCollection, Db } from 'mongodb';
import { IUser } from '../../domain/Entities';
import { MongoAdapter } from '../MongoAdapter';
// import { Users } from '../schema/userSchema'

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

  //get all users
  public async getUsers(query: any): Promise<IUser[]> {
    var dbList = null;
 
    dbList = await this.userCollection.find(query).toArray();

    return dbList;
  }

  //get single user
  public async getByID(id: string): Promise<IUser> {
    const allUserDetails = await this.userCollection.findOne({"uuid": id});
    
    console.log(allUserDetails)
    
    return allUserDetails;
  }

  public async createUser(user: IUser): Promise<void> {
    user.created = Date.now();
    user.modified = Date.now();

    this.userCollection.insertOne(user);
  }

  public async deleteUser(id: string): Promise<number> {
    const status = await this.userCollection.deleteOne({"uuid": id});

    return status.deletedCount;
  }

  public async modifyUser(id: string, query: any): Promise<boolean> {
  
    const update = {
      "$set": query
    };
    
    const status = await this.userCollection.findOneAndUpdate({"uuid": id}, update);
    return status.lastErrorObject.updatedExisting;
  }
}

export { UserRepository };
