import types from "./types";

export const setReducer = (payload, key) => {
    return {
        type: types.SET_REDUCER,
        payload,
        key
    }
}

export const reset = (key) => {
    return {
        type: types.RESET,
        key
    }
}

export const setForm = (payload) => {
    return {
        type: types.SET_FORM,
        payload
    }
}

export const signin = () => {
    return {
        type: types.SIGNIN
    }
}

export const setUser = (payload) => {
    return {
        type: types.SET_USER,
        payload
    }
}

export const saveUser = () => {
    return {
        type: types.SAVE_USER
    }
}

export const getHome = () => {
    return {
        type: types.GET_HOME
    }
}

export const joinChallenge = () => {
    return {
        type: types.JOIN_CHALLENGE
    }
}

export const getBalance = () => {
    return {
        type: types.GET_BALANCE
    }
}

export const getRanking = () => {
    return {
        type: types.GET_RANKING
    }
}
export const setTracking = (operation) => {
    return {
        type: types.SET_TRACKING,
        operation
    }
}

