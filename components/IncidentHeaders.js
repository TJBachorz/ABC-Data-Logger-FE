import React, { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';

import { uniq } from 'lodash';
import Collapsible from 'react-native-collapsible';
import Icon from 'react-native-vector-icons/AntDesign';

import utilities from './Utilities';
import Incident from './Incident';

export default function IncidentHeaders({ history }) {

    const [ activeArray, setActiveArray] = useState([])
    
    const incidentDates = () => {
        return uniq(history.map(incident => incident.date))
    }

    const filterIncidentsByDate = (date) => {
        return history.filter(incident => incident.date === date)
    }

    const filterDateOutOfActiveArray = (date) => {
        const filteredArray = activeArray.filter(item => {
            return item !== date
        })
        setActiveArray(filteredArray)
    }

    const addOrRemoveFromArray = (event, date) => {
        event.preventDefault()
        if (activeArray.includes(date)) {
            filterDateOutOfActiveArray(date)
        } else {
            setActiveArray([...activeArray, date])
        }
    }

    const carrotDownOrRight = (date) => {
        return !activeArray.includes(date) ? "caretright" : "caretdown"
    }

    return (
        <View style={styles.incidentDateContainer}>
            {incidentDates().map(date => {
                const splitDate = date.split("-")
                const year = splitDate[0]
                const month = splitDate[1]
                const day = splitDate[2]
                return (
                    <View key={date}>
                        <View style={styles.iconAndText}> 
                            <Text style={styles.iconText}>
                                <Icon
                                    name={carrotDownOrRight(date)}
                                    size={15}
                                    color="#4c96d7"
                                />
                            </Text>
                            <Text 
                                style={styles.dateHeader}
                                onPress={(event) => addOrRemoveFromArray(event, date)}
                            >
                                    {utilities.monthsLongForm[month]} {day}, {year}  
                            </Text>
                        </View>
                        <Collapsible 
                            collapsed={!activeArray.includes(date)}
                        >
                            {filterIncidentsByDate(date).map(incident => {
                                return (
                                    <Incident key={incident.id} incident={incident}/>
                                )
                            })}
                        </Collapsible>
                    </View>
                )
            })}
        </View>
    )
}

const styles = StyleSheet.create({
    dateHeader: {
        padding: 10,
        fontSize: 26,
        color: "#1761a0",
        fontWeight: "700",
        paddingRight: 75,
    },
    incidentDateContainer: {
        margin: 2
    },
    iconAndText: {
        flexDirection: 'row'
    },
    iconText: {
        marginTop: 18
    }
})
