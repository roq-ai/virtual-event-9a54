interface AppConfigInterface {
  ownerRoles: string[];
  customerRoles: string[];
  tenantRoles: string[];
  tenantName: string;
  applicationName: string;
  addOns: string[];
}
export const appConfig: AppConfigInterface = {
  ownerRoles: ['Event Organizer'],
  customerRoles: [],
  tenantRoles: ['Event Organizer', 'Event Manager', 'Event Staff', 'Speaker'],
  tenantName: 'Organization',
  applicationName: 'Virtual Event',
  addOns: ['notifications', 'chat'],
};
