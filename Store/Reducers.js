import { combineReducers } from 'redux';

const signedIn = ( state=false, action) => {
    switch(action.type) {
        case "CHANGE_SIGN_IN":
            return action.payload
        default:
            return state
    }
}

// const [account, setAccount] = useState({})
// const [caseInfo, setCaseInfo] = useState({})
// const [incidentHistory, setIncidentHistory] = useState([])
// const [incident, setIncident] = useState({})
// const [isNewCase, setIsNewCase] = useState(false)


export default combineReducers({
    signedIn
})

