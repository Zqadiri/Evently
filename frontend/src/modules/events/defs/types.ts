import { CrudObject } from "@common/defs/types";

export interface Event extends CrudObject{
  title: string;
  date: Date;
  location: string;
  description: string;
  maxParticipants: number;
  organizer: {
    id: number;
    name: string;
    email: string;
    profile_picture?: string;
  };
  category: {
    id: number;
    name: string;
  };
  participants: {
    id: number;
    full_name: string;
    email: string;
    profile_picture?: string;
  }[];
}