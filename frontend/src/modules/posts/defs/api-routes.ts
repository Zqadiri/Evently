import { CrudApiRoutes } from '@common/defs/types';

const prefix = '/posts';
const ApiRoutes: CrudApiRoutes = {
  CreateOne: prefix,
  ReadAll: prefix,
  ReadOne: prefix + '/{id}',
  UpdateOne: prefix + '/{id}',
  DeleteOne: prefix + '/{id}',
  CancelOne: prefix + '/{id}',
  RestoreOne:prefix + '/{id}',
  RegisterOne: prefix + '/{id}'
};

export default ApiRoutes;
