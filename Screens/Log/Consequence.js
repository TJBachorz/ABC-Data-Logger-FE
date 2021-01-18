import React from 'react'
import { View, Text } from 'react-native';

import { BigButton } from '../Components/Button';
import { DropDownBig } from '../Components/DropDown';
import { consequences } from '../Components/Options';
import { Styles } from '../Components/Styles';

export default function Consequence({ navigation, incident, setIncident }) {

    const navigateToNextPage = () => {
        incident["consequence"] ? 
            navigation.navigate("IncidentDateTime")        
            : alert ("Select a Consequence")
    }

    return (
        <>
            <View style={Styles.headerContainer}>
                <Text style={Styles.labelHeader}>C: Consequence</Text>
            </View>
            <View style={Styles.selectionContainer}>
                <DropDownBig
                    placeholder={"Select a Consequence"}
                    items={consequences}
                    onChangeItem={item => setIncident({...incident, "consequence": item.value})}
                />
            </View>
            <View style={Styles.bottomButton}>
                <BigButton
                    buttonText={"Submit Consequence"}
                    handlePress={navigateToNextPage}
                />
            </View>
        </>
    )
}