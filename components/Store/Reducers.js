import { combineReducers } from 'redux';

export default function Reducer() {
    return combineReducers({
        setIsSignedIn
    })
}

const setIsSignedIn = ( state=false, action) => {
    switch(action.type) {
        case "CHANGE_SIGN_IN":
            return action.payload
        default:
            return state
    }
}

// const [account, setAccount] = useState({})
// const [isSignedIn, setIsSignedIn] = useState(false)
// const [caseInfo, setCaseInfo] = useState({})
// const [incidentHistory, setIncidentHistory] = useState([])
// const [incident, setIncident] = useState({})
// const [isNewCase, setIsNewCase] = useState(false)


