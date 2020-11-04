// import React from 'react';
// import DataChart from './DataChart';
// import App from '../App';
// import { createDrawerNavigator, 
//     DrawerContentScrollView, 
//     DrawerItemList, 
//     DrawerItem
// } from '@react-navigation/drawer';

// const Drawer = createDrawerNavigator();

// const logout = async () => {
//     await AsyncStorage.clear()
//     setIsSignedIn(!isSignedIn)
//     navigation.navigate("Home")
// }

// function CustomDrawerContent(props) {
//     return (
//         <DrawerContentScrollView {...props}>
//             <DrawerItemList {...props} />
//             <DrawerItem label="Log Out" onPress={logout} />
//         </DrawerContentScrollView>
//     );
// }

// export default function MyDrawer() {
//     return (
//         <Drawer.Navigator drawerContent={props => <CustomDrawerContent {...props} />}>
//             <Drawer.Screen name="Data-Chart" component={DataChart}/>
//         </Drawer.Navigator>
//     );
// }