import React, { useState } from 'react';
import { useSelector } from 'react-redux'; 

import AuthStack from './AuthStack';
import GuestStack from './GuestStack';

export default function StackNav() {

    const [incidentHistory, setIncidentHistory] = useState([])

    const isSignedIn = useSelector(state => state.signedIn)
    
    const signInCheck = () => isSignedIn ? "AUTH" : "GUEST"

    const navigator = {

        "AUTH": <AuthStack
            incidentHistory={incidentHistory}
            setIncidentHistory={setIncidentHistory}
        />,
        "GUEST": <GuestStack/>
    }

    return (
        <>
            { navigator[signInCheck()] }
        </>
    )
}