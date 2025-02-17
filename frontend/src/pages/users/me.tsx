import { NextPage } from 'next';
import withAuth, { AUTH_MODE } from '@modules/auth/hocs/withAuth';
import Routes from '@common/defs/routes';
import { Box, Card, Grid, Avatar, Typography } from '@mui/material';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import PageHeader from '@common/components/lib/partials/PageHeader';
import FormProvider, { RHFTextField } from '@common/components/lib/react-hook-form';
import { Controller, useForm } from 'react-hook-form';
import { LoadingButton } from '@mui/lab';
import useAuth from '@modules/auth/hooks/api/useAuth';
import { LockOpen, Person } from '@mui/icons-material';
import useUsers, { UpdateOneInput } from '@modules/users/hooks/api/useUsers';
import RHFImageDropzone from '@common/components/lib/react-hook-form';

const MyProfile: NextPage = () => {
  const { user } = useAuth();
  const { updateOne } = useUsers();

  const ProfileSchema = Yup.object().shape({
    full_name: Yup.string().max(191, 'Le champ est trop long.').required('Le nom est obligatoire'),
    email: Yup.string()
      .max(191, 'Le champ est trop long.')
      .email("Le format de l'email est incorrect")
      .required("L'email est obligatoire"),
    password: Yup.string().max(191, 'Le champ est trop long.'),
    profile_picture: Yup.mixed().nullable(),
  });

  const methods = useForm<UpdateOneInput>({
    resolver: yupResolver(ProfileSchema),
    defaultValues: {
      full_name: user?.full_name || '',
      email: user?.email || '',
      password: '',
      profile_picture: user?.profile_picture,
    },
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
    setValue,
    watch,
  } = methods;

  const profilePicture = watch('profile_picture');

  const onSubmit = async (data: UpdateOneInput) => {
    if (!user) {
      return;
    }
    await updateOne(user.id, data, { displayProgress: true, displaySuccess: true });
  };

  const handleDrop = (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setValue('profile_picture', reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <Box sx={{ marginBottom: 4, display: 'flex', justifyContent: 'center' }}>
        <PageHeader title="Mon profil" />
      </Box>
      <Card sx={{ maxWidth: '500px', margin: 'auto' }}>
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <Grid container rowSpacing={3} columnSpacing={2} sx={{ padding: 5 }}>
            <Grid item xs={12} sx={{ textAlign: 'center' }}>
              <Controller
                name="profile_picture"
                control={methods.control}
                defaultValue={profilePicture}
                render={({ field }) => (
                  <RHFImageDropzone
                    accept="image/*"
                    maxSize={3145728}
                    onDrop={handleDrop}
                    helperText={
                      <Typography
                        variant="caption"
                        sx={{
                          mt: 2,
                          mx: 'auto',
                          display: 'block',
                          textAlign: 'center',
                          color: 'text.secondary',
                        }}
                      >
                        Allowed *.jpeg, *.jpg, *.png, *.gif
                        <br /> max size of 3.1MB
                      </Typography>
                    }
                  >
                    <Avatar
                      src={field.value}
                      alt="Profile Picture"
                      sx={{ width: 100, height: 100, mx: 'auto', mb: 2 }}
                    >
                      <Person sx={{ width: 60, height: 60 }} />
                    </Avatar>
                  </RHFImageDropzone>
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <RHFTextField name="full_name" label="Nom Complet" />
            </Grid>
            <Grid item xs={12}>
              <RHFTextField name="email" label="Email" />
            </Grid>
            <Grid item xs={12}>
              <RHFTextField name="password" label="Changer le mot de passe" type="password" />
            </Grid>
            <Grid item xs={12} sx={{ textAlign: 'center' }}>
              <LoadingButton
                size="large"
                variant="contained"
                type="submit"
                startIcon={<LockOpen />}
                loadingPosition="start"
                loading={isSubmitting}
              >
                Mettre à jour mes données
              </LoadingButton>
            </Grid>
          </Grid>
        </FormProvider>
      </Card>
    </>
  );
};

export default withAuth(MyProfile, { mode: AUTH_MODE.LOGGED_IN, redirectUrl: Routes.Auth.Login });