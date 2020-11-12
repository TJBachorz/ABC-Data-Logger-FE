import React, { useState } from 'react';
import {
    StyleSheet,
    Text,
    View
} from 'react-native';

import DropDownPicker from 'react-native-dropdown-picker';
import { VictoryLine, VictoryChart, VictoryTheme, VictoryAxis } from "victory-native";
import { countBy, uniq } from 'lodash';
import dayjs from 'dayjs';
import EmptyGraphSplash from './EmptyGraphSplash';

const monthsNumsAndStrings = {
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

const months = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12",]

export default function DataChart({ incidentHistory, caseInfo }){

    const [selectedMonth, setSelectedMonth] = useState("")
    const [selectedBehavior, setSelectedBehavior] = useState("")
    const [selectedYear, setSelectedYear] = useState("")
    const [maxDays, setMaxDays] = useState(2)

    const behaviorFrequencyToDate = () => {
        const incidentsByBehavior = incidentHistory.filter(incident => {
            return incident.behavior === selectedBehavior
        })
        const incidentsByDate = filterIncidentsByDate(incidentsByBehavior)
        const dates = incidentsByDate.map(incident => incident.date)
        const uniqueDates = uniq(dates)
        return uniqueDates.map(behaviorDate => {
            const behaviorFrequency = countBy(dates)[behaviorDate]
            if (behaviorFrequencyToDate > maxDays) {
                setMaxDays(behaviorFrequency)
            } 
            const incidentDate = new Date(behaviorDate).getDate() + 1
            return {date: incidentDate, frequency: behaviorFrequency}
        })
    }

    const filterIncidentsByDate = (mappedIncidents) => {
        return mappedIncidents.filter(incident => {
            let month = dayjs(incident.date.split("-")[1]).format("MM")
            let year = dayjs(incident.date.split("-")[0]).format("YYYY")
            return month === selectedMonth && year === selectedYear
        })
    }    

    const createMonthOptions = () => {
        return months.map(month => {
            return {label: month, value: month}
        })
    }

    const currentYear = dayjs().format("YYYY")
    
    const abbrMonth = () => {
        return dayjs(selectedMonth).format("MMM")
    }

    const createNumberList = (startingNumber, endNumber) => {
        let numberList = []
        for (let i = startingNumber; i <= endNumber; i++) {
            if (i < 10) {
                numberList.push({label: `0${i}`, value: `0${i}`})
            } else {
                numberList.push({label: `${i}`, value: `${i}`})
            }
        }
        return numberList
    }

    const setTickValues = () => {
        let tickList = []
        if (maxDays < 5) {
            for (let i = 0; i <= maxDays + 1; i++) {
                tickList.push(i)
            }
        } else {
            while (maxDays % 5 !== 0) {
                setMaxDays(maxDays + 1)
            }
            for (let i = 0; i <= maxDays; i + 5) {
                tickList.push(i)
            }
        }
        return tickList
    }

    return (
        <>
            <View style={styles.pageStyle}>
                {selectedBehavior && selectedMonth && selectedYear ?
                    <View style={styles.container}>
                        <Text style={styles.chartHeaderText}>Occurrences of {selectedBehavior} for the month of {dayjs(selectedMonth).format("MMMM")}, {dayjs(selectedYear).format("YYYY")}</Text>
                        <VictoryChart style={styles.graph} domainPadding={{ x: 50 }} width={370} theme={VictoryTheme.material}>
                            <VictoryAxis
                                tickValues={[7, 14, 21, 28]}
                                tickFormat={[`${abbrMonth()} 7`, `${abbrMonth()} 14`, `${abbrMonth()} 21`, `${abbrMonth()} 28`]}
                            />  
                            <VictoryLine 
                                style={{ data: { stroke: '#1761a0' } }} 
                                data={behaviorFrequencyToDate('Screaming/yelling')} 
                                x="date" y="frequency" 
                                interpolation="basis"
                            />
                            <VictoryAxis
                                dependentAxis
                                tickValues={setTickValues()}
                                tickFormat={setTickValues()}
                            />
                        </VictoryChart>
                    </View>
                    : <EmptyGraphSplash/>
                }
                <View style={styles.pickerContainers}>
                    <View style={styles.pickersContainer}>
                        <DropDownPicker
                            zIndex={1}
                            placeholder="Year"
                            labelStyle={{fontSize: 18, color: 'black', padding: 10}}
                            items={createNumberList(+currentYear - 30, +currentYear).reverse()}
                            dropDownMaxHeight={160}
                            dropDownStyle={{backgroundColor: '#f8f8ff'}}
                            containerStyle={{
                                height: 70, 
                                width: 120, 
                                shadowColor: 'black',
                                shadowOpacity: 0.2,
                                shadowOffset: {width: 1, height: 1}
                            }}
                            onChangeItem={(item) => setSelectedYear(item.value)}
                        />
                        <DropDownPicker
                            zIndex={1}
                            placeholder="Month"
                            labelStyle={{fontSize: 18, color: 'black', padding: 10}}
                            items={createMonthOptions()}
                            dropDownMaxHeight={160}
                            dropDownStyle={{backgroundColor: '#f8f8ff'}}
                            containerStyle={{
                                height: 70, 
                                width: 120, 
                                shadowColor: 'black',
                                shadowOpacity: 0.2,
                                shadowOffset: {width: 1, height: 1}
                            }}
                            onChangeItem={(item) => setSelectedMonth(item.value)}
                        />
                    </View>
                    <View style={styles.behaviorPicker}>
                        <DropDownPicker
                            zIndex={4000}
                            placeholder="Select a Behavior"
                            labelStyle={{fontSize: 18, color: 'black', padding: 10}}
                            items={[
                                {label: 'Refusal to follow directions', value: 'Refusal to follow directions'},
                                {label: 'Verbal refusal', value: 'Verbal refusal'},
                                {label: 'Making verbal threats', value: 'Making verbal threats'},
                                {label: 'Crying/whining', value: 'Crying/whining'},
                                {label: 'Screaming/yelling', value: 'Screaming/yelling'},
                                {label: 'Scratching', value: 'Scratching'},
                                {label: 'Biting', value: 'Biting'},
                                {label: 'Kicking', value: 'Kicking'},
                                {label: 'Spitting', value: 'Spitting'},
                                {label: 'Flopping', value: 'Flopping'},
                                {label: 'Running away', value: 'Running away'},
                                {label: 'Destroying property', value: 'Destroying property'},
                                {label: 'Flipping furniture', value: 'Flipping furniture'},
                                {label: 'Hitting self', value: 'Hitting self'},
                                {label: 'Hitting others (students)', value: 'Hitting others (students)'},
                                {label: 'Hitting others (adults)', value: 'Hitting others (adults)'},
                            ]}
                            itemStyle={{justifyContent: 'flex-start'}}
                            dropDownMaxHeight={260}
                            dropDownStyle={{zIndex: 10500}}
                            dropDownStyle={{backgroundColor: '#f8f8ff'}}
                            containerStyle={{
                                height: 70, 
                                width: 270, 
                                shadowColor: 'black',
                                shadowOpacity: 0.2,
                                shadowOffset: {width: 1, height: 1}
                            }}
                            onChangeItem={(item) => setSelectedBehavior(item.value)}
                        />
                    </View>
                </View>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    pageStyle: {
        backgroundColor: '#f5f5f5'
    },
    container: {
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f5f5f5",
        marginTop: 50
    },
    chartHeaderText: {
        width: '80%',
        textAlign: "center"
    },
    behaviorPicker: {
        marginTop: 20,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center'
    },
    pickersContainer: {
        marginTop: 25,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center'
    },
    pickerContainers: {
        flexDirection: 'column-reverse'
    }
});