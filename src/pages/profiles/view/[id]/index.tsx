import { Box, Center, Flex, Link, List, ListItem, Spinner, Stack, Text } from '@chakra-ui/react';
import Breadcrumbs from 'components/breadcrumb';
import { Error } from 'components/error';
import { FormListItem } from 'components/form-list-item';
import { FormWrapper } from 'components/form-wrapper';
import AppLayout from 'layout/app-layout';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { FunctionComponent, useState } from 'react';
import { routes } from 'routes';
import useSWR from 'swr';
import { compose } from 'lib/compose';
import {
  AccessOperationEnum,
  AccessServiceEnum,
  requireNextAuth,
  useAuthorizationApi,
  withAuthorization,
} from '@roq/nextjs';
import { UserPageTable } from 'components/user-page-table';

import { getProfileById } from 'apiSdk/profiles';
import { ProfileInterface } from 'interfaces/profile';

function ProfileViewPage() {
  const { hasAccess } = useAuthorizationApi();
  const router = useRouter();
  const id = router.query.id as string;
  const { data, error, isLoading, mutate } = useSWR<ProfileInterface>(
    () => (id ? `/profiles/${id}` : null),
    () =>
      getProfileById(id, {
        relations: ['user'],
      }),
  );

  const [deleteError, setDeleteError] = useState(null);
  const [createError, setCreateError] = useState(null);

  return (
    <AppLayout
      breadcrumbs={
        <Breadcrumbs
          items={[
            {
              label: 'Profiles',
              link: '/profiles',
            },
            {
              label: 'Profile Details',
              isCurrent: true,
            },
          ]}
        />
      }
    >
      <Box rounded="md">
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        {isLoading ? (
          <Center>
            <Spinner />
          </Center>
        ) : (
          <>
            <FormWrapper>
              <Stack direction="column" spacing={2} mb={4}>
                <Text
                  sx={{
                    fontSize: '1.875rem',
                    fontWeight: 700,
                    color: 'base.content',
                  }}
                >
                  Profile Details
                </Text>
              </Stack>
              <List spacing={3} w="100%">
                <FormListItem label="Bio:" text={data?.bio} />

                <FormListItem label="Presentation Details:" text={data?.presentation_details} />

                <FormListItem label="Created At:" text={data?.created_at as unknown as string} />

                <FormListItem label="Updated At:" text={data?.updated_at as unknown as string} />

                {hasAccess('user', AccessOperationEnum.READ, AccessServiceEnum.PROJECT) && (
                  <FormListItem
                    label="User:"
                    text={
                      <Link as={NextLink} href={`/users/view/${data?.user?.id}`}>
                        {data?.user?.email}
                      </Link>
                    }
                  />
                )}
              </List>
            </FormWrapper>
          </>
        )}
      </Box>
    </AppLayout>
  );
}

export default compose(
  requireNextAuth({
    redirectTo: '/',
  }),
  withAuthorization({
    service: AccessServiceEnum.PROJECT,
    entity: 'profile',
    operation: AccessOperationEnum.READ,
  }),
)(ProfileViewPage);
