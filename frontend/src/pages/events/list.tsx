import EventsGrid from "@modules/events/EventsGrid";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

interface event{
    title: string;
    date: string;
    location: string;
    max_participants: string;
    participants: string[];
}

const list = () => {
    return (
        <>
            <EventsGrid/>
        </>
    )
};

export const getStaticProps = async ({ locale }: { locale: string }) => ({
    props: {
      ...(await serverSideTranslations(locale, ['topbar', 'footer', 'leftbar', 'sign-in', 'common'])),
    },
});

export default list;