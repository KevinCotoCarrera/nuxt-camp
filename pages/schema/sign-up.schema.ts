import * as Yup from 'yup'

const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/;

export const SignupSchema = Yup.object().shape({
    email: Yup.string().email('Please insert a valid email').required('Please enter your email'),
    password: Yup
    .string()
    .required('Please Enter your password')
    .matches(
        passwordRules,
        "Please provide a stronger password",
      ),
  confirmedPassword: Yup
    .string()
    .required('Please confirm your password')
    //@ts-ignore
    .oneOf([Yup.ref("password"), null], "Passwords must match")
})