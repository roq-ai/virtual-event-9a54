import { AvailabilityInterface } from 'interfaces/availability';
import { OrganizationInterface } from 'interfaces/organization';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface EventInterface {
  id?: string;
  name: string;
  description?: string;
  organization_id?: string;
  event_manager_id?: string;
  created_at?: any;
  updated_at?: any;
  availability?: AvailabilityInterface[];
  organization?: OrganizationInterface;
  user?: UserInterface;
  _count?: {
    availability?: number;
  };
}

export interface EventGetQueryInterface extends GetQueryInterface {
  id?: string;
  name?: string;
  description?: string;
  organization_id?: string;
  event_manager_id?: string;
}
