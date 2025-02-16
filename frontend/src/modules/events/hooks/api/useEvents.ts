import { useState, useEffect } from 'react';
import useFetch from '@common/hooks/useFetch';
import { Event } from '@modules/events/defs/types';

const useEvents = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);
  const { makeFetch } = useFetch<{ data: Event[] }>();

  const url = `${process.env.NEXT_PUBLIC_API_URL}/events`;

  useEffect(() => {
    const fetchEvents = async () => {
      const token = localStorage.getItem('authToken');

      if (!token) {
        console.error('No token found in local storage');
        setIsError(true);
        setIsLoading(false);
        return;
      }

      try {
        const response = await makeFetch(url, {
          verbose: true,
          displayProgress: true,
          request: {
            method: 'GET',
            headers: new Headers({
              'Accept': 'application/json',
              'Authorization': `Bearer ${token}`,
            }),
          },
        });

        console.log('API Event Response:', response);

        if (response && response.data && Array.isArray(response.data)) {
          setEvents(response.data);
          setIsError(false);
        } else {
          setEvents([]);
          setIsError(true);
        }
      } catch (error) {
        console.error('Error fetching events:', error);
        setEvents([]);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEvents();
  }, [makeFetch, url]);

  return { data: events, isLoading, isError };
};

export default useEvents;