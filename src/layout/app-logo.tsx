import { useSession } from '@roq/nextjs';
import { useGraphqlQuery } from 'lib/hooks/use-graphql-query';
import { Text, Box } from '@chakra-ui/react';

interface AppLogoProps {
  isMobile?: boolean;
}
export const AppLogo = (props: AppLogoProps) => {
  const { isMobile } = props;

  const ownerRoles = ['event-organizer', 'event-manager', 'event-staff', 'speaker'];
  const appName = `Virtual Event`;

  const { session } = useSession();
  const { data } = useGraphqlQuery({
    query: `
      query Tenant($id: ID!){
        tenant(id: $id) {
          name
        }
    }
    `,
    variables: {
      id: session?.user?.tenantId,
    },
  });
  const isOwner = ownerRoles.some((role) => session?.user?.roles?.includes(role));
  const tenantName = data?.tenant?.name;
  return (
    <Box maxW={{ lg: 'lg', base: '90%' }}>
      <Text isTruncated fontSize="lg" fontWeight="bold">
        {isOwner ? tenantName : appName}
      </Text>
    </Box>
  );
};
