import { NextPage } from 'next';
import { GetServerSideProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import withAuth, { AUTH_MODE } from '@modules/auth/hocs/withAuth';
import Routes from '@common/defs/routes';
import RequestPassword from '@modules/auth/components/pages/ResetPassword';

interface ResetPasswordPageProps {
  token: string;
}

const ResetPasswordPage: NextPage<ResetPasswordPageProps> = ({ token }) => {
  return (
    <>
      <RequestPassword token={token} />
    </>
  );
};
// @ts-ignore
export const getServerSideProps: GetServerSideProps<ResetPasswordPageProps> = async (context) => {
  const { locale, params } = context;
  const { token } = params!; // Extract the token from the URL

  if (!token) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      ...(await serverSideTranslations(locale!, ['topbar', 'footer', 'leftbar', 'common', 'auth'])),
      token,
    },
  };
};

// Wrap the page with the withAuth higher-order component
// @ts-ignore
export default withAuth(ResetPasswordPage, {
  mode: AUTH_MODE.LOGGED_OUT,
  redirectUrl: Routes.Common.Home,
});