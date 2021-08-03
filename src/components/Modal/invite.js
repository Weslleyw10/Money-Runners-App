import React, { createRef } from 'react'
import { Modalize } from 'react-native-modalize'

import { Box, Title, Spacer, Input, Button } from '../index'
import TextInputMask from '../TextInputMask'

export const modalInviteRef = createRef()

const ModalInvite = () => {
    return (
        <Modalize ref={modalInviteRef} adjustToContentHeight>
            <Box hasPadding background="dark">
                <Title color="light">Solicite um convite</Title>

                <Spacer />
                <Input label="Nome" placeholder="Digite seu nome" />

                <Spacer />
                <Input label="Email" placeholder="Digite seu email" />

                <Spacer />
                <TextInputMask
                    label="CPF"
                    placeholder="Digite seu cpf"
                    type={'cpf'}

                />

                <Spacer />
                <TextInputMask
                    label="Data de nascimento"
                    placeholder="Digite sua data de nasc."
                    type={'datetime'}
                    options={{
                        format: 'DD/MM/YYYY',
                    }}
                />

                <Spacer />
                <TextInputMask
                    label="Telefone"
                    placeholder="Digite seu telefone"
                    type={'cel-phone'}
                    options={{
                        maskType: 'BRL',
                        withDDD: true,
                        dddMask: '(99)'
                    }}
                />

                <Spacer />
                <Input secureTextEntry label="Senha" placeholder="Digite sua senha" />

                <Spacer />
                <Button block background="success">
                    Enviar dados
                </Button>
            </Box>
        </Modalize>
    )
}

export default ModalInvite