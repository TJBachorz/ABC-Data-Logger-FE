import React, {useState} from 'react'
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import { Button } from 'react-native-elements';


export default function UserHomePage({navigation, setCaseInfo, caseInfo}) {
    return (
        <>
            <ScrollView
                contentContainerStyle={styles.historyContainer}
            >
                <Text>History here</Text>
            </ScrollView>
            <View style={styles.incidentButton}>
                <Button
                    title={"Log New Incident"}
                    type="solid" 
                    buttonStyle={{
                        background: '#1761a0',
                        borderRadius: 16,
                        margin: 1,
                        height: 50,
                        width: 360,
                        marginBottom: 30,
                    }}
                    onPress={ () => navigation.navigate('Antecedent')} 
                />
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    historyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    incidentButton: {
        justifyContent: 'center',
        alignItems: 'center'
    }
})


// options={{
//     headerTitle: "",
//     headerLeft: () => (
//         <Button
//             type="clear"
//             icon={
//                 <Icon
//                     name="nav-icon-a"
//                     size={22}
//                     color="#1761a0"
//                 />
//             }
//             onPress={() => alert('This is a button!')}
//             buttonStyle={{
//                 fontWeight: 'bold',
//                 marginLeft: 20,
//                 fontWeight: 200,
//                 backgroundColor: '#f8f8ff',
//             }}
//         />
//     )
// }}