import withAuth, { AUTH_MODE } from '@modules/auth/hocs/withAuth';
import withPermissions from '@modules/permissions/hocs/withPermissions_v2';
import { NextPage } from 'next';
import Routes from '@common/defs/routes';
import { CRUD_ACTION, Id } from '@common/defs/types';
import PageHeader from '@common/components/lib/partials/PageHeader';
import CustomBreadcrumbs from '@common/components/lib/navigation/CustomBreadCrumbs';
import Namespaces from '@common/defs/namespaces';
import Labels from '@common/defs/labels';
import { Event } from '@modules/events/defs/types';
import useEvents from '@modules/events/hooks/api/useEvents';
import { useState } from 'react';

const EditEventPage: NextPage = () => {
  const [item, setItem] = useState<null | Event>(null);

  return (
    <>
      <PageHeader title={Labels.Users.EditOne} />
      <CustomBreadcrumbs
        links={[
          { name: 'Dashboard', href: Routes.Common.Home },
          { name: Labels.Users.Items, href: Routes.Users.ReadAll },
          { name: item ? item.email : Labels.Users.EditOne },
        ]}
      />
        edit page
    </>
  );
};

export default withAuth(
  withPermissions(EditEventPage, {
    requiredPermissions: [
      {
        entity: Namespaces.Events,
        action: CRUD_ACTION.UPDATE,
      },
    ],
    redirectUrl: Routes.Permissions.Forbidden,
  }),
  {
    mode: AUTH_MODE.LOGGED_IN,
    redirectUrl: Routes.Auth.Login,
  }
);
