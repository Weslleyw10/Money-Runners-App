import React from 'react'

import { Box, Title, Text, Button, Spacer, Badge, FlatList } from '../../components'

const Balance = () => {
    return (
        <Box background="dark" hasPadding>
            <Spacer size="40px" />
            <Box height="100px">
                <Text color="light">Saldo disponível</Text>
                <Spacer size="10px" />

                <Title big color="light">R$20,00</Title>

            </Box>
            <Spacer size="10px" />

            <Button background="primary" block>
                Sacar Saldo
            </Button>

            <Spacer size="40px" />

            <FlatList
                data={[1, 2, 3, 4, 5, 6, 7, 8, 9]}
                keyExtractor={item => item.toString() + new Date().getTime()}
                renderItem={({ item, index }) => (
                    <Box
                        row
                        width="100%"
                        height="50px"
                        align="center"
                        justify="space-between"
                        
                    >
                        <Box row>
                            <Box justify="center">
                                <Text color="light">Saque integral</Text>
                                <Spacer size="3px" />
                                <Text small>28/07/2021</Text>
                            </Box>
                        </Box>

                        <Box width="25%" justify="center">
                            <Badge>-R$10,00</Badge>
                        </Box>
                    </Box>

                )}

            />


        </Box>
    )
}

export default Balance