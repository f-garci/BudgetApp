import React from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';

const Spending = props => {

    return (
        <View style={styles.container}>
            <Text>Your Spendings</Text>
        </View>
    )

}
const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor: "#98c46a",
        paddingTop: 50,
    },
    
});

export default Spending;