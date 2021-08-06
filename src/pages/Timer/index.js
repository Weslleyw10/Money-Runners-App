import React from 'react'

import { Box, Title, Text, Button, Spacer, ProgressCircle, Badge } from '../../components'
import { colors } from '../../data/theme.json'

const Timer = () => {
    return (
        <Box background="dark" hasPadding >
            <Box justify="center" align="center">
                <Spacer size="40px" />
                <Text color="muted">Tempo restante</Text>

                <Spacer size="10px" />
                <Title big color="danger">20:00</Title>

                <Spacer size="40px" />
                <Title small color="muted">Weslley L Silva, faltam</Title>
                <Spacer size="20px" />

                <Box height="250px" spacing="30px" justify="center" align="center">
                    <ProgressCircle
                        size="250px"
                        background="dark"
                        color="danger"
                        progress={0.5}
                    />
                    <Title big color="light" scale="2">2.95</Title>
                </Box>

                <Spacer size="20px" />
                <Title small color="muted">Kilômetros p/ meta.</Title>
            </Box>

            <Spacer size="80px" />
            <Badge big>-R$10,00</Badge>
            <Spacer size="20px" />
            <Button block background="danger">Desistir</Button>

        </Box>
    )
}

export default Timer