import React from 'react'

import Modal, { modalRef } from '../../components/Modal'
import ModalInvite, { modalInviteRef } from '../../components/Modal/invite'
import { Box, Cover, Button, Text, Spacer } from '../../components'
import logo from '../../assets/images/logo.png'

const Login = () => {
    return (
        <>
            <Modal />
            <ModalInvite />

            <Box background="dark" align="center" justify="center" hasPadding>
                <Cover source={logo} width="90%" height="200px" />
                <Spacer size="100px" />
                <Button block onPress={() => modalRef.current?.open()}>Entrar na minha conta</Button>
                <Button block mode="text" onPress={() => modalInviteRef.current?.open()}>Pedir convite</Button>
                <Spacer size="30px" />
                <Text small hasPadding align="center">
                    Ao fazer login você concorda com nossos {' '} 
                    <Text underline color="primary" small>Termos e Condições </Text> e 
                    <Text underline color="primary" small> Política de Privacidade</Text>.
                </Text>
            </Box>
        </>
    )
}

export default Login