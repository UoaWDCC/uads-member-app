import { Db, MongoClient } from 'mongodb';
import { logger } from '../util/Logger';
import { Mongoose, createConnection, connections, Connection } from 'mongoose';

/**
 * A singleton adapter that allows access to MongoDB cluster through a unique mongo uri.
 */
class MongoAdapter {
  /**
   * The database instance.
   */
  public db: Db;

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
    // const client = new MongoClient(uri, {
    //   useNewUrlParser: true,
    //   useUnifiedTopology: true,
    // });
    // const client = new Mongoose();
    // // client.connect(uri, { useNewUrlParser: true });
    // client
    //   .connect(uri, {})
    //   .then(() => {
    //     logger.info("MongoDB connected");
    //   })
    //   .catch((err) => {
    //     logger.info(err);
    //     throw err;
    //   });
    // client.connect((err) => {
    //   if (err) throw err;
    //   this.db = client.db(dbName);
    //   logger.info("MongoDB connected");
    // });
    // this.client = client;

    this.client = mongoose;
  }

  public getDb(dbName: string): Db {
    const index = this.openConnections.indexOf(dbName);
    if (index != -1) {
      return this.client.connections[index].db;
    } else {
      createConnection().openUri(this.uri, (err, connection) => {
        if (err) throw err;
        this.openConnections.push(dbName);
        return connection.db;
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
