import { MongoAdapter } from '../../MongoAdapter';
import Config from '../../../util/Config';
/**
 * The root controller that all other controllers will extend from.
 */
MongoAdapter.build(Config.MONGODB_URI);

class BaseController {}

export { BaseController };
