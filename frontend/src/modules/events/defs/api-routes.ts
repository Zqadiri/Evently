import { CrudApiRoutes } from '@common/defs/types';

/**
 * API endpoints for CRUD operations related to events
 */

const prefix = '/events';
const ApiRoutes: CrudApiRoutes = {
  CreateOne: prefix,
  ReadAll: prefix,
  ReadOne: prefix + '/{id}',
  ReadRegistred: prefix + '/registered/{id}',
  ReadOwn: prefix + '/myevents/{id}',
  UpdateOne: prefix + '/{id}',
  CancelOne: prefix + '/cancel/{id}',
  RestoreOne: prefix + '/restore/{id}',
  RegisterOne: prefix + '/register/{id}',
  DeleteOne: prefix + '/{id}',
};

export default ApiRoutes;

