import * as yup from 'yup';

export const eventValidationSchema = yup.object().shape({
  name: yup.string().required(),
  description: yup.string(),
  organization_id: yup.string().nullable(),
  event_manager_id: yup.string().nullable(),
});
