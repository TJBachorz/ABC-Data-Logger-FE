import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';

import { MMMM } from '../../Components/DateFunctions';

export default function IncidentHeader({ date, activeArray, setActiveArray }) {
    
    const destructureDate = (date) => {
        const [year, month, day] = date.split("-")
        return { year, month, day }
    }

    const carrotDownOrRight = (date) => {
        return !activeArray.includes(date) ? "caretright" : "caretdown"
    }

    const addOrRemoveFromArray = (event, date) => {
        event.preventDefault()
        activeArray.includes(date) ?
            filterDateOutOfActiveArray(date)
            : setActiveArray([...activeArray, date])
    }

    const filterDateOutOfActiveArray = (date) => {
        const filteredArray = activeArray.filter(item => {
            return item !== date
        })
        setActiveArray(filteredArray)
    }
    
    const { year, month, day } = destructureDate(date)

    return (
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
                {MMMM[month]} {day}, {year}  
            </Text>
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