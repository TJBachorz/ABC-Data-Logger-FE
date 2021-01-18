import { combineReducers } from 'redux';

const signedIn = (state=false, action) => {
    switch(action.type) {
        case "CHANGE_SIGN_IN":
            return action.payload
        default:
            return state
    }
}

const cases = (state=[], action) => {
    switch(action.type) {
        case "CHANGE_CASES":
            return action.payload
        default:
            return state
    }
}

const incidentHistory = (state=[], action) => {
    switch(action.type) {
        case "RESET_INCIDENT_HISTORY":
            return action.payload
        default:
            return state
    }
}

const caseProfile = (state={}, action) => {
    switch(action.type) {
        case "SET_CASE_PROFILE":
            return action.payload
        default:
            return state
    }
}

const incident = (state={}, action) => {
    switch(action.type) {
        case "CHANGE_INCIDENT":
            return action.payload
        default:
            return state
    }
}

export default combineReducers({
    signedIn,
    cases,
    incidentHistory,
    caseProfile,
    incident
})