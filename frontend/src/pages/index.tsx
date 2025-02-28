import PageHeader from '@common/components/lib/partials/PageHeader';
import Routes from '@common/defs/routes';
import withAuth, { AUTH_MODE } from '@modules/auth/hocs/withAuth';
import EventsGrid from '@modules/events/components/partials/EventsGrid';
import { NextPage } from 'next';

const Index: NextPage = () => {
  return (
    <>
      <PageHeader title="Dashboards" />
      <EventsGrid filterToolbar fetchItems />
    </>
  );
};

export default withAuth(Index, {
  mode: AUTH_MODE.LOGGED_IN,
  redirectUrl: Routes.Auth.Login,
});
