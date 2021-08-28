import React, { useEffect } from 'react'
import { Alert } from 'react-native'
import * as ImagePicker from 'expo-image-picker'
import { MaterialCommunityIcons as Icon } from '@expo/vector-icons'

import { Box, Cover, Text, Button, Spacer } from '../../components/index'
import utils from '../../utils'
import colors from '../../data/theme.json'

const Uploader = ({ callback = () => {}, image = null }) => {
    const requestAccess = async () => {
        const { status } = await ImagePicker.requestCameraPermissionsAsync()
        if (status !== 'granted') {
            Alert.alert(
                'Permissão negada.',
                'Desculpe, mas precisamos acessar suas fotos.',
                [
                    {
                        text: 'Permitir Acesso',
                        onPress: () => {
                            requestAccess()
                        },
                        style: 'cancel'
                    },
                    {
                        text: 'Cancelar',
                    }
                ]
            )
        }
    }

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1
        })

        callback(result)
    }

    useEffect(() => {
        requestAccess()
    })

    return (
        <>
        {image && (
            <Box
            width="100%"
            background="dark50"
            justify="center"
            align="center"
            hasPadding
            >
                <Cover
                width="200px"
                height="200px"
                mode="cover"
                circle
                justify="center"
                hasPadding
                source={{uri: image}}
            />
            </Box>
        )}

        {!image && (
                <Box
                    background="dark50"
                    justify="flex-end"
                    align="center"
                    height="200px"
                >
                    <>
                        <Icon
                            name="image"
                            size={65}
                            color="#fff"
                        />
                        <Text color="light">Selecione uma imagem</Text>
                        <Spacer />
                    </>
                </Box>
        )}

        <Button 
            onPress={() => pickImage()} 
            block
        >
            Galeria
        </Button>
        </>

    )
}

export default Uploader