import types from "./types";
import produce from 'immer'

const INITIAL_STATE = {
    travelledDistance: 0,
    user: {},
    userForm: {},
    form: {
        disabled: false,
        loading: false,
        saving: false
    },
    challenge: {},
    payment: {},
    trakings: [],
    ranking: {},
    timer: {}
}

function app(state = INITIAL_STATE, action ) {
    switch(action.type) {
        case types.SET_REDUCER:
            return produce(state, (draft) => {
                draft[action.key] = action.payload
            })            
        
        case types.SET_USER:
            return produce (state, (draft) => {
                draft.userForm = {
                    ...state.userForm,
                    ...action.payload
                }
            })
        
        case types.SET_FORM:
            return produce(state, (draft) => {
                draft.form = {
                    ...state.form,
                    ...action.form
                }
            })

        case types.RESET:
            return produce (state, (draft) => {
                draft[action.key] = INITIAL_STATE[action.key]
            })

        default:
            return state            
    }
}

export default app