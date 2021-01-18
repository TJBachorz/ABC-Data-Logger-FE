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
        case "CHANGE_INCIDENT_HISTORY":
            return action.payload
        default:
            return state
    }
}

// const [caseInfo, setCaseInfo] = useState({})
// const [incidentHistory, setIncidentHistory] = useState([])
// const [incident, setIncident] = useState({})


export default combineReducers({
    signedIn,
    cases,
    incidentHistory
})

