import React, { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import dayjs from 'dayjs';
import { countBy, uniq } from 'lodash';
import Collapsible from 'react-native-collapsible';

import Incident from './Incident';


export default function IncidentHeaders({history}) {

    // const [isDateHeaderCollapsed, setIsDateHeaderCollapsed] = useState(false)

    const incidentDates = () => {
        return uniq(history.map(incident => incident.date))
    }

    const filterIncidentsByDate = (date) => {
        return history.filter(incident => incident.date === date)
    }

    return (
        <View style={styles.incidentDateContainer}>
            {incidentDates().map(date => {
                const splitDate = date.split("-")
                const year = splitDate[0]
                const month = splitDate[1]
                const day = splitDate[2]
                return (
                    <View>
                        <Text 
                            style={styles.dateHeader}
                            // onPress={() => setIsDateHeaderCollapsed(!isDateHeaderCollapsed)}
                        >
                            {dayjs(month).format("MMMM")} {day}, {year}
                        </Text>
                        {/* <Collapsible collapsed={isDateHeaderCollapsed}> */}
                            {filterIncidentsByDate(date).map(incident => {
                                return (
                                    <Incident key={incident.id} incident={incident}/>
                                )
                            })}
                        {/* </Collapsible> */}
                    </View>
                )
            })}
        </View>
    )
}

const styles = StyleSheet.create({
    dateHeader: {
        margin: 2,
        fontSize: 18,
        color: "#1761a0",
        fontWeight: "700"
    },
    incidentDateContainer: {
        margin: 2
    }
})
