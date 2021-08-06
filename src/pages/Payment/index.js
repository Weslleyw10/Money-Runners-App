import React from 'react'

import { Box, Title, Text, Button, Spacer } from '../../components'
import { CreditCardInput } from 'react-native-credit-card-input'

import { colors } from '../../data/theme.json'

const Payment = () => {
    return (
        <Box background="dark" hasPadding>
            <Spacer size="40px" />
            <Box>
                <Title color="light">Payment</Title>
                <Spacer />
                <Text>
                    Mantenha a consistência correndo todos os dias para criar um novo hábito.
                    O desafio termina em 30/08/2021
                </Text>

                <Spacer size="40px" />
                <CreditCardInput 
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

            <Button block background="success">
                Pagar R$300,00
            </Button>
        </Box>
    )
}

export default Payment