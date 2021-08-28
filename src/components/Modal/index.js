import React, { createRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Modalize } from 'react-native-modalize'
import { Alert } from 'react-native'

import { Box, Title, Spacer, Input, Button } from '../index'

import { signin as signinAction, setUser as setUserAction } from '../../store/modules/app/actions'
import LoginSchema from '../../schemas/login.schema'

export const modalRef = createRef()

const Modal = () => {
    const dispatch = useDispatch()
    const { userForm, form } = useSelector(state => state.app)

    const setUserHandle = (payload) => {
        dispatch(setUserAction(payload))
    }

    const loginHandle = async () => {
        try {
            await LoginSchema.validate(userForm)
            dispatch(signinAction())
        } catch ({ errors }) {
            Alert.alert(errors[0], 'Corrija o erro para continuar.')
        }
    }

    return (
        <Modalize ref={modalRef} adjustToContentHeight>
            <Box hasPadding background="dark">
                <Title color="light">Entre com seus dados</Title>
                <Spacer />

                <Input 
                    onChangeText={(email) => setUserHandle({ email })}
                    keyboardType="email-address"
                    label="E-mail" 
                    placeholder="Digite seu e-mail"
                    value={userForm?.email}
                    disabled={form?.loading}
                />

                <Spacer />
                <Input 
                    onChangeText={(password) => setUserHandle({ password })}
                    secureTextEntry 
                    label="Senha" 
                    placeholder="Digite sua senha" 
                />

                <Spacer />

                <Button 
                    onPress={() => loginHandle()} 
                    block 
                    background="success"
                    loading={form?.loading}
                    disabled={form?.loading}                    
                >
                    Fazer Login
                </Button>
            </Box>
        </Modalize>
    )
}

export default Modal