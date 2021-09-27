import * as Yup from 'yup';

export const LoginSchema = { email: '', password: '' };

export const LoginSchemaValidation = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email address')
    .required("Can't be blank"),
  password: Yup.string().required("Can't be blank"),
});
