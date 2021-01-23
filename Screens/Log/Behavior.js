import React from 'react'
import { View, Text } from 'react-native';

import { BigButton } from '../../Components/Button';
import { DropDownBig } from '../../Components/DropDown';
import { behaviors } from '../../Components/Options';
import { Styles } from '../../Components/Styles';

export default function Behavior({ navigation, incident, setIncident }) {

    const navigateToNextPage = () => {
        incident["behavior"] ? 
            navigation.navigate("Consequence")
            : alert ("Select a Behavior")
    }

    return (
        <>
            <View style={Styles.headerContainer}>
                <Text style={Styles.labelHeader}>B: Behavior</Text>
            </View>

            <View style={Styles.selectionContainer}>
                <DropDownBig
                    placeholder={"Select a Behavior"}
                    items={behaviors}
                    onChangeItem={item => setIncident({...incident, "behavior": item.value})}
                />
            </View>
            
            <View style={Styles.bottomButton}>
                <BigButton
                    buttonText={"Submit Behavior"}
                    handlePress={navigateToNextPage}
                />
            </View>
        </>
    )
}