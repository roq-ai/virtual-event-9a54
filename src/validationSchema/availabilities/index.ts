import * as yup from 'yup';

export const availabilityValidationSchema = yup.object().shape({
  available: yup.boolean().required(),
  event_id: yup.string().nullable(),
  staff_id: yup.string().nullable(),
});
