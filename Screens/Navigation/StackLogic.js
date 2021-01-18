import React, { useState } from 'react';
import { useSelector } from 'react-redux'; 

import AuthStack from './AuthStack';
import GuestStack from './GuestStack';

export default function StackNav() {

    const [caseInfo, setCaseInfo] = useState({})
    const [incidentHistory, setIncidentHistory] = useState([])
    const [incident, setIncident] = useState({})

    const isSignedIn = useSelector(state => state.signedIn)
    
    const signInCheck = () => isSignedIn ? "AUTH" : "GUEST"

    const navigator = {

        "AUTH": <AuthStack
            caseInfo={caseInfo}
            setCaseInfo={setCaseInfo}
            incident={incident}
            setIncident={setIncident}
            incidentHistory={incidentHistory}
            setIncidentHistory={setIncidentHistory}
        />,
        "GUEST": <GuestStack
            caseInfo={caseInfo} 
            setCaseInfo={setCaseInfo}
        />
    }

    return (
        <>
            {navigator[signInCheck()]}
        </>
    )
}