import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import { Button } from 'react-native-elements';

import DropDownPicker from 'react-native-dropdown-picker';

const months = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12",]

// const days = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31,]

const monthsWithDays = {
    "01": 31, 
    "02": 28, 
    "03": 31, 
    "04": 30, 
    "05": 31, 
    "06": 30,
    "07": 31, 
    "08": 31, 
    "09": 30, 
    "10": 31, 
    "11": 30, 
    "12": 31,
}

let currentDate = new Date()
let startingYear = currentDate.getFullYear() - 10

export default function NewCase({
    account,
    setAccount,
    caseInfo,
    setCaseInfo,
    navigation 
}) {

    const [newCase, setNewCase] = useState({})

    const determineIfLeapYear = (info) => {
        if (info["month"] === "02" && info["year"] % 4 === 0) {
            return monthsWithDays[info["month"]] + 1
        } else {
            return monthsWithDays[info["month"]]
        }
    }

    const createDayOptions = () => {
        let info = JSON.parse(JSON.stringify(newCase))
        let daysList = []
        for (let i = 1; i <= determineIfLeapYear(info); i++) {
            if (i < 10) {
                daysList.push({label: `0${i}`,  value: `0${i}`})
            } else {
                daysList.push({label: `${i}`, value: `${i}`})
            }
        }
        return daysList
    }

    const createMonthOptions = () => {
        return months.map(month => {
            return {label: `${month}`, value: `${month}`}
        })
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

    return (
        <View>
            <Text>Please Enter a Name For This Case:</Text>
            <TextInput
            />
            <View style={styles.selectionContainer}>
                <Text>Please Select Date of Birth:</Text>
                <View>
                    <DropDownPicker
                        placeholder="Year"
                        labelStyle={{fontSize: 16, color: 'black', padding: 10}}
                        items={createNumberList(startingYear, currentDate.getFullYear()).reverse()}
                        defaultValue={newCase["year"]}
                        dropDownMaxHeight={200}
                        containerStyle={{height: 60, width: 100}}
                        onChangeItem={(item) => setNewCase({...newCase, "year": item.value})}
                    />
                    <DropDownPicker
                        placeholder="Month"
                        labelStyle={{fontSize: 16, color: 'black', padding: 10}}
                        items={createMonthOptions()}
                        defaultValue={newCase["month"]}
                        dropDownMaxHeight={200}
                        containerStyle={{height: 60, width: 120, margin: 5}}
                        onChangeItem={(item) => setNewCase({...newCase, "month": item.value})}
                    />
                    <DropDownPicker
                        placeholder="Day"
                        labelStyle={{fontSize: 16, color: 'black', padding: 10}}
                        items={createDayOptions()}
                        defaultValue={newCase["day"]}
                        dropDownMaxHeight={200}
                        containerStyle={{height: 60, width: 100}}
                        onChangeItem={(item) => setNewCase({...newCase, "day": item.value})}
                    />
                </View>
            </View>
            <Button
                title={"Select Case"}
                type="solid" 
                buttonStyle={{
                    background: '#1761a0',
                    borderRadius: 16,
                    margin: 1,
                    height: 50,
                    width: 360,
                    marginBottom: 30,
                }}
                onPress={() => {}}
            /> 
        </View>
    )
}

const styles = StyleSheet.create({
    colon: {
        fontSize: 24,
        padding: 4,
        paddingLeft: 8
    },
    timeContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 50
    },
    headerContainer: {
        marginTop: 30,
        justifyContent: 'center',
        alignItems: 'center'
    },
    selectionContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 80,
    },
    newCaseButton: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    labelHeader: {
        fontSize: 48
    }
})