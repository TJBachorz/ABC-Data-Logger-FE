import React, { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';

import { uniq } from 'lodash';
import Collapsible from 'react-native-collapsible';
import Icon from 'react-native-vector-icons/MaterialIcons';

import Incident from './Incident';


const months = {
    "01": "January",
    "02": "February",
    "03": "March",
    "04": "April",
    "05": "May",
    "06": "June",
    "07": "July",
    "08": "August",
    "09": "September",
    "10": "October",
    "11": "November",
    "12": "December",  
}


export default function IncidentHeaders({history}) {

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
        // return filteredArray
        console.log(filteredArray)
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

    return (
        <View style={styles.incidentDateContainer}>
            {incidentDates().map(date => {
                const splitDate = date.split("-")
                const year = splitDate[0]
                const month = splitDate[1]
                const day = splitDate[2]
                return (
                    <View key={date}>
                        <Text 
                            style={styles.dateHeader}
                            onPress={(event) => addOrRemoveFromArray(event, date)}
                        >
                            {months[month]} {day}, {year}
                        </Text>
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
        margin: 10,
        fontSize: 26,
        color: "#1761a0",
        fontWeight: "700"
    },
    incidentDateContainer: {
        margin: 2
    }
})
