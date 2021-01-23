import React, { useEffect } from 'react'
import { View, Text } from 'react-native';

import { BigButton } from '../../Components/Button';
import { DropDownBig } from '../../Components/DropDown';
import { antecedents } from '../../Components/Options';
import { 
    currentYear,
    defaultDay,
    defaultMinutes,
    defaultHours,
    defaultMonth
} from '../../Components/DateFunctions';
import { Styles } from '../../Components/Styles';

export default function Antecedent({ navigation, incident, setIncident }) {

    const navigateToNextPage = () => {
        incident["antecedent"] ? 
            navigation.navigate("Behavior") 
            : alert ("Select an Antecedent")
    }

    useEffect(() => {
        setIncident({
            "year": `${currentYear}`,
            "month": defaultMonth(),
            "hour": defaultHours(),
            "minute": defaultMinutes(),
            "day": defaultDay()
        })
    }, [])

    return (
        <>
            <View style={Styles.headerContainer}>
                <Text style={Styles.labelHeader}>A: Antecedent</Text>
            </View>

            <View style={Styles.selectionContainer}>
                <DropDownBig
                    placeholder={"Select an Antecedent"}
                    items={antecedents}
                    onChangeItem={item => setIncident({...incident, "antecedent": item.value})}
                />
            </View>
            
            <View style={Styles.bottomButton}>
                <BigButton
                    buttonText={"Submit Antecedent"}
                    handlePress={navigateToNextPage}
                />
            </View>
        </>
    )
}