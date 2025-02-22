import withAuth, { AUTH_MODE } from '@modules/auth/hocs/withAuth';
import withPermissions from '@modules/permissions/hocs/withPermissions_v2';
import { NextPage } from 'next';
import Routes from '@common/defs/routes';
import { useRouter } from 'next/router';
import PageHeader from '@common/components/lib/partials/PageHeader';
import CustomBreadcrumbs from '@common/components/lib/navigation/CustomBreadCrumbs';
import { useEffect, useState } from 'react';
import useProgressBar from '@common/hooks/useProgressBar';
import { CRUD_ACTION, Id } from '@common/defs/types';
import Namespaces from '@common/defs/namespaces';
import Labels from '@common/defs/labels';
import { Button, Card, CardActions, CardContent, Grid, Stack, Typography, CircularProgress, Alert, Chip, Divider, Avatar } from '@mui/material';
import Image from 'next/image';
import { AccessTime, Create, EventSeat, HistoryEdu, LocationOn, Person, Share } from '@mui/icons-material';
import useEvents from '@modules/events/hooks/api/useEvents';
import { Event } from '@modules/events/defs/types';
import useAuth from '@modules/auth/hooks/api/useAuth';
import dayjs from 'dayjs';

const EventPage: NextPage = () => {
  const router = useRouter();
  const { start, stop } = useProgressBar();
  const { readOne, registerOne } = useEvents();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [item, setItem] = useState<Event | null>(null);
  const id: Id = Number(router.query.eventId);
  const { user } = useAuth();

  useEffect(() => {
    if (id) {
      fetchEvent();
    }
  }, [id]);

  const fetchEvent = async () => {
    try {
      start();
      const { data, error } = await readOne(id);
      if (error) {
        setError(error.message || 'Failed to fetch event details.');
      } else if (data?.items) {
        setItem(data.items);
      }
    } catch (err) {
      setError('An unexpected error occurred.');
    } finally {
      setLoading(false);
      stop();
    }
  };

  const handleRegister = async () => {
    if (!user) return;
    try {
      const { error } = await registerOne(id, { userId: user.id }, { displayProgress: true, displaySuccess: true });
      if (error) {
        setError(error.message || 'Failed to register for the event.');
      } else {
        fetchEvent();
      }
    } catch (err) {
      setError('An unexpected error occurred during registration.');
    }
  };

  if (loading) {
    return (
      <Stack alignItems="center" justifyContent="center" height="100vh">
        <CircularProgress />
      </Stack>
    );
  }

  if (error) {
    return (
      <Stack alignItems="center" justifyContent="center" height="100vh">
        <Alert severity="error">{error}</Alert>
      </Stack>
    );
  }

  return (
    <>
      <PageHeader
        title={Labels.Events.ReadAll}
        action={{
          label: Labels.Events.EditOne,
          startIcon: <Create />,
          onClick: () => router.push(Routes.Events.EditOne.replace('{id}', id.toString())),
          permission: {
            entity: Namespaces.Events,
            action: CRUD_ACTION.UPDATE,
            entityId: item?.id,
          }
        }}
      />
      <CustomBreadcrumbs
        links={[
          { name: 'Dashboard', href: Routes.Common.Home },
          { name: Labels.Events.Items, href: Routes.Events.ReadAll },
          { name: item ? item.title : Labels.Users.EditOne }
        ]}
      />

      {item ? (
        <Card>
          <CardContent>
            {/* host banner */}
            <Stack spacing={2} paddingTop={4} paddingBottom={4}>
              {/* Event Title */}
              <Typography variant="h4" fontWeight="bold" sx={{ color: 'text.primary' }}>
                {item.title}
              </Typography>

              {/* Hosted By with Avatar */}
              <Stack direction="row" alignItems="center" spacing={2}>
                {/* Avatar */}
                <Avatar
                  alt={item.organizer.fullName}
                  src={item.profilePicture}
                  sx={{ width: 40, height: 40 }}
                />
                {/* Hosted By Text */}
                <Stack direction="row" alignItems="center" spacing={1}>
                  <Typography variant="h6" fontWeight={400} sx={{ color: 'text.secondary' }}>
                    Hosted by
                  </Typography>
                  <Typography variant="h6" fontWeight={400} sx={{ color: 'text.primary' }}>
                    {item.organizer.fullName}
                  </Typography>
                </Stack>
              </Stack>
            </Stack>
            {/* Details  */}
            <Grid container spacing={4}>
              {/* image */}
              <Grid item xs={12} sm={5}>
                <Image
                  src="/event.webp"
                  alt="Event 1"
                  width={0}
                  height={0}
                  sizes="100vw"
                  style={{ width: '100%', height: 'auto', borderRadius: '8px' }}
                />
                {/* description body  */}
                <Typography variant="h6" fontWeight="bold">
                  Details:
                </Typography>
                <Typography variant="body1">{item.description}</Typography>
              </Grid>
              {/* details */}
              <Grid item xs={12} sm={7}>

                <Stack spacing={3}>
                  <Stack direction="row" alignItems="center" spacing={2}>
                    <AccessTime color="primary" />
                    <Typography variant="h6" fontWeight={400}>
                      {dayjs(item.date).format('dddd, MMMM D, YYYY h:mm A')}
                    </Typography>
                  </Stack>
                  <Stack direction="row" alignItems="center" spacing={2}>
                    <LocationOn color="primary" />
                    <Typography variant="h6" fontWeight={400}>
                      {item.location || 'Location not specified'}
                    </Typography>
                  </Stack>
                  <Typography variant="body2" color="text.secondary" mt={2}>
                    {item.participantsCount >= item.maxParticipants ? 'This event is full.' : 'Spots available.'}
                  </Typography>
                  <Stack direction="row" alignItems="center" spacing={2}>
                    <EventSeat color="primary" />
                    <Typography variant="body1">
                      {item.participantsCount}/{item.maxParticipants} participants
                    </Typography>
                  </Stack>
                  <Stack direction="row" spacing={2} mt={2}>
                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    onClick={handleRegister}
                    disabled={item.participantsCount >= item.maxParticipants || item.isRegistred}
                  >
                    {item.isRegistred ? 'Registered' : 'Attend'}
                  </Button>
                  <Button variant="outlined" color="primary" fullWidth startIcon={<Share />}>
                    Share
                  </Button>
                </Stack>
                </Stack>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      ) : (
        <Stack alignItems="center" justifyContent="center" height="100vh">
          <Typography variant="h6">Event not found</Typography>
        </Stack>
      )}
    </>
  );
};

export default withAuth(
  withPermissions(EventPage, {
    requiredPermissions: [
      {
        entity: Namespaces.Events,
        action: CRUD_ACTION.READ,
      },
    ],
    redirectUrl: Routes.Permissions.Forbidden,
  }),
  {
    mode: AUTH_MODE.LOGGED_IN,
    redirectUrl: Routes.Auth.Login,
  }
);