import { Button, Card, CardActions, CardContent, Grid, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import useEvents from "./hooks/api/useEvents";
import { Event } from "./defs/types";
import dayjs from "dayjs";

interface EventCardProps {
	event: Event;
}

const EventCard = ({ event }: EventCardProps) => {
	// const { t } = useTranslation(['event']);

	return (
		<Card sx={{ minWidth: 275, margin: 2 }}>
			<CardContent>
				<Typography variant="h6" component="div">
					{event.title}
				</Typography>

				<Typography sx={{ mb: 1.5 }} color="text.secondary">
					Date: {dayjs(event.date).format('DD/MM/YYYY hh:mm A')}
				</Typography>

				<Typography variant="body2">
					Location: {event.location}
				</Typography>

				<Typography variant="body2">
					Description: {event.description}
				</Typography>
				<Typography variant="body2">
					Participants:
					{event.participants.length > 0 ? (
						<ul style={{ margin: 0, paddingLeft: 20 }}>
							{event.participants.map((participant) => (
								<li key={participant.id}>
									{participant.full_name} ({participant.email})
								</li>
							))}
						</ul>
					) : (
						' No participants yet.'
					)}
				</Typography>

				<Typography variant="body2">
					Organizer: {event.organizer.name} ({event.organizer.email})
				</Typography>

				<Typography variant="body2">
					Category: {event.category.name}
				</Typography>
			</CardContent>

			<CardActions>
				<Button size="small" color="error">
					Join
				</Button>
			</CardActions>
		</Card>
	);
};

const EventsGrid = () => {
	const { data: events, isLoading, isError } = useEvents();

	console.log('>>>> data:' + events)
	if (isLoading) return <div>Loading...</div>;
	if (isError) return <div>Error fetching events.</div>;

	return (
		<Grid container spacing={2}>
			{events?.map((event) => (
				<Grid item key={event.id} xs={12} sm={6} md={4} lg={3}>
					<EventCard event={event} />
				</Grid>
			))}
		</Grid>
	);
};

export default EventsGrid;