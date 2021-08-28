import { takeLatest, all, select, put, call } from 'redux-saga/effects'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Alert } from 'react-native'
import moment from 'moment'

import types from './types'
import rest from '../../../services/rest'
import { replace, navigate } from '../../../services/navigation'
import { modalInviteRef } from '../../../components/Modal/invite'
import { modalRef as modalLoginRef } from '../../../components/Modal'
import { signin as signinAction, setForm, reset, setReducer, getHome as getHomeAction } from './actions'

export function* signin() {
    const { userForm } = yield select(state => state.app)
    yield put(setForm({ saving: true }))

    try {
        const { data: res } = yield call(rest.post, '/user/login', userForm)

        if (res.error) {
            throw new Error(res.message)
        }

        // save user in local storage
        yield call(AsyncStorage.setItem, '@user', JSON.stringify(res.user))
        // update reducer user
        yield put(setReducer(res.user, 'user'))
        // reset reducer userForm
        yield put(reset('userForm'))
        // close modal login
        yield call(modalLoginRef?.current?.close)
        // redirect home page
        yield call(replace, 'Home')

    } catch (error) {
        yield call(Alert.alert, 'Erro Interno', error.message)

    } finally {
        yield put(setForm({ saving: false }))
    }

}

export function* saveUser() {
    const { userForm } = yield select(state => state.app)
    yield put(setForm({ saving: true }))

    try {
        const form = new FormData()
        form.append('name', userForm?.name)
        form.append('email', userForm?.email)
        form.append('document', userForm?.document.match(/\d+/g).join(''))
        form.append('birthday', moment(userForm?.birthday, 'DD/MM/YYYY').format('YYYY-MM-DD'))
        form.append('phone', userForm?.phone.match(/\d+/g).join(''))
        form.append('password', userForm?.password)

        const nameParts = userForm?.photo.split('.')
        const extension = nameParts.pop()
        const name = new Date().getTime() + "." + extension

        form.append('photo', {
            name,
            type: `image/${extension}`,
            uri: userForm?.photo
        })

        const { data: res } = yield call(rest.post, '/user', form, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })

        if (res.error) {
            throw new Error(res.message)
        }

        yield put(reset('userForm'))
        yield call(modalInviteRef?.current?.close)
        yield call(Alert.alert, 'Solicitação enviada!', 'Seu convite foi recebido com sucesso. Fique atento ao seu email.')

    } catch (error) {
        yield call(Alert.alert, 'Erro Interno', error.message)

    } finally {
        yield put(setForm({ saving: false }))
    }
}

export function* getHome() {
    const { user } = yield select(state => state.app)
    yield put(setForm({ saving: true }))

    try {
        const { data: res } = yield call(rest.get, `/user/${user._id}/challenge`)

        if (res.error) {
            throw new Error(res.message)
        }

        for (let key of Object.keys(res)) {
            yield put(setReducer(res[key], key))
        }

    } catch (error) {
        yield put(setReducer(false, "challenge"))
        yield call(Alert.alert, 'Erro Interno', error.message)

    } finally {
        yield put(setForm({ saving: false }))
    }
}

export function* joinChallenge() {
    const { payment, user, challenge } = yield select(state => state.app)
    yield put(setForm({ saving: true }))

    try {
        const { data: res } = yield call(rest.post, `/challenge/join`, {
            userId: user._id,
            challengeId: challenge._id,
            creditCard: payment
        })

        if (res.error) {
            throw new Error(res.message)
        }

        yield put(getHomeAction())
        yield call(navigate, 'Home')

    } catch (error) {
        yield put(setReducer(false, "challenge"))
        yield call(Alert.alert, 'Erro Interno', error.message)

    } finally {
        yield put(setForm({ saving: false }))
    }

}

export function* getBalance() {
    const { user } = yield select(state => state.app)
    yield put(setForm({ loading: true }))

    try {
        const { data: res } = yield call(rest.get, `/user/${user?._id}/balance`)

        if (res.error) {
            throw new Error(res.message)
        }

        yield put(setReducer(res, 'trackings'))

    } catch (error) {
        yield put(setReducer(false, "trackings"))
        yield call(Alert.alert, 'Erro Interno', error.message)

    } finally {
        yield put(setForm({ loading: false }))
    }

}

export function* getRanking() {
    const { challenge } = yield select(state => state.app)
    yield put(setForm({ loading: true }))

    try {
        const { data: res } = yield call(rest.get, `/challenge/${challenge?._id}/ranking`)

        if (res.error) {
            throw new Error(res.message)
        }

        yield put(setReducer(res, 'ranking'))

    } catch (error) {
        yield put(setReducer(false, "ranking"))
        yield call(Alert.alert, 'Erro Interno', error.message)

    } finally {
        yield put(setForm({ loading: false }))
    }

}

export function* setTracking({ operation }) {
    const { challenge, user, dailyAmount } = yield select(state => state.app)
    yield put(setForm({ loading: true }))

    try {
        const { data: res } = yield call(rest.post, `/challenge/tracking`, {
            userId: user._id,
            challengeId: challenge._id,
            operation,
            amount: dailyAmount
        })

        if (res.error) {
            throw new Error(res.message)
        }

        yield put(getHomeAction())
        
    } catch (error) {
        // yield put(setReducer(false, "ranking"))
        yield call(Alert.alert, 'Erro Interno', error.message)

    } finally {
        yield put(setForm({ loading: false }))
    }

}

export default all([
    takeLatest(types.SIGNIN, signin),
    takeLatest(types.SAVE_USER, saveUser),
    takeLatest(types.GET_HOME, getHome),
    takeLatest(types.JOIN_CHALLENGE, joinChallenge),
    takeLatest(types.GET_BALANCE, getBalance),
    takeLatest(types.GET_RANKING, getRanking),
    takeLatest(types.SET_TRACKING, setTracking),
])