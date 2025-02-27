import { RHFTextField } from '@common/components/lib/react-hook-form';
import CreateCrudItemForm from '@common/components/partials/CreateCrudItemForm';
import Routes from '@common/defs/routes';
import { ItemResponse } from '@common/hooks/useItems';
import { Event } from '@modules/events/defs/types';
import useEvents, { CreateOneInput } from '@modules/events/hooks/api/useEvents';
import { Grid } from '@mui/material';
import { useRouter } from 'next/router';
import { UseFormReturn } from 'react-hook-form';
import * as Yup from 'yup';
import RHFDatePicker from '@common/components/lib/react-hook-form/RHFDatePicker';
import dayjs from 'dayjs';

interface CreateEventFormProps {}

const CreateEventForm = (_props: CreateEventFormProps) => {
  const router = useRouter();
  const schema = Yup.object().shape({
    name: Yup.string().required('The field is required'),
    date: Yup.date().required('The field is required'),
    location: Yup.string().required('The field is required'),
    description: Yup.string().required('The field is required'),
    maxParticipants: Yup.number().positive().required('The field is required'),
    image: Yup.string()
  });
  const defaultValues: CreateOneInput = {
    name: '',
      //@ts-ignore
    date: dayjs(new Date()),
    location: '',
    description: '',
    maxParticipants: 0,
    image: '',
  };
  const onPostSubmit = async (
    _data: CreateOneInput,
    response: ItemResponse<Event>,
    _methods: UseFormReturn<CreateOneInput>
  ) => {
    if (response.success) {
      router.push(Routes.Events.MyEvents);
    }
  };
  return (
    <>
      <CreateCrudItemForm<Event, CreateOneInput>
        routes={Routes.Events}
        useItems={useEvents}
        schema={schema}
        defaultValues={defaultValues}
        onPostSubmit={onPostSubmit}
      >
        <Grid container spacing={3} sx={{ padding: 6 }}>
          <Grid item xs={12} md={6}>
            <RHFTextField name="name" label="Name" />
          </Grid>
          <Grid item xs={12} md={6}>
            <RHFDatePicker name="date" label="Date" />
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
      </CreateCrudItemForm>
    </>
  );
};

export default CreateEventForm;
