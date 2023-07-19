import * as yup from 'yup';

export const profileValidationSchema = yup.object().shape({
  bio: yup.string(),
  presentation_details: yup.string(),
  speaker_id: yup.string().nullable(),
});
