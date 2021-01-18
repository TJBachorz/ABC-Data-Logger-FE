import React, { useState } from 'react';
import { useSelector } from 'react-redux'; 

import AuthStack from './AuthStack';
import GuestStack from './GuestStack';

export default function StackNav() {

    const [account, setAccount] = useState({})
    const [caseInfo, setCaseInfo] = useState({})
    const [incidentHistory, setIncidentHistory] = useState([])
    const [incident, setIncident] = useState({})
    const [isNewCase, setIsNewCase] = useState(false)

    const isSignedIn = useSelector(state => state.signedIn)
    
    const signInCheck = () => isSignedIn ? "AUTH" : "GUEST"

    const navigator = {

        "AUTH": <AuthStack
            account={account}
            setAccount={setAccount}
            caseInfo={caseInfo}
            setCaseInfo={setCaseInfo}
            isNewCase={isNewCase} 
            setIsNewCase={setIsNewCase}
            incident={incident}
            setIncident={setIncident}
            incidentHistory={incidentHistory}
            setIncidentHistory={setIncidentHistory}
        />,
        "GUEST": <GuestStack
            account={account}
            setAccount={setAccount}
            caseInfo={caseInfo} 
            setCaseInfo={setCaseInfo} 
            isNewCase={isNewCase}
            setIsNewCase={setIsNewCase}
        />
    }

    return (
        <>
            {navigator[signInCheck()]}
        </>
    )
}