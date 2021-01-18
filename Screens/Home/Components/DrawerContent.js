import React from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Drawer } from 'react-native-paper';
import { useDispatch } from 'react-redux';


export default function DrawerContent({ 
    setCaseInfo,
    navigation, 
}) {

    const dispatch = useDispatch()

    const setIsSignedIn = (value) => {
        dispatch({type: "CHANGE_SIGN_IN", payload: value})
    }

    const setCases = (value) => {
        dispatch({type: "CHANGE_CASES", payload: value})
    }

    const logout = () => {
        AsyncStorage.clear()
        setCaseInfo({})
        setCases([])
        setIsSignedIn(false)
        navigation.navigate("Home")
    }

    const CustomIcon = ({ name }) => {
        return <Icon name={name} size={25} color="#f8f8ff"/>
    }

    return (
        <View style={{flex: 1}}>
            <DrawerContentScrollView>
                <View>
                    <Image 
                        style={styles.image} 
                        source={require('../../../assets/abc_logo_white.png')}
                    />
                </View>
                <Drawer.Section style={{marginTop: 15}}>
                    <DrawerItem 
                        label="Home" 
                        style={styles.drawerItemHome}
                        labelStyle={styles.itemLabel}
                        icon={() => <CustomIcon name="home"/>}
                        onPress={() => navigation.navigate("Home")} 
                    />
                    <DrawerItem 
                        label="Cases" 
                        labelStyle={styles.itemLabel}
                        icon={() => <CustomIcon name="folder-account" />}
                        onPress={() => navigation.navigate("Cases")} 
                    />
                    <DrawerItem 
                        label="Data" 
                        labelStyle={styles.itemLabel}
                        icon={() => <CustomIcon name="chart-bar"/>}
                        onPress={() => navigation.navigate("Data")} 
                    />
                    <DrawerItem 
                        label="Link Accounts" 
                        labelStyle={styles.itemLabel}
                        icon={() => <CustomIcon name="link-variant"/>}
                        onPress={() => navigation.navigate("Link Accounts")} 
                    />
                    <DrawerItem 
                        label="Settings" 
                        labelStyle={styles.itemLabel}
                        icon={() => <CustomIcon name="settings"/>}
                        onPress={() => {}} 
                    />
                    <DrawerItem 
                        label="Logout"
                        labelStyle={styles.logoutLabel} 
                        style={styles.logoutField}
                        icon={() => <CustomIcon name="logout"/>}
                        onPress={logout} 
                    />
                </Drawer.Section>
            </DrawerContentScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    drawerItemHome: {
        borderTopWidth: 1,
        borderTopColor: "gray",
        paddingTop: 10
    },
    itemLabel: {
        fontSize: 24,
        color: "#f8f8ff",
    },
    logoutLabel: {
        fontSize: 18,
        color: "#f8f8ff"
    },
    logoutField: {
        fontSize: 40,
        marginTop: 100,
        borderBottomWidth: 1,
        borderBottomColor: "gray"
    },
    image: {
        marginLeft: 70,
        marginTop: 10,
    },
});