// import AsyncStorage from '@react-native-async-storage/async-storage';

// export const fetchCases = () => {
//     AsyncStorage.getItem("token")
//         .then(token => {
//             return fetch(`${baseURL}/accounts/`, {
//                 method: "GET",
//                 headers: {
//                     "Accept": "application/json",
//                     "Content-Type": "application/json",
//                     "Authorization": `Bearer ${token}`
//                 }
//             })
//         }).then(response => response.json())
//         .then(userAccount => setAccount(userAccount))
// }