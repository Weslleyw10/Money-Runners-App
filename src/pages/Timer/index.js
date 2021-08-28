import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Alert } from 'react-native'
import * as TaskManager from 'expo-task-manager'
import * as Location from 'expo-location'
import * as Permissions from 'expo-permissions'

import store from '../../store'
import { navigate } from '../../services/navigation'
import { setReducer, setTracking } from '../../store/modules/app/actions'
import { Box, Title, Text, Button, Spacer, ProgressCircle, Badge } from '../../components'
import { startInterval, stopInterval, updateTrackingTime } from '../../services/timer'


const Timer = () => {
    const dispatch = useDispatch()
    const { timer, trackings, dailyAmount, user, challenge, travelledDistance } = useSelector(state => state.app)
    const intervalId = useRef(null)

    const TASK_NAME = 'TRACKING_USER'

    const remainingDistance = challenge?.distance / 100 - travelledDistance / 100
    const remainingDistancePerc = travelledDistance / challenge?.distance

    const exitMonitoring = async () => {
        await TaskManager.unregisterAllTasksAsync()
        stopInterval(intervalId?.current)
    }

    const getLocationAsync = async () => {
        let { status } = await Permissions.askAsync(Permissions.LOCATION)
        if (status != "granted") {
            Alert.alert(
                'Permissão negada',
                'Precisamos de geolocalização para registrar a sua meta.',
                [
                    {
                        text: 'Tentar novamente',
                        onPress: () => getLocationAsync()
                    },
                    {
                        text: 'Voltar',
                        onPress: () => {
                            exitMonitoring(),
                            navigate('Home')
                        }
                    }
                ]
            )
            return false
        }

        await Location.startLocationUpdatesAsync(TASK_NAME, {
            accuracy: Location.Accuracy.BestForNavigation,
            distanceInterval: 1,
            showsBackgroundLocationIndicator: true,
            foregroundService: {
                notificationTitle: "Monitorando sua meta",
                notificationBody: "Se movimente, estamos te observando...",
                notificationColor: "#fff"
            }
        })
    }

    const sendTracking = (operation) => {
        dispatch(setTracking(operation))
        navigate('Home')
        exitMonitoring()
    }

    useEffect(() => {
        intervalId.current = startInterval(updateTrackingTime, 1000)
        TaskManager.defineTask(TASK_NAME, ({ data: { locations }, error }) => {
            if (error) {
                console.tron.log(TASK_NAME + error.message)
                return false
            }
            store.dispatch(
                setReducer(store.getState().app.travelledDistance + 1, 'travelledDistance')
            )
        })
        
        getLocationAsync()
        

        return () => {
            exitMonitoring()
        }

    }, [])

    useEffect(() => {
        if (parseFloat(remainingDistance) <= 0.0) {
            Alert.alert(
                "Muito bom jooveem!!!",
                `Você cumpriu sua meta e ainda colocou + ${dailyAmount} no bolso.`
            )

            sendTracking('gain')
        }

    }, [remainingDistance])

    useEffect(() => {
        if (timer?.countdown === '00:00') {
            sendTracking('loss')
        }
    }, [timer?.countdown])

    return (
        <Box background="dark" hasPadding >
            <Box justify="center" align="center">
                <Spacer size="40px" />
                <Text color="muted">Tempo restante</Text>

                <Spacer size="10px" />
                <Title big color="danger">{timer?.countdown}</Title>

                <Spacer size="40px" />
                <Title small color="muted">{user?.name?.split(' ')[0]}, faltam</Title>
                <Spacer size="20px" />

                <Box height="250px" spacing="30px" justify="center" align="center">
                    <ProgressCircle
                        size="250px"
                        background="dark"
                        color="danger"
                        progress={1 - remainingDistancePerc}
                    />
                    <Title big color="light" scale="2">{remainingDistance.toFixed(2)}</Title>
                </Box>

                <Spacer size="20px" />
                <Title small color="muted">Kilômetros p/ meta.</Title>
            </Box>

            <Spacer size="80px" />
            <Badge big>-R${dailyAmount}</Badge>
            <Spacer size="20px" />
            <Button
                onPress={() => navigate('Home')}
                block 
                background="danger">
                Desistir
            </Button>
        </Box>
    )
}

export default Timer