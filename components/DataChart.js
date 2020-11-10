import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    ScrollView
} from 'react-native';

import DropDownPicker from 'react-native-dropdown-picker';
import { VictoryBar, VictoryChart, VictoryStack, VictoryTheme, VictoryAxis } from "victory-native";
import { countBy, uniq } from 'lodash';



export default function DataChart({ incidentHistory, caseInfo }){

    const behaviorFrequencyToDate = (selectedBehavior) => {
        const incidentsByBehavior = incidentHistory.filter(incident => {
            return incident.behavior === selectedBehavior
        })
        const dates = datesOfIncidents(incidentsByBehavior)
        const uniqueDates = uniq(dates)
        return uniqueDates.map(behaviorDate => {
            const behaviorFrequency = countBy(dates)[behaviorDate]
            const incidentDate = new Date(behaviorDate).getDate() + 1
            return {date: incidentDate, frequency: behaviorFrequency}
        })
    }

    const datesOfIncidents = (mappedIncidents) => {
        return mappedIncidents.map(incident => incident.date)
    }    

    const data = [
        {date: 7, frequency: 1},
        {date: 6, frequency: 1},
        {date: 5, frequency: 19},
        {date: 31, frequency: 1},
        {date: 1, frequency: 1}
    ];
    // const data = [
    //     { date: 1, frequency: 13000 },
    //     { date: 2, frequency: 16500 },
    //     { date: 3, frequency: 14250 },
    //     { date: 4, frequency: 19000 }
    // ];


    return (
        <>
            {/* <DropDownPicker
                        placeholder="Month"
                        labelStyle={{fontSize: 16, color: 'black', padding: 10}}
                        items={createMonthOptions()}
                        defaultValue={incident["month"]}
                        dropDownMaxHeight={200}
                        containerStyle={{height: 60, width: 120, margin: 5}}
                        onChangeItem={(item) => setIncident({...incident, "month": item.value})}
                    /> */}
            <View style={styles.container}>
                <Text>Charts for {caseInfo.name}</Text>
                <VictoryChart domainPadding={{ x: 50 }} width={370} theme={VictoryTheme.material}>
                    <VictoryAxis
                        tickValues={[7, 14, 21, 28]}
                        tickFormat={["Oct 7", "Oct 14", "Oct 21", "Oct 28"]}
                    />  
                    <VictoryBar style={{ data: { fill: '#1761a0'} }} data={behaviorFrequencyToDate('Screaming/yelling')} x="date" y="frequency" />
                    <VictoryAxis
                        dependentAxis
                        tickValues={[1, 2]}
                        tickFormat={[1, 2]}
                    />
                </VictoryChart>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f5fcff"
    }
});
