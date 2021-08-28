import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import AsyncStorage from '@react-native-async-storage/async-storage'

import { setReducer } from '../../store/modules/app/actions'
import { replace } from '../../services/navigation'

import Modal, { modalRef } from '../../components/Modal'
import ModalInvite, { modalInviteRef } from '../../components/Modal/invite'
import { Box, Cover, Button, Text, Spacer, ActivityIndicator } from '../../components'
import logo from '../../assets/images/logo.png'

const Login = () => {
    const dispatch = useDispatch()
    const [loadingState, setLoadingState] = useState(true)

    const getLogeedState = async () => {
        // await AsyncStorage.clear()
        const user = await AsyncStorage.getItem('@user')
        const tour = await AsyncStorage.getItem('@tour')

        if (!tour) {
            replace('Tour')
            return false
        }

        if (!user) {
            setLoadingState(false)
        } else {
            console.log('AQUI')
            dispatch(setReducer(JSON.parse(user), 'user'))
            replace('Home')
        }
    }

    useEffect(() => {
        getLogeedState()
    }, [])

    return (
        <>
            <Modal />
            <ModalInvite />

            <Box background="dark" align="center" justify="center" hasPadding>
                <Cover source={logo} width="90%" height="200px" />
                <Spacer size="100px" />
                {loadingState && <ActivityIndicator size="large" /> }

                {!loadingState && (
                    <>
                        <Button block onPress={() => modalRef.current?.open()}>Entrar na minha conta</Button>
                        <Button block mode="text" onPress={() => modalInviteRef.current?.open()}>Pedir convite</Button>
                        <Spacer size="30px" />
                        <Text small hasPadding align="center">
                            Ao fazer login você concorda com nossos {' '}
                            <Text underline color="primary" small>Termos e Condições </Text> e
                            <Text underline color="primary" small> Política de Privacidade</Text>.
                        </Text>
                    </>
                )}
            </Box>
        </>
    )
}

export default Login