import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import moment from 'moment'

import { Box, Title, Text, Button, Spacer, Badge, FlatList } from '../../components'
import { getBalance } from '../../store/modules/app/actions'
import Empty from '../../components/Empty'

const Balance = () => {
    const dispacth = useDispatch()
    const { trackings, form } = useSelector(state => state.app)

    const operationType = (value) => {
        return {
            type: ['withdral', 'loss'].includes(value) ? 'danger' : 'success',
            sinal: ['withdral', 'loss'].includes(value) ? '-' : '+',
        }
    }

    const operationDict = {
        fee: 'Depósito Inicial',
        gain: 'Meta Concluída',
        loss: 'Meta Incompleta',
        withdral: 'Saque Integral'
    }

    useEffect(() => {
        dispacth(getBalance())
    }, [])

    return (
        <Box background="dark" hasPadding>

            {form?.loading && (
                <Empty />
            )}

            {!form?.loading && (
                <>
                    <Spacer size="40px" />
                    <Box height="100px">
                        <Text color="light">Saldo disponível</Text>
                        <Spacer size="10px" />

                        <Title big color="light">R${trackings?.balance?.toFixed(2)}</Title>
                    </Box>
                    <Spacer size="20px" />

                    <Button background="primary" block>
                        Sacar Saldo
                    </Button>

                    <Spacer size="40px" />

                    <FlatList
                        data={trackings?.records}
                        keyExtractor={item => item?._id}
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
                                        <Text color="light">{operationDict[item?.operation]}</Text>
                                        <Spacer size="3px" />
                                        <Text small>{ moment(item?.createdAt).format('DD/MM/YYYY [às] HH:mm') }</Text>
                                    </Box>
                                </Box>

                                <Box width="25%" justify="center">
                                    <Badge 
                                        color={operationType(item?.operation).type}>
                                            {operationType(item?.operation).sinal} R${item?.amount}
                                    </Badge>
                                </Box>
                            </Box>

                        )}
                    />
                </>
            )}

        </Box>
    )
}

export default Balance