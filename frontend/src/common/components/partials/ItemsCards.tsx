import { CrudRow, Id } from '@common/defs/types';
import { UseItems } from '@common/hooks/useItems';
import { AccessTime, EventSeat, LocationOn } from '@mui/icons-material';
import HowToRegIcon from '@mui/icons-material/HowToReg'; // Import the new icon

import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Stack,
  Typography,
  Skeleton,
  Grid,
  Chip,
} from '@mui/material';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import dayjs from 'dayjs';
import useAuth from '@modules/auth/hooks/api/useAuth';
import { useTranslation } from 'react-i18next';

interface ItemsCardsProps<Item, CreateOneInput, UpdateOneInput, Row> {
  useItems: UseItems<Item, CreateOneInput, UpdateOneInput>;
  itemToRow: (item: Item) => Row;
  fetchItems?: boolean;
  ownItems?: boolean;
  registredtems?: boolean;
  filterToolbar?: boolean;
}

const ItemsCards = <Item, CreateOneInput, UpdateOneInput, Row extends CrudRow>(
  props: ItemsCardsProps<Item, CreateOneInput, UpdateOneInput, Row>
) => {
  const {
    useItems,
    itemToRow,
    fetchItems,
    ownItems,
    registredtems,
  } = props;
  const router = useRouter();
  const { items } = useItems({
    fetchItems: fetchItems,
    fetchOwnItems: ownItems,
    fetchRegistredItems: registredtems,
  });
  const { user } = useAuth();
  const [rows, setRows] = useState<Row[]>([]);

  useEffect(() => {
    if (items) {
      const itemsRows = items.map((item) => itemToRow(item));
      setRows(itemsRows);
    }
  }, [items]);

  return (
    <>
      <Grid container spacing={4} marginTop={2}>
        {rows.map((item) => {
          return (
            <Grid item xs={12} sm={6} md={4} key={item.id}>
              <Card
                onClick={() => 
                  router.push({
                    pathname: '/events/[eventId]',
                    query: { eventId: item.id },
                  })
                }
                sx={{
                  cursor: 'pointer',
                  '&:hover': {
                    transform: 'scale(1.02)',
                    transition: 'transform 0.2s',
                    boxShadow: '0 4px 20px 0 rgba(0,0,0,0.12)',
                  },
                }}
              >
                <Image
                  src="/event.webp"
                  alt="Event 1"
                  width={0}
                  height={0}
                  priority={true}
                  sizes="100vw"
                  style={{ width: '100%', height: 'auto', borderTopLeftRadius: '4px', borderTopRightRadius: '4px' }}
                />
                <CardContent sx={{ paddingBottom: 0 }}>
                <Typography variant="body1" color="warning.main" sx={{ fontWeight: 'semibold', mb: 1 }}>
                    {item.categoryName}
                  </Typography>
                  <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
                    {item.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    Hosted by: {item.organizerName || "Unknown Organizer"}
                  </Typography>
                  <Stack direction="row" alignItems="center" spacing={2} my={1}>
                    <AccessTime sx={{ color: 'primary.darker', fontSize: '20px', mr: 1 }} />
                    <Typography variant="body1">
                      {dayjs(item.date).format('ddd, MMM D, YYYY | h:mm A')}
                    </Typography>
                  </Stack>
                  <Stack direction="row" alignItems="center" spacing={2} my={1}>
                    <LocationOn sx={{ color: 'primary.darker', fontSize: '20px', mr: 1 }} />
                    <Typography variant="body1">{item.location}</Typography>
                  </Stack>
                  <Stack direction="row" alignItems="center" spacing={2} my={1}>
                    <EventSeat sx={{ color: 'primary.darker', fontSize: '20px', mr: 1 }} />
                    <Typography variant="body1">
                      {item.participantsCount} going • {item.maxParticipants} spots
                    </Typography>
                  </Stack>
                </CardContent>
                <CardActions sx={{ justifyContent: 'flex-end', p: 2 }}>
                  {!ownItems &&
                    !registredtems &&
                    (item.organizerId === user?.id ? (
                      <Chip variant="outlined" label="Your Event" color="info" />
                    ) : item.participantsCount < item.maxParticipants ? (
                      <Button
                        startIcon={<HowToRegIcon />}
                        variant="contained"
                      >
                        Register
                      </Button>
                    ) : (
                      <Button variant="contained" color="primary" disabled>
                        Full
                      </Button>
                    ))}
                </CardActions>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </>
  );
};

export default ItemsCards;