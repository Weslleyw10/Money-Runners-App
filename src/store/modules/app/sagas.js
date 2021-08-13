import { takeLatest, all } from 'redux-saga/effects'
import { sigin as siginAction } from './actions'
import types from './types'

export function* sigin() {

}

export default all([
    takeLatest(types.SIGIN, sigin)
])