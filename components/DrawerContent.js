import React from 'react';
import { StyleSheet, View, Image } from 'react-native';

import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Drawer } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function DrawerContent({ 
    setCaseInfo,
    setAccount,
    setIsSignedIn, 
    navigation, 
}) {

    const logout = () => {
        AsyncStorage.clear()
        setCaseInfo({})
        setAccount({})
        setIsSignedIn(false)
        navigation.navigate("Home")
    }

    return (
        <View style={{flex: 1}}>
            <DrawerContentScrollView>
                <View>
                    <Image 
                        style={styles.image} 
                        source={require('../assets/abc_logo_white.png')}
                    />
                </View>
                <Drawer.Section style={styles.drawerSection}>
                    <DrawerItem 
                        label="Home" 
                        style={styles.drawerItemHome}
                        labelStyle={styles.itemLabel}
                        icon={({ color, size }) => (
                            <Icon
                                name="home"
                                size={25}
                                color="#f8f8ff"
                            />
                        )}
                        onPress={() => navigation.navigate("Home")} 
                    />
                    <DrawerItem 
                        label="Cases" 
                        labelStyle={styles.itemLabel}
                        icon={({ color, size }) => (
                            <Icon
                                name="folder-account"
                                size={25}
                                color="#f8f8ff"
                            />
                        )}
                        onPress={() => navigation.navigate("Cases")} 
                    />
                    <DrawerItem 
                        label="Data" 
                        labelStyle={styles.itemLabel}
                        icon={({ color, size }) => (
                            <Icon
                                name="chart-bar"
                                size={25}
                                color="#f8f8ff"
                            />
                        )}
                        onPress={() => navigation.navigate("Data")} 
                    />
                    <DrawerItem 
                        label="Link Accounts" 
                        labelStyle={styles.itemLabel}
                        icon={({ color, size }) => (
                            <Icon
                                name="link-variant"
                                size={25}
                                color="#f8f8ff"
                            />
                        )}
                        onPress={() => navigation.navigate("Link Accounts")} 
                    />
                    <DrawerItem 
                        label="Settings" 
                        labelStyle={styles.itemLabel}
                        icon={({ color, size }) => (
                            <Icon
                                name="settings"
                                size={25}
                                color="#f8f8ff"
                            />
                        )}
                        onPress={() => {}} 
                    />
                    <DrawerItem 
                        label="Logout"
                        labelStyle={styles.logoutLabel} 
                        style={styles.logoutField}
                        icon={({ color, size }) => (
                            <Icon
                                name="logout"
                                size={25}
                                color="#f8f8ff"
                            />
                        )}
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
    drawerSection: {
        marginTop: 15
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