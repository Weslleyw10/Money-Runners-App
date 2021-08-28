import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import moment from 'moment'

import utils from '../../utils'
import { colors } from '../../data/theme.json'
import Empty from '../../components/Empty'
import { Box, Title, Text, Button, Spacer, Cover, Badge, ProgressBar, FlatList } from '../../components'
import { getRanking as getRankingAction } from '../../store/modules/app/actions'

const Ranking = () => {
    const dispacth = useDispatch()
    const { ranking, form } = useSelector(state => state.app)
    const [finishedPercentage, setFinishedPercentage] = useState(0);

    useEffect(() => {
        setFinishedPercentage(ranking?.currentPeriod / ranking?.challengePeriod)
    }, [ranking])

    useEffect(() => {
        dispacth(getRankingAction())
        console.log('finishedPercentage', finishedPercentage)
}, [])


    return (
        <Box background="dark" hasPadding>
            {form?.loading && (
                <Empty />
            )}

            {!form?.loading && (
                <>
                    <Spacer size="40px" />
                    <Box row height="40px">
                        <Title color="light">Ranking</Title>
                    </Box>
                    <Spacer size="20px" />

                    <Box row height="120px">
                        <Box height="120px" radius justify="center" width="150px" hasPadding background="primary">
                            <Text color="dark">Saldo</Text>
                            <Spacer size="5px" />
                            <Title small color="light">R${ranking?.extraBalance?.toFixed(2)}</Title>
                        </Box>

                        <Box justify="center" height="120px" hasPadding>
                            <Text small color="light">Status do desafio ({ranking?.challengePeriod} dias)</Text>
                            <Spacer size="5px" />
                            <ProgressBar
                                width="100%"
                                progress= {finishedPercentage}
                            />
                            <Spacer size="5px" />
                            <Text 
                                small 
                                color="light"
                            >
                                {(finishedPercentage * 100).toFixed(0)}% (
                                {ranking?.currentPeriod} dias). Termina em { moment(ranking?.challengeDate?.end).format("DD/MM/YYYY") }
                            </Text>
                        </Box>
                    </Box>

                    <Spacer size="80px" />
                    <FlatList
                        data={ranking?.records}
                        keyExtractor={item => item._id}
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
                                        image={`${utils.AWS.bucketURL}/${item?.photo}`}
                                    />

                                    <Box justify="center">
                                        <Text color="light">{item?.name}</Text>
                                        <Spacer size="3px" />
                                        <Text small> {((item?.performance / ranking?.currentPeriod) * 100).toFixed(0)}% ({item?.performance} dias)</Text>
                                    </Box>

                                    <Box justify="center">
                                        <ProgressBar
                                            width="100%"
                                            progress={(item?.performance / ranking?.currentPeriod)}
                                        />
                                    </Box>

                                </Box>
                            </Box>

                        )}
                    />
                </>
            )}
        </Box>
    )
}

export default Ranking