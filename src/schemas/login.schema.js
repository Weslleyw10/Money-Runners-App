import * as yup from 'yup'

let LoginSchema = yup.object().shape({
    email: yup        
    .string()
    .email('Email must be valid.')
    .required('Email must be a string.'),
    password: yup
    .string()
    .required('Password must be valid.')
})

export default LoginSchema