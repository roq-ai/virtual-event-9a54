import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  Flex,
} from '@chakra-ui/react';
import Breadcrumbs from 'components/breadcrumb';
import DatePicker from 'components/date-picker';
import { Error } from 'components/error';
import { FormWrapper } from 'components/form-wrapper';
import { NumberInput } from 'components/number-input';
import { SelectInput } from 'components/select-input';
import { AsyncSelect } from 'components/async-select';
import { TextInput } from 'components/text-input';
import AppLayout from 'layout/app-layout';
import { FormikHelpers, useFormik } from 'formik';
import { useRouter } from 'next/router';
import { FunctionComponent, useState } from 'react';
import * as yup from 'yup';
import { AccessOperationEnum, AccessServiceEnum, requireNextAuth, withAuthorization } from '@roq/nextjs';
import { compose } from 'lib/compose';

import { createAvailability } from 'apiSdk/availabilities';
import { availabilityValidationSchema } from 'validationSchema/availabilities';
import { EventInterface } from 'interfaces/event';
import { UserInterface } from 'interfaces/user';
import { getEvents } from 'apiSdk/events';
import { getUsers } from 'apiSdk/users';
import { AvailabilityInterface } from 'interfaces/availability';

function AvailabilityCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: AvailabilityInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createAvailability(values);
      resetForm();
      router.push('/availabilities');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<AvailabilityInterface>({
    initialValues: {
      available: false,
      event_id: (router.query.event_id as string) ?? null,
      staff_id: (router.query.staff_id as string) ?? null,
    },
    validationSchema: availabilityValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout
      breadcrumbs={
        <Breadcrumbs
          items={[
            {
              label: 'Availabilities',
              link: '/availabilities',
            },
            {
              label: 'Create Availability',
              isCurrent: true,
            },
          ]}
        />
      }
    >
      <Box rounded="md">
        <Box mb={4}>
          <Text as="h1" fontSize={{ base: '1.5rem', md: '1.875rem' }} fontWeight="bold" color="base.content">
            Create Availability
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        <FormWrapper onSubmit={formik.handleSubmit}>
          <FormControl id="available" display="flex" alignItems="center" mb="4" isInvalid={!!formik.errors?.available}>
            <FormLabel htmlFor="switch-available">Available</FormLabel>
            <Switch
              id="switch-available"
              name="available"
              onChange={formik.handleChange}
              value={formik.values?.available ? 1 : 0}
            />
            {formik.errors?.available && <FormErrorMessage>{formik.errors?.available}</FormErrorMessage>}
          </FormControl>
          <AsyncSelect<EventInterface>
            formik={formik}
            name={'event_id'}
            label={'Select Event'}
            placeholder={'Select Event'}
            fetcher={getEvents}
            labelField={'name'}
          />
          <AsyncSelect<UserInterface>
            formik={formik}
            name={'staff_id'}
            label={'Select User'}
            placeholder={'Select User'}
            fetcher={getUsers}
            labelField={'email'}
          />
          <Flex justifyContent={'flex-start'}>
            <Button
              isDisabled={formik?.isSubmitting}
              bg="state.info.main"
              color="base.100"
              type="submit"
              display="flex"
              height="2.5rem"
              padding="0rem 1rem"
              justifyContent="center"
              alignItems="center"
              gap="0.5rem"
              mr="4"
              _hover={{
                bg: 'state.info.main',
                color: 'base.100',
              }}
            >
              Submit
            </Button>
            <Button
              bg="neutral.transparent"
              color="neutral.main"
              type="button"
              display="flex"
              height="2.5rem"
              padding="0rem 1rem"
              justifyContent="center"
              alignItems="center"
              gap="0.5rem"
              mr="4"
              onClick={() => router.push('/availabilities')}
              _hover={{
                bg: 'neutral.transparent',
                color: 'neutral.main',
              }}
            >
              Cancel
            </Button>
          </Flex>
        </FormWrapper>
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
    entity: 'availability',
    operation: AccessOperationEnum.CREATE,
  }),
)(AvailabilityCreatePage);
