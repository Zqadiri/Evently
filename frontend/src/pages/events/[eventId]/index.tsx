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
import { Button, Card, CardActions, CardContent, Grid, Stack, Typography } from '@mui/material';
import Image from 'next/image';
import { AccessTime, ChairOutlined, Create, Person2Outlined, PlaceOutlined } from '@mui/icons-material';
import dayjs from 'dayjs';
import useEvents from '@modules/events/hooks/api/useEvents';
import { Event } from '@modules/events/defs/types';

const EventPage: NextPage = () => {
  const router = useRouter();
  const { start, stop } = useProgressBar();
  const { readOne, registerOne } = useEvents();
  const [loaded, setLoaded] = useState(false);
  const [item, setItem] = useState<null | Event>(null);
  const id: Id = Number(router.query.eventId);

  useEffect(() => {
    if (loaded) {
      stop();
    } else {
      start();
    }
  }, [loaded]);

  useEffect(() => {
    fetchEvent();
  }, [id]);

  const fetchEvent = async () => {
    if (id) {
      const { data } = await readOne(id);
      if (data) {
        // @ts-ignore
        if (data.items) {
          // @ts-ignore
          setItem(data.items);
        }
      }
      setLoaded(true);
    }
  };

  return (
    <>
      <PageHeader
        title={Labels.Events.ReadAll}
        action={{
          label: Labels.Events.EditOne,
          startIcon: <Create />,
          onClick: () => router.push(`/events/${id.toString()}/edit`),
          permission: {
            entity: Namespaces.Events,
            action: CRUD_ACTION.UPDATE,
            entityId: item?.id,
          },
        }}
      />
      <CustomBreadcrumbs
        links={[
          { name: 'Dashboard', href: Routes.Common.Home },
          { name: Labels.Events.Items, href: Routes.Events.ReadAll },
          { name: item ? item.title : Labels.Users.EditOne },
        ]}
      />

      {item ? (
        <Card>
          <CardContent>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={7}>
                <Stack spacing={2.5}>
                  <Typography variant="h3">{item?.title}</Typography>
                  <Stack direction="row" alignItems="center" spacing={2} my={1}>
                    <AccessTime color="primary" />
                    <Typography variant="h6" fontWeight={400}>
                      {dayjs(item.date).format('ddd, D MMM, YYYY | HH:mm')}
                    </Typography>
                  </Stack>
                  <Stack direction="row" alignItems="center" spacing={2} my={1}>
                    <PlaceOutlined color="primary" />
                    <Typography variant="h6" fontWeight={400}>
                      {item.location}
                    </Typography>
                  </Stack>
                  <Stack direction="row" alignItems="center" spacing={2} my={1}>
                    <ChairOutlined color="primary" />
                    <Typography variant="body1">
                      {item.participantsCount}/{item.maxParticipants}
                    </Typography>
                  </Stack>
                  <Stack direction="row" alignItems="center" spacing={2} my={1}>
                    <Person2Outlined color="primary" />

                    <Typography variant="body1">Hosted by: {item.organizer.name}</Typography>
                  </Stack>
                </Stack>
              </Grid>
              <Grid item xs={12} sm={5}>
                <Image
                  src="/event.webp"
                  alt="Event 1"
                  width={0}
                  height={0}
                  sizes="100vw"
                  style={{ width: '100%', height: 'auto' }}
                />
              </Grid>
            </Grid>
            <Typography variant="h6" mt={2}>
              Description
            </Typography>
            <Typography variant="body1">{item?.description}</Typography>
          </CardContent>
          <CardActions>
            {item.participantsCount < item.maxParticipants ? (
              item.isRegistered ? (
                <Button variant="contained" color="info">
                  Registered
                </Button>
              ) : (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() =>
                    registerOne(id, { userid: item.organizer.id } as any, {
                      displayProgress: true,
                      displaySuccess: true,
                    })
                  }
                >
                  Register
                </Button>
              )
            ) : (
              <Button variant="contained" color="warning">
                Full
              </Button>
            )}
          </CardActions>
        </Card>
      ) : (
        <Stack alignItems="center" justifyContent="center">
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
