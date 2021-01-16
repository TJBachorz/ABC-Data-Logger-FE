import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { VictoryLine, VictoryChart, VictoryTheme, VictoryAxis } from "victory-native";
import { countBy, uniq } from 'lodash';

import { behaviors } from '../../Components/Options';
import { DropDownMedium } from '../../Components/DropDown';
import { 
    MMM, 
    MMMM, 
    currentYear, 
    createMonthOptions 
} from '../../Components/DateFunctions';
import EmptyGraphSplash from './EmptyGraphSplash';

export default function DataChart({ incidentHistory }){

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
            let month = incident.date.split("-")[1]
            let year = incident.date.split("-")[0]
            return month === selectedMonth && year === selectedYear
        })
    }    

    const monthMMM = MMM[selectedMonth]

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
                        <Text style={styles.chartHeaderText}>
                            Occurrences of "{selectedBehavior}" for the month of {MMMM[selectedMonth]}, {selectedYear}
                        </Text>
                        <VictoryChart 
                            style={styles.graph} 
                            domainPadding={{ x: 50 }} 
                            width={370} 
                            theme={VictoryTheme.material}
                        >
                            <VictoryAxis
                                tickValues={[7, 14, 21, 28]}
                                tickFormat={[`${monthMMM} 7`, `${monthMMM} 14`, `${monthMMM} 21`, `${monthMMM} 28`]}
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
                    <View style={styles.datePickersContainer}>
                        <DropDownMedium
                            placeholder="Year"
                            items={createNumberList(+currentYear - 30, +currentYear).reverse()}
                            onChangeItem={item => setSelectedYear(item.value)}
                        />
                        <DropDownMedium
                            placeholder="Month"
                            items={createMonthOptions()}
                            onChangeItem={item => setSelectedMonth(item.value)}
                        />
                    </View>
                    <View style={styles.behaviorPicker}>
                        <DropDownPicker
                            placeholder="Select a Behavior"
                            labelStyle={{fontSize: 18, color: 'black', padding: 10}}
                            items={behaviors}
                            itemStyle={{justifyContent: 'flex-start'}}
                            dropDownMaxHeight={220}
                            dropDownStyle={{backgroundColor: '#f8f8ff'}}
                            containerStyle={{
                                height: 70, 
                                width: 270, 
                                shadowColor: 'black',
                                shadowOpacity: 0.2,
                                shadowOffset: {width: 1, height: 1}
                            }}
                            onChangeItem={item => setSelectedBehavior(item.value)}
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
    datePickersContainer: {
        marginTop: 25,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center'
    },
    pickerContainers: {
        flexDirection: 'column-reverse'
    }
});