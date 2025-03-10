import { Id } from '@common/defs/types';

export enum ROLE {
  ADMIN = 'admin',
  USER = 'user',
}

export interface Permission {
  entity: string;
  action: string;
  entityId?: Id;
}

export type PermissionCheck =
  | Permission
  | Permission[]
  | { and: PermissionCheck[]; or?: never; not?: never }
  | { or: PermissionCheck[]; and?: never; not?: never }
  | { not: PermissionCheck[]; and?: never; or?: never };