import { Db, MongoClient } from 'mongodb';
import { logger } from '../util/Logger';
import {
  Mongoose,
  createConnection,
  connections,
  Connection,
  Callback,
} from 'mongoose';

/**
 * A singleton adapter that allows access to MongoDB cluster through a unique mongo uri.
 */
class MongoAdapter {
  /**
   * The database instance.
   */
  private db: Db;

  /**
   * Private MongoClient for purposes of getting another database from the same adapter instance.
   */
  private client: Mongoose;

  private openConnections: string[];

  private uri: string;

  private static _instance: MongoAdapter;

  private constructor(uri: string) {
    const mongoose = new Mongoose();

    this.uri = uri;
    this.openConnections = [];

    this.client = mongoose;
  }

  public getDb(dbName: string, callBack: Callback<Db>): void {
    const index = this.openConnections.indexOf(dbName);
    let res: Db;

    if (index != -1) {
      res = this.client.connections[index].db;
      callBack(null, res);
    } else {
      createConnection(this.uri, { dbName: dbName })
        .asPromise()
        .then((connection) => {
          res = connection.db;
          callBack(null, res);
        });
    }
  }

  /**
   * Builds a MongoAdapter using a `uri` and default `dbName`.
   */
  public static build(uri: string): MongoAdapter {
    if (this._instance) throw new Error('MongoAdapter already built!');

    this._instance = new this(uri);
    return this._instance;
  }

  /**
   * Get the current `MongoAdapter` instance if it exists, or
   */
  public static getInstance(): MongoAdapter {
    if (!this._instance) throw new Error('No instance of MongoAdapter exists!');
    return this._instance;
  }
}

export { MongoAdapter };
