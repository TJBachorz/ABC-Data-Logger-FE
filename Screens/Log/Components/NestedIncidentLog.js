import React, { useState } from 'react';
import { View } from 'react-native';
import { uniq } from 'lodash';
import Collapsible from 'react-native-collapsible';

import IncidentHeader from './IncidentHeader';
import Incident from './Incident';

export default function NestedIncidentLog({ history }) {
    
    const [activeArray, setActiveArray] = useState([])
    
    const renderIncidentsByDate = () => uniqIncidentDates().map(renderDates)
    
    const uniqIncidentDates = () => uniq(history.map(incident => incident.date))
    
    const filterIncidentsByDate = (date) => {
        return history.filter(incident => incident.date === date)
    }
    
    const renderIncidents = (incident) => {
        return (
            <Incident key={incident.id} incident={incident}/>
        )
    }

    const renderDates = (date) => {
        return (
            <View key={date}>
                <IncidentHeader 
                    date={date} 
                    activeArray={activeArray}
                    setActiveArray={setActiveArray}
                />

                <Collapsible collapsed={!activeArray.includes(date)}>
                    {filterIncidentsByDate(date).map(renderIncidents)}
                </Collapsible>
            </View>
        )
    }

    return (
        <View>
            {renderIncidentsByDate()}
        </View>
    )
}
