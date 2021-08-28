import * as yup from 'yup'
import { validate } from 'gerador-validador-cpf'

let InviteSchema = yup.object().shape({
    name: yup
        .string()
        .min(5, 'Name must be a string.')
        .required(),
    email: yup        
        .string()
        .email('Email must be valid.')
        .required('Email must be a string.'),
    photo: yup
        .string()
        .required('Photo must be a string.'),
    document: yup
        .string()
        .test({
            name: 'cpf_validation',
            message: 'document must be valid.',
            test: (document) => validate(document)
        })
        .required('Cpf must be a string.'),
    phone: yup
        .string()
        .length(14, 'Phone must be valid.')
        .required('Phone must be valid.'),
    birthday: yup
        .string()
        .length(10, 'Birthday must be valid.')
        .required('Birthday must be valid.'),

    password: yup
        .string()
        .required('Password must be valid.'),
    
    confirmPassword: yup
        .string()
        .oneOf([yup.ref('password')], "Passwords must be equals.")
        .required('Confirm password.')
})

export default InviteSchema