import { EventInterface } from 'interfaces/event';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface AvailabilityInterface {
  id?: string;
  event_id?: string;
  staff_id?: string;
  available?: boolean;
  created_at?: any;
  updated_at?: any;

  event?: EventInterface;
  user?: UserInterface;
  _count?: {};
}

export interface AvailabilityGetQueryInterface extends GetQueryInterface {
  id?: string;
  event_id?: string;
  staff_id?: string;
}
