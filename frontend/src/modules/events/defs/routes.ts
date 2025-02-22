import { CrudAppRoutes } from '@common/defs/types';

const prefix = '/events';
const Routes: CrudAppRoutes = {
  ReadAll: prefix,
  CreateOne: prefix + '/create',
  UpdateOne: prefix + '/{id}',
  EditOne: prefix + '/{id}/edit',
  Registered: prefix + '/registered',
  MyEvents: '/myevents',
};

export default Routes;
