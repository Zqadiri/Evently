import { RHFTextField } from '@common/components/lib/react-hook-form';
import UpdateCrudItemForm from '@common/components/partials/UpdateCrudItemForm';
import Routes from '@common/defs/routes';
import { Event } from '@modules/events/defs/types';
import useEvents, { UpdateOneInput } from '@modules/events/hooks/api/useEvents';
import { Grid } from '@mui/material';
import * as Yup from 'yup';
import dayjs from 'dayjs';
import { ItemResponse } from '@common/hooks/useItems';
import { UseFormReturn } from 'react-hook-form';
import { useRouter } from 'next/router';

interface UpdateEventFormProps {
  item: Event;
}

const UpdateEventForm = (props: UpdateEventFormProps) => {
  const router = useRouter();
  const { item } = props;
  const schema = Yup.object().shape({
    title: Yup.string().required('This field is required'),
    date: Yup.date().required('This field is required'),
    location: Yup.string().required('This field is required'),
    description: Yup.string().required('This field is required'),
    maxParticipants: Yup.number().positive().required('This field is required'),
  });
  const defaultValues: UpdateOneInput = {
    title: item.title,
      //@ts-ignore

    date: dayjs(item.date).format('YYYY-MM-DD hh:mm'),
    location: item.location,
    description: item.description,
    maxParticipants: item.maxParticipants,
  };
  console.log(item)

  const onPostSubmit = async (
    _data: UpdateOneInput,
    response: ItemResponse<Event>,
    _methods: UseFormReturn<UpdateOneInput>
  ) => {
    if (response.success) {
      console.log(Routes.Events.UpdateOne.replace('{id}', item.id.toString()))
      router.push(Routes.Events.UpdateOne.replace('{id}', item.id.toString()));
    }
  };
  return (
    <>
      <UpdateCrudItemForm<Event, UpdateOneInput>
        item={item}
        routes={Routes.Events}
        useItems={useEvents}
        schema={schema}
        defaultValues={defaultValues}
        onPostSubmit={onPostSubmit}
      >
        <Grid container spacing={3} sx={{ padding: 6 }}>
          <Grid item xs={12} md={6}>
            <RHFTextField name="title" label="Title" />
          </Grid>
          <Grid item xs={12} md={6}>
            <RHFTextField name="date" label="Date" />
          </Grid>
          <Grid item xs={12} md={6}>
            <RHFTextField name="location" label="Location" />
          </Grid>
          <Grid item xs={12} md={6}>
            <RHFTextField
              type="number"
              name="maxParticipants"
              label="Maximum Number of Participants"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <RHFTextField multiline rows={6} name="description" label="Description" />
          </Grid>
        </Grid>
      </UpdateCrudItemForm>
    </>
  );
};

export default UpdateEventForm;
