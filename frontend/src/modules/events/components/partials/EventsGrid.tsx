import useEvents from "../../hooks/api/useEvents";
import { Event } from "../../defs/types";
import { CreateOneInput, UpdateOneInput } from '@modules/events/hooks/api/useEvents';
import { CrudRow } from "@common/defs/types";
import ItemsCards from "@common/components/partials/ItemsCards";

interface EventCardProps {
	fetchItems?: boolean;
	ownItems?: boolean;
	registredtems?: boolean;
	filterToolbar?: boolean;
}

export interface Row extends CrudRow {
	title: string;
	date: Date;
	location: string;
	description: string;
	// image: string;
	maxParticipants: number;
	organizerId: number;
	organizerName: string;
	categoryId: number;
	categoryName: string;
	participantsCount:number;
	// participants: {}[],
}

const EventsGrid = (props: EventCardProps) => {
	const {fetchItems, ownItems, filterToolbar, registredtems } = props;
	const itemToRow = (item: Event): Row => {
	  return {
		id: item.id,
		title: item.title,
		date: item.date,
		location: item.location,
		description: item.description,
		image: item.image,
		maxParticipants: item.maxParticipants,
		organizerId: item.organizer.id,
		organizerName: item.organizer?.fullName,
		categoryId: item.category.id,
		categoryName: item.category.name,
		participantsCount: item.participantsCount,
	  };
	};
  
	return (
	  <>
		<ItemsCards<Event, CreateOneInput, UpdateOneInput, Row>
		  useItems={useEvents}
		  itemToRow={itemToRow}
		  fetchItems={fetchItems}
		  ownItems={ownItems}
		  registredtems={registredtems}
		  filterToolbar={filterToolbar}
		/>
	  </>
	);
  };

export default EventsGrid;