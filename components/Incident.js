import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

export default function Incident({ incident }) {

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

    // const dateToString = () => {
    //     const date = incident["date"].split("-")
    //     return `${months[date[1]]} ${date[2]}, ${date[0]} -- `
    // }

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
            <View style={styles.abcView}>
                <Text style={[styles.abcTextHeader, styles.A]}>A</Text>
                <Text style={styles.abcText}>{incident["antecedent"]}</Text>
            </View>
            <View style={styles.abcView}>
                <Text style={[styles.abcTextHeader, styles.B]}>B</Text>
                <Text style={styles.abcText}>{incident["behavior"]}</Text>
            </View>
            <View style={styles.abcView}>
                <Text style={[styles.abcTextHeader, styles.C]}>C</Text>
                <Text style={styles.abcText}>{incident["consequence"]}</Text>
            </View>
            <Text style={styles.datetime}>{timeToString()}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    datetime: {
        fontSize: 12,
        fontWeight: '400',
        color: 'gray',
        alignSelf: 'stretch',
        textAlign: 'right'
    },
    incidentView: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: "flex-start",
        width: '90%',
        margin: 15,
        padding: 15,
        borderRadius: 8,
        backgroundColor: "white",
        shadowColor: 'black',
        shadowOpacity: 0.4,
        shadowOffset: {width: 1, height: 1}
    },
    abcText: {
        color: 'black',   
        fontSize: 20
    },
    A: {
        paddingLeft: 2.75,
        paddingRight: 2.75

    },
    B: {
        paddingLeft: 3,
        paddingRight: 3
    },
    C: {
        paddingLeft: 2.5,
        paddingRight: 2.5

    },
    abcTextHeader: {
        backgroundColor: "#1761a0",
        color: 'white',   
        fontSize: 20,
        marginRight: 8,
        fontWeight: '600',
        borderStyle: 'solid',
        borderRadius: 7,
        overflow: 'hidden',
    },
    abcView: {
        flexDirection: 'row',
        width: '95%',
        margin: 2
    }
})
