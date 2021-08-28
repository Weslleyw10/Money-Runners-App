import React from 'react'

import { Box, ActivityIndicator, Title, Text, Spacer } from '../../components'

const Empty = () => {
    return (
        <Box>
            <Spacer size="150px" />
            <ActivityIndicator size="large" />
            <Spacer size="20px" />

            <Title color="light">Buscando informações...</Title>
            <Spacer />
            <Text>Aguarde alguns instantes...</Text>
        </Box>
    )
}

export default Empty