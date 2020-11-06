import React from 'react';
import { StyleSheet, View, Text } from 'react-native';


export default function Incident({incident}) {

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

    const dateToString = () => {
        const date = incident["date"].split("-")
        return `${months[date[1]]} ${date[2]}, ${date[0]} -- `
    }

    const timeToString = () => {
        const time = incident["time"].split(":")
        if (+time[0] > 12) {
            return `${+time[0]-12}:${time[1]} PM`
        } else if (+time[0] === 12) {
            return `${+time[0]}:${time[1]} PM`
        } else if (+time[0] === 0) {
            return `12:${time[1]} AM`
        }
        return `${+time[0]}:${time[1]} AM`
    }

    return (
        <View style={styles.incidentView}>
            <Text style={styles.datetime}>{dateToString()}{timeToString()}</Text>
            <Text style={styles.abcText}>A: {incident["antecedent"]}</Text>
            <Text style={styles.abcText}>B: {incident["behavior"]}</Text>
            <Text style={styles.abcText}>C: {incident["consequence"]}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    datetime: {
        fontSize: 24,
        fontWeight: '400',
        color: '#f8f8ff',
        marginBottom: 10
    },
    incidentView: {
        justifyContent: 'center',
        alignItems: 'center',
        margin: 15,
        padding: 15,
        borderWidth: 1,
        borderRadius: 15,
        backgroundColor: "#1761a0"
    },
    abcText: {
        color: '#f8f8ff',   
        fontSize: 20
    }
})
