import { NextPage } from 'next';
import { useEffect, useState } from 'react';
import withAuth, { AUTH_MODE } from '@modules/auth/hocs/withAuth';
import Routes from '@common/defs/routes';
import { Box, Card, Grid, Avatar, Typography, Button } from '@mui/material';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import PageHeader from '@common/components/lib/partials/PageHeader';
import FormProvider, { RHFTextField } from '@common/components/lib/react-hook-form';
import { Controller, useForm } from 'react-hook-form';
import { LoadingButton } from '@mui/lab';
import useAuth from '@modules/auth/hooks/api/useAuth';
import { Person } from '@mui/icons-material';
import useUsers, { UpdateOneInput } from '@modules/users/hooks/api/useUsers';
import RHFImageDropzone from '@common/components/lib/react-hook-form';
import { Any } from '@common/defs/types';


const MyProfile: NextPage = () => {
  const { user } = useAuth();
  const { updateOne } = useUsers();

  // State to store the original profile picture
  const [originalProfilePicture, setOriginalProfilePicture] = useState<string | null>(null);

  // Set the original profile picture when the component mounts
  useEffect(() => {
    console.log('user: ' + user?.id + user?.name + user?.profile_picture + user?.email)
    if (user?.profile_picture) {
      setOriginalProfilePicture(user.profile_picture);
    }
  }, [user]);

  const ProfileSchema = Yup.object().shape({
    full_name: Yup.string().max(191, 'Le champ est trop long.').required('Le nom est obligatoire'),
    email: Yup.string()
      .max(191, 'Le champ est trop long.')
      .email("Le format de l'email est incorrect")
      .required("L'email est obligatoire"),
    password: Yup.string().max(191, 'Le champ est trop long.'),
    // confirm_password: Yup.string()
    //   .oneOf([Yup.ref('password'), null], 'Les mots de passe doivent correspondre')
    //   .when('password', {
    //     is: (val: string) => (val && val.length > 0 ? true : false),
    //     then: Yup.string().required('La confirmation du mot de passe est requise'),
    //   }),
    profile_picture: Yup.mixed().nullable(),
  });

  const methods = useForm<UpdateOneInput & { confirm_password: string }>({
    resolver: yupResolver(ProfileSchema),
    defaultValues: {
      full_name: user?.name || '',
      email: user?.email || '',
      password: '',
      confirm_password: '',
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

  const onSubmit = async (data: UpdateOneInput & { confirm_password: string }) => {
    if (!user) {
      return;
    }
    // Remove confirm_password from the data before sending it to the API
    const { confirm_password, ...updateData } = data;
    await updateOne(user.id, updateData, { displayProgress: true, displaySuccess: true });
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setValue('profile_picture', reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCancelUpload = () => {
    // Reset the profile picture to the original value
    if (originalProfilePicture)
      setValue('profile_picture', originalProfilePicture);
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
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 2 }}>
                <Avatar src={profilePicture || originalProfilePicture as Any}
                  alt="Profile Picture"
                  sx={{ width: 100, height: 100 }}
                >
                  {!profilePicture && !originalProfilePicture && <Person sx={{ width: 60, height: 60 }} />}
                </Avatar>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                  <Controller
                    name="profile_picture"
                    control={methods.control}
                    defaultValue={profilePicture}
                    render={({ field }) => (
                      // <RHFImageDropzone
                      //   accept='image/*'
                      //   maxSize={3145728}
                      //   // onDrop={handleDrop}
                      // >
                        <Button variant="contained" component="label">
                          Upload New Picture
                          <input type="file" hidden accept="image/*" onChange={handleFileChange} />
                        </Button>
                      // </RHFImageDropzone>
                    )}
                  />

                  <Button
                    variant="outlined"
                    color="error"
                    onClick={handleCancelUpload}
                    disabled={profilePicture === originalProfilePicture}
                  >
                    Cancel
                  </Button>
                </Box>
              </Box>
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
            <Grid item xs={12}>
              <RHFTextField name="confirm_password" label="Confirmer le mot de passe" type="password" />
            </Grid>
            <Grid item xs={12} sx={{ textAlign: 'center' }}>
              <LoadingButton
                size="large"
                variant="contained"
                type="submit"
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