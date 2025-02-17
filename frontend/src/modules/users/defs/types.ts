import { CrudObject } from '@common/defs/types';
import { ROLE } from '@modules/permissions/defs/types';

export interface User extends CrudObject {
  name: string;
  email: string;
  profile_picture: string;
  rolesNames: ROLE[];
  permissionsNames: string[];
}
