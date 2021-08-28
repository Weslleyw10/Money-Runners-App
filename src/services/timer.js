import moment from 'moment'
import store from '../store'
import { setReducer } from '../store/modules/app/actions'

export const startInterval = (callback = () => {}, interval) => {
    return setInterval(() => {
        callback()
    }, interval)
}

export const stopInterval = (intervalId) => {
    clearInterval(intervalId)
}

export const setTimer = (isChallengeTime = false, countdown) => {
    store.dispatch(
        setReducer({
            countdown,
            isChallengeTime            
        }, 'timer')
    )
}

export const updateTrackingTime = () => {
    const { challenge, isParticipating, challengeFinishedToday } = store.getState().app

    const now = moment()
    const start = moment(challenge?.time?.start, 'HH:mm')
    const end = moment(challenge?.time?.end, 'HH:mm')
    const seconds = end.diff(now, 'seconds')
    const countdown = moment().startOf('day').second(seconds).format('mm:ss')

    // não está no horário do desafio
    if(!Boolean(challenge) || !isParticipating) {
        setTimer(false, countdown)
        return false
    }

    // não está no horário do desafio
    if (!now.isBetween(start, end)) {
        setTimer(false, countdown)
        return false
    }

    // está no horário do desafio
    setTimer(!challengeFinishedToday, countdown)
    console.log('HORA DO DESAFIO!!!')
}