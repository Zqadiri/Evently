import { CrudRow } from '@common/defs/types';
import { UseItems } from '@common/hooks/useItems';
import { ChairOutlined, PersonAdd, PlaceOutlined, Schedule } from '@mui/icons-material';

import {
  Button,
  Card,
  CardActions,
  CardContent,
  Stack,
  Typography,
  Grid,
  Chip,
  Box,
  Skeleton,
} from '@mui/material';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import dayjs from 'dayjs';
import useAuth from '@modules/auth/hooks/api/useAuth';
import FilterToolbar from '@common/components/partials/FilterToolbar';
import useFilter from '@common/hooks/useFilter';

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
    filterToolbar
  } = props;
  const router = useRouter();
  const filterItems = useFilter();
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

  const filteredRows = rows.filter((item) => {
    const matchesSearch = item.title.toLowerCase().includes(filterItems.search.toLowerCase());
    const matchesLocation = item.location
      .toLowerCase()
      .includes(filterItems.location.toLowerCase());

    return (
      matchesSearch &&
      matchesLocation
    );
  });

  return (
    <>
      <Box sx={{ minHeight: 550, px: 2 }}>
        {filterToolbar && <FilterToolbar filterItems={filterItems} />}
        {!items ? (
          <>
            <Grid container spacing={4} marginTop={6}>
              {Array.from(Array(4)).map((_, index) => (
                <Grid item xs={12} sm={6} md={3} key={index}>
                  <Skeleton variant="rounded" height={350} />
                </Grid>
              ))}
            </Grid>
          </>
        ) : (
          <Grid container spacing={4} marginTop={2}>
            {filteredRows.map((item) => {
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
                        <Schedule sx={{ color: 'primary.darker', fontSize: '20px', mr: 1 }} />
                        <Typography variant="body1">
                          {dayjs(item.date).format('ddd, MMM D, YYYY | h:mm A')}
                        </Typography>
                      </Stack>
                      <Stack direction="row" alignItems="center" spacing={2} my={1}>
                        <PlaceOutlined sx={{ color: 'primary.darker', fontSize: '20px', mr: 1 }} />
                        <Typography variant="body1">{item.location}</Typography>
                      </Stack>
                      <Stack direction="row" alignItems="center" spacing={2} my={1}>
                        <ChairOutlined sx={{ color: 'primary.darker', fontSize: '20px', mr: 1 }} />
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
                            startIcon={<PersonAdd />}
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
        )}
      </Box>
    </>
  );
};
export default ItemsCards;