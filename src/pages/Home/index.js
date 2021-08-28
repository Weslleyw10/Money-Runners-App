import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import YoutubePlayer from "react-native-youtube-iframe";
import moment from 'moment';
import 'moment/locale/pt-br'

import utils from '../../utils'
import { colors } from '../../data/theme.json'
import { navigate } from '../../services/navigation'
import { getHome, setTracking } from '../../store/modules/app/actions'
import { startInterval, stopInterval, updateTrackingTime } from '../../services/timer'

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

const Home = () => {
    moment.locale('pt-br')
    const dispatch = useDispatch()

    const {
        user,
        form,
        isParticipating,
        challenge,
        balance,
        dailyAmount,
        challengePeriod,
        participatedTimes,
        discipline,
        dailyResults,
        timer,
        trackings
    } = useSelector(state => state.app)

    const [timeToChallenge, setTimeToChallenge] = useState("")

    const todayChallengeDateTime = moment(challenge?.time?.start, 'HH:mm')
    const nextChallengeDate = moment().isAfter(todayChallengeDateTime) ? moment().add(1, 'day') : moment()

    const operationType = (value) => {
        return {
            type: ['withdral', 'loss'].includes(value) ? 'danger' : 'success',
            sinal: ['withdral', 'loss'].includes(value) ? '-' : '+',
        }
    }
    
    useEffect(() => {
        dispatch(getHome())
    }, [])

    useEffect(() => {
        const intervalId = startInterval(updateTrackingTime, 1000)

        return () => {
            stopInterval(intervalId)
        }

    }, [challenge, isParticipating])    

    useEffect(() => {
        setTimeToChallenge(
            moment.duration(nextChallengeDate.diff(moment())).humanize()
        )

        if (timer?.countdown === '00:01' && timer?.isChallengeTime) {
            dispatch(setTracking('loss'))
        }

    }, [timer?.countdown])

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
                        {isParticipating && <ProgressCircle progress={(discipline / challengePeriod).toFixed(1)} />}
                        <Cover
                            width="100px"
                            height="100px"
                            circle
                            image={`${utils.AWS.bucketURL}/${user.photo}`}
                        />
                    </Box>

                    <Spacer size='30px' />
                    <Title color="light">
                        { isParticipating ? `${((discipline / challengePeriod)*100).toFixed(0)}% de disciplina` : user?.name}
                    </Title>

                    <Spacer size="5px" />
                    <Text>{ isParticipating ? `${participatedTimes}/${challengePeriod} dias concluídos` : user?.email }</Text>

                    <Touchable
                        spacing="30px 0 0"
                        hasPadding
                        background="success"
                        height="100px"
                    >
                        <Text color="dark">Saldo conquistado</Text>
                        <Spacer />
                        <Title color="light">R${balance?.toFixed(2)}</Title>
                    </Touchable>
                </Box>
                <Spacer size="20px" />
            </GradientView>

            <Box hasPadding spacing="-50px 0 0">
                {/* Finding informations */}
                { form.loading && (
                    <Box
                        background="dark50"
                        hasPadding
                        radius="3px"
                        align="center"
                    >
                        <ActivityIndicator />
                        <Spacer size="20px"/>
                        <Title color="light" small>Buscando informações</Title>
                        <Text>Aguarde alguns instantes...</Text>
                    </Box>
                )}

                {/* Don't have challenges */}
                { !form.loading && !challenge && (
                    <Box
                        background="dark50"
                        hasPadding
                        radius="3px"
                        align="center"
                    >
                        <Spacer size="20px"/>
                        <Title color="light" small>Você ainda não tem desafios.</Title>
                        <Spacer size="20px"/>
                        <Button onPress={() => dispatch(getHome())} block background="success">Recarregar...</Button>
                    </Box>
                )}

                {/* Exists challenges but do not participated */}
                { !form.loading && challenge && !isParticipating && (
                    <>
                        <Box
                            background="dark50"
                            hasPadding
                            radius="3px"
                            align="center"
                        >
                            <Spacer size="20px" />
                            <Title color="light" small>{challenge.title}.</Title>
                            <Spacer size="20px" />
                            <Text>{challenge.description}.</Text>
                            <Spacer size="20px" />
                            <Button 
                                onPress={() => navigate('Payment')} 
                                block 
                                background="success"
                                >
                                    Quero participar
                            </Button>
                        </Box>
                        <Spacer size="20px" />
                        <Box align="center">
                            <Title color="light" small>Topa encarar esse desafio?</Title>
                            <Spacer size="20px" />
                            <YoutubePlayer
                                height={180}
                                width="100%"
                                videoId={challenge?.video}
                            />
                        </Box>
                    </>
                )}

                {/* challenge time */}
                { !form.loading && isParticipating && Boolean(challenge) && timer?.isChallengeTime &&  (
                    <Box background="dark50" align="center" hasPadding radius>
                        <Badge big color="success">
                            + R$ {dailyAmount}
                        </Badge>
                        <Spacer size="20" />
                        <Text small>{ moment().format('dddd[, ] DD/MM/YYYY') }</Text>
                        <Spacer />
                        <Title color="light" small>Inicie seu desafio</Title>
                        <Spacer size="40" />

                        <Title big bold color="light" scale={1.3}>
                            {timer?.countdown}
                        </Title>

                        <Spacer size="40" />
                        <Button 
                            block 
                            color="primary"
                            onPress={() => navigate('Timer')}
                        >
                                Iniciar Agora
                        </Button>
                    </Box>
                )}

                {/* Results today */}
                { !form.loading && isParticipating && Boolean(challenge) && !timer?.isChallengeTime && (
                    <Box background="dark50" hasPadding justify="space-between">
                        <Text color="light">{ moment().format('dddd[, ] DD/MM/YYYY') }</Text>
                        <Spacer />
                        <Title color="light">Resultados de hoje</Title>
                        <Spacer size="30px"/>
                        <FlatList
                            data={dailyResults}
                            ListEmptyComponent={() => (
                                <Box hasPadding align="center">
                                    <Title>Nenhum resultado...</Title>
                                    <Text>Seu desafio começa em {timeToChallenge}...</Text>
                                    <Spacer size="20px" />
                                    <Button block background="success">Recarregar</Button>
                                </Box>
                            )}
                            keyExtractor={item => item?._id}
                            renderItem={({ item }) => (
                                <Box row width="100%" height="50px" align="center">                                
                                    <Box row align="center">
                                        <Cover
                                            mode="cover"
                                            width="35px"
                                            height="35px"
                                            circle
                                            image={`${utils.AWS.bucketURL}/${item?.userId?.photo}`}
                                            spacing="0 10px 0 0"
                                        />
                                        <Text bold color="light">{item?.userId?.name}</Text>
                                    </Box>
                                    <Badge 
                                        color={operationType(item?.operation).type}
                                    >
                                            {operationType(item?.operation).sinal} R${item?.amount}
                                    </Badge>
                                </Box>
                            )}
                        />
                    </Box>
                )}
            </Box>
        </ScrollView>
    )
}

export default Home