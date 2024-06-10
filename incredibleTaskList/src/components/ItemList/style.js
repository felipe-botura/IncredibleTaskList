import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    itemList: {
        padding: 15,
        elevation: 12,
        borderRadius: 7,
        borderWidth: 2,
        borderColor: '#262254',
        marginVertical: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#262254c0'
    },
    itemToBuy: {
        color: '#fff',
        fontSize: 24,
        textDecorationLine: 'none',
    },
    itemBought: {
        color: '#fff',
        fontSize: 24,
        textDecorationLine: 'line-through',
    },
    actionIcon: {
        height: 40,
        width: 40,
        backgroundColor: '#9587e2',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 10,
        borderRadius: 20,
        
    }
});