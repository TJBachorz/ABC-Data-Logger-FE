// import React from 'react';
// import DataChart from './DataChart';
// import App from '../App';
// import { createDrawerNavigator, 
//     DrawerContentScrollView, 
//     DrawerItemList, 
//     DrawerItem
// } from '@react-navigation/drawer';

// const Drawer = createDrawerNavigator();


// function CustomDrawerContent(props) {
//     return (
//         <DrawerContentScrollView {...props}>
//             <DrawerItemList {...props} />
//             <DrawerItem label="Log Out" onPress={logout} />
//         </DrawerContentScrollView>
//     );
// }

// export default function DrawerContent() {
    
//     const logout = async () => {
//         await AsyncStorage.clear()
//         setIsSignedIn(!isSignedIn)
//         navigation.navigate("Home")
//     }


//     return (
//         <Drawer.Navigator>
//         </Drawer.Navigator>
//     );
// }

// drawerContent={props => <CustomDrawerContent {...props} 