import React from 'react'

import { Box, Title, Text, Button, Spacer, Cover, Badge, ProgressBar, FlatList } from '../../components'
import { colors } from '../../data/theme.json'

const Ranking = () => {
    return (
        <Box background="dark" hasPadding>
            <Spacer size="40px" />
            <Box row height="40px">
                <Title color="light">Ranking</Title>
            </Box>
            <Spacer size="20px" />

            <Box row height="120px">
                <Box height="120px" radius justify="center" width="150px" hasPadding background="primary">
                    <Text color="dark">Saldo</Text>
                    <Spacer size="5px" />
                    <Title small color="light">R$10,00</Title>
                </Box>

                <Box justify="center" height="120px" hasPadding>
                    <Text small color="light">Status do desafio (30 dias)</Text>
                    <Spacer size="5px" />
                    <ProgressBar
                        width="100%"
                        progress={0.5}
                    />
                    <Spacer size="5px" />
                    <Text small color="light">50% (15 dias). Termina em 31/08/2021</Text>

                </Box>
            </Box>

            <Spacer size="30px" />
            <FlatList
                data={[1, 2, 3, 4, 5, 6, 7, 8, 9]}
                keyExtractor={item => item.toString() + new Date().getTime()}
                renderItem={({ item, index }) => (
                    <Box
                        row
                        width="100%"
                        height="50px"
                        align="center"
                        justify="center"
                    >
                        <Box row align="center">
                            <Text>{index + 1}</Text>
                            <Cover
                                spacing="0 0 0 15px"
                                width="35px"
                                height="35px"
                                circle
                                image={'https://image.freepik.com/vetores-gratis/personagem-de-empresario-com-raiva-sentado-em-uma-cadeira-de-escritorio-a-mesa-e-olhando-no-visor-ilustracao-em-vetor-de-um-jovem-trabalhador-usando-oculos-com-emocao-negativa-isolada-em-um-branco_177953-304.jpg'}
                            />

                            <Box justify="center">
                                <Text color="light">Weslley L Silva</Text>
                                <Spacer size="3px" />
                                <Text small>50% (25 dias)</Text>
                            </Box>

                            <Box justify="center">
                                <ProgressBar
                                    width="100%"
                                    progress={0.5}
                                />
                            </Box>

                        </Box>
                    </Box>

                )}

            />


        </Box>
    )
}

export default Ranking