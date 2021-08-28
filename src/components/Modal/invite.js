import React, { createRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Modalize } from 'react-native-modalize'
import { Alert } from 'react-native'

import { Box, Title, Spacer, Input, Button } from '../index'
import TextInputMask from '../TextInputMask'
import Uploader from '../Uploader'

import InviteSchema from '../../schemas/invite.schema'

import { 
    setUser as setUserAction,
    saveUser as saveUserAction
} from '../../store/modules/app/actions'

export const modalInviteRef = createRef()

const ModalInvite = () => {
    const dispatch = useDispatch()
    const { userForm, form } = useSelector(state => state.app)

    const setUserHandle = (payload) => {
        dispatch(setUserAction(payload))
    }

    const requestInvite = async () => {
        try {
            await InviteSchema.validate(userForm)
            dispatch(saveUserAction())
        } catch ({ errors }) {
            Alert.alert(errors[0], 'Corrija o erro antes de continuar.')
        }
    }

    return (
        <Modalize ref={modalInviteRef} adjustToContentHeight>
            <Box hasPadding background="dark">
                <Title color="light">Solicite um convite</Title>
                <Spacer />
                <Uploader 
                    image={userForm?.photo}
                    callback={(photo) => setUserHandle({ photo: photo?.uri }) } 
                />
                <Spacer />

                <Input
                    onChangeText={(name) => setUserHandle({ name })}
                    label="Nome"
                    value={userForm?.name}
                    disabled={form?.saving}
                    placeholder="Digite seu nome" 
                />

                <Spacer />
                <Input
                    onChangeText={(email) => setUserHandle({ email })}
                    label="Email"
                    value={userForm?.email}
                    disabled={form?.saving}
                    placeholder="Digite seu email"
                />

                <Spacer />
                <TextInputMask
                    onChangeText={(document) => setUserHandle({ document })}
                    label="CPF"
                    value={userForm?.document}
                    disabled={form?.saving}
                    placeholder="Digite seu cpf"
                    type={'cpf'}
                />

                <Spacer />
                <TextInputMask
                    onChangeText={(birthday) => setUserHandle({ birthday })}
                    value={userForm?.birthday}
                    disabled={form?.saving}
                    label="Data de nascimento"
                    placeholder="Digite sua data de nasc."
                    type={'datetime'}
                    options={{
                        format: 'DD/MM/YYYY',
                    }}
                />

                <Spacer />
                <TextInputMask
                    onChangeText={(phone) => setUserHandle({ phone })}
                    value={userForm?.phone}
                    disabled={form?.saving}
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
                <Input
                    onChangeText={(password) => setUserHandle({ password })}
                    value={userForm?.password}
                    disabled={form?.saving}
                    secureTextEntry
                    label="Senha"
                    placeholder="Digite sua senha"
                />

                <Spacer />
                <Input
                    onChangeText={(confirmPassword) => setUserHandle({ confirmPassword })}
                    value={userForm?.confirmPassword}
                    disabled={form?.saving}
                    secureTextEntry
                    label="Confirme sua senha"
                    placeholder="Confirme sua senha"
                />

                <Spacer />
                <Button 
                    onPress={() => requestInvite()} 
                    block 
                    background="success"
                    disabled={form?.saving}
                    loading={form?.saving}
                >
                    Enviar dados
                </Button>
            </Box>
        </Modalize>
    )
}

export default ModalInvite