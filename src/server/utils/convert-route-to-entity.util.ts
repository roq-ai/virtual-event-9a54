const mapping: Record<string, string> = {
  availabilities: 'availability',
  events: 'event',
  organizations: 'organization',
  profiles: 'profile',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
