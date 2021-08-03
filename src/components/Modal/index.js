import React, { createRef } from 'react'
import { Modalize } from 'react-native-modalize'

import { Box, Title, Spacer, Input, Button } from '../index'

export const modalRef = createRef()

const Modal = () => {
    return (
        <Modalize ref={modalRef} adjustToContentHeight>
            <Box hasPadding background="dark">
                <Title color="light">Entre com seus dados</Title>
                <Spacer />

                <Input label="E-mail" placeholder="Digite seu e-mail" />
                <Spacer />
                <Input secureTextEntry label="Senha" placeholder="Digite sua senha" />
                <Spacer />

                <Button block background="success">
                    Fazer Login
                </Button>
            </Box>
        </Modalize>
    )
}

export default Modal