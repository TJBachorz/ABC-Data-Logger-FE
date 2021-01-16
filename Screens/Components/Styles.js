import { StyleSheet } from 'react-native';

export const Styles = StyleSheet.create({
    detailText: {
        color: '#f8f8ff',
        margin: 7
    },
    details: {
        marginTop: 35,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    image: {
        height: 250,
        width: 250,
    },
    formContainer: {
        flex: 1,
        backgroundColor: '#1761a0',
        alignItems: 'center',
        justifyContent: 'center'
    },
    headerContainer: {
        marginTop: 30,
        justifyContent: 'center',
        alignItems: 'center'
    },
    selectionContainer: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginTop: 80,
    },
    incidentButton: {
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 40
    },
    labelHeader: {
        fontSize: 48
    }
})