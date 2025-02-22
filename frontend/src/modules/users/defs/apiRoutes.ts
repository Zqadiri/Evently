import { CrudAppRoutes } from '@common/defs/types';

const prefix = '/users';
const ApiRoutes: CrudAppRoutes = {
  CreateOne: prefix,
  ReadAll: prefix,
  ReadOne: prefix + '/{id}',
  UpdateOne: prefix + '/{id}',
  DeleteOne: prefix + '/{id}',
};

export default ApiRoutes;
