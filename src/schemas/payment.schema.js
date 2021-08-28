import * as yup from 'yup'
import valid from 'card-validator'

let PaymentSchema = yup.object().shape({
    card_number: yup
        .string()
        .test({
            name: 'credit_card_validation',
            message: 'Número do cartão de crédito inválido',
            test: (cc_number) => valid.number(cc_number).isValid
        })
        .required('Informe o número do cartão de crédito.'),
    card_cvv: yup
        .string()
        .min(3, 'Informe um código de segurança do cartão de crédito válido')
        .required(3, 'Informe o código de segurança do cartão de crédito.'),
    card_expiration_date: yup
        .string()
        .min(4, 'A data de expiração do cartão de crédito precisa conter mês e ano (MM/YY).')
        .required(3, 'Informe a data de expiração do cartão de crédito.'),
    card_holder_name: yup
        .string()
        .required(3, 'Informe o nome impresso no cartão de crédito.'),
})

export default PaymentSchema