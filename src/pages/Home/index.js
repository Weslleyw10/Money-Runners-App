import React from 'react'
import YoutubePlayer from "react-native-youtube-iframe";

import {
    Box,
    ScrollView,
    Text,
    GradientView,
    Title,
    Spacer,
    Cover,
    ProgressCircle,
    Touchable,
    ActivityIndicator,
    Button,
    FlatList,
    Badge
} from '../../components'
import { colors } from '../../data/theme.json'

const Home = () => {
    return (
        <ScrollView background="dark">
            <GradientView
                end={{ x: 0, y: 1 }}
                locations={[-0.5, 1]}
                colors={[
                    colors.primary,
                    colors.secondary
                ]}
                hasPadding
            >
                <Box justify="center" spacing="0 0 0 0" align="center">
                    <Box justify="center" align="center" spacing="20px 0 0">
                        <ProgressCircle progress={0.5} />
                        <Cover
                            width="100px"
                            height="100px"
                            circle
                            image={'https://image.freepik.com/vetores-gratis/personagem-de-empresario-com-raiva-sentado-em-uma-cadeira-de-escritorio-a-mesa-e-olhando-no-visor-ilustracao-em-vetor-de-um-jovem-trabalhador-usando-oculos-com-emocao-negativa-isolada-em-um-branco_177953-304.jpg'}
                        />

                    </Box>

                    <Spacer size='30px' />
                    <Title color="light">Weslley L Silva</Title>
                    <Spacer size="5px" />
                    <Text>weslleylopes.dev@gmail.com</Text>

                    <Touchable
                        spacing="30px 0 0"
                        hasPadding
                        background="success"
                        height="100px"
                    >
                        <Text color="dark">Saldo conquistado</Text>
                        <Spacer />
                        <Title color="light">R$ 29,90</Title>
                    </Touchable>
                </Box>
                <Spacer size="20px" />
            </GradientView>

            <Box hasPadding spacing="-50px 0 0">

                {/* Find informations */}
                {/* <Box
                    background="dark50"
                    hasPadding
                    radius="3px"
                    align="center"
                >
                    <ActivityIndicator />
                    <Spacer size="20px"/>
                    <Title color="light" small>Buscando informações</Title>
                    <Text>Aguarde alguns instantes...</Text>
                </Box> */}

                {/* Not found informations */}
                {/* <Box
                    background="dark50"
                    hasPadding
                    radius="3px"
                    align="center"
                >
                    <Spacer size="20px"/>
                    <Title color="light" small>Você ainda não tem desafios.</Title>
                    <Spacer size="20px"/>
                    <Button block background="success">Recarregar...</Button>
                </Box> */}

                {/* Exists challenges */}
                {/* <>
                    <Box
                        background="dark50"
                        hasPadding
                        radius="3px"
                        align="center"
                    >
                        <Spacer size="20px" />
                        <Title color="light" small>Correr 2km todos os dias às 5am durante 30 dias.</Title>
                        <Spacer size="20px" />
                        <Text>Mantenha a consistência correndo todos os dias para criar um novo hábito. O desafio termina em 30/08/2021</Text>
                        <Spacer size="20px" />
                        <Button block background="success">Quero participar</Button>
                    </Box>

                    <Spacer size="20px" />
                    <Box align="center">
                        <Title color="light" small>Topa encarar esse desafio?</Title>
                        <Spacer size="20px" />
                        <YoutubePlayer
                            height={180}
                            width="100%"
                            videoId="GfmrZjyabXo"
                        />
                    </Box>
                </> */}

                {/* results today */}
                
                {/* <Box background="dark50" hasPadding justify="space-between">
                    <Text color="light">Terça-feira, 03/08/2021</Text>
                    <Spacer />
                    <Title color="light">Resultados de hoje</Title>
                    <Spacer size="30px"/>
                    <FlatList
                        data={[1, 2, 3, 4, 5, 6, 7, 8, 9]}
                        ListEmptyComponent={() => (
                            <Box hasPadding align="center">
                                <Title>Nenhum resultado...</Title>
                                <Text>Seu desafio começa em x horas...</Text>
                                <Spacer size="20px" />
                                <Button block background="success">Recarregar</Button>
                            </Box>
                        )}
                        renderItem={({ item }) => (
                            <Box row width="100%" height="50px" align="center">                                
                                <Box row align="center">
                                    <Cover
                                        mode="cover"
                                        width="35px"
                                        height="35px"
                                        circle
                                        image={'https://image.freepik.com/vetores-gratis/personagem-de-empresario-com-raiva-sentado-em-uma-cadeira-de-escritorio-a-mesa-e-olhando-no-visor-ilustracao-em-vetor-de-um-jovem-trabalhador-usando-oculos-com-emocao-negativa-isolada-em-um-branco_177953-304.jpg'}
                                        spacing="0 10px 0 0"
                                    />
                                    <Text bold color="light">Weslley L Silva</Text>
                                </Box>
                                <Badge>+ R$50,00</Badge>
                            </Box>
                        )}
                    />
                </Box> */}

                {/* challenge time */}
                <Box background="dark50" align="center" hasPadding radius>
                    <Badge big color="success">+ R$50,00</Badge>
                    <Spacer size="20" />
                    <Text small>Terça-feira, 03/08/2021</Text>
                    <Spacer />
                    <Title color="light" small>Inicie seu desafio</Title>
                    <Spacer size="40" />

                    <Title big bold color="light" scale={1.3}>30:00</Title>

                    <Spacer size="40" />
                    <Button block color="primary">Iniciar Agora</Button>
                </Box>


            </Box>
        </ScrollView>


    )
}

export default Home