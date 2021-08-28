import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Alert } from 'react-native';
import { CreditCardInput } from 'react-native-credit-card-input'

import { colors } from '../../data/theme.json'
import PaymentSchema from '../../schemas/payment.schema'
import { Box, Title, Text, Button, Spacer } from '../../components'
import { setReducer, joinChallenge } from '../../store/modules/app/actions'

const Payment = () => {
    const dispatch = useDispatch()
    const { form, challenge, payment } = useSelector(state => state.app)

    const joinChallengeHandle = async () => {
        try {
            await PaymentSchema.validate(payment)
            dispatch(joinChallenge())

        } catch ({ errors }) {
            Alert.alert(errors[0], 'Corrija o erro antes de continuar.')            
        }
    }

    const setPayment = ({ number, cvc, expiry, name }) => {
        dispatch(
            setReducer({
                card_number: number?.split(' ').join(''),
                card_cvv: cvc,
                card_expiration_date: expiry?.replace('/', ''),
                card_holder_name: name
            }, 'payment')
        )
    }

    return (
        <Box background="dark" hasPadding>
            <Spacer size="40px" />
            <Box>
                <Title color="light">{challenge?.title}</Title>
                <Spacer />
                <Text>
                    {challenge?.description}
                </Text>

                <Spacer size="40px" />
                <CreditCardInput
                    onChange={({ values }) => setPayment(values)}
                    allowScroll
                    requiresName
                    placeholders={{
                        number: '**** **** **** ****',
                        expiry: 'MM/YY',
                        cvc: 'CVC',
                        name: 'NOME COMPLETO'
                    }}
                    labels={{
                        number: 'NÚMERO DO CARTÃO',
                        expiry: 'DATA EXP.',
                        cvc: 'CVC/CCV',
                        name: 'NOME NO CARTÃO'
                    }}
                    labelStyle={{
                        color: colors.light
                    }}
                    inputStyle={{
                        color: colors.light
                    }}
                />
            </Box>

            <Button 
                onPress={() => joinChallengeHandle()} 
                block 
                background="success"
                disabled={form?.saving}
                loading={form?.saving}            
            >
                Pagar R${challenge?.fee}
            </Button>
        </Box>
    )
}

export default Payment