import React from "react";
import { StyleSheet, View, Text } from "react-native";

const ProgressBar = (props) => {
    let value = props.completedValue;
    let color = props.color;
    if (props.completedValue >= 100) {
        value = 100;
        color = "#eb2f06";
    }
    if (props.completedValue <= 5 && props.completedValue != 0) {
        value = 5;
    }

    const fillBar = styles.fillBar(value, color);
    return (
        <View style={styles.container}>
            <View style={styles.containerBar}>
                <View style={fillBar}></View>
                <View style={styles.textView}>
                    <Text style={styles.spentText}>
                        ${Number(props.totalSpent).toFixed(2)} of $
                        {Number(props.budget).toFixed(2)}
                    </Text>
                </View>
            </View>
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        alignItems: "center",
    },
    containerBar: {
        height: 30,
        width: "100%",
        backgroundColor: "#e0e0de",
        borderRadius: 50,
        margin: 20,
    },
    fillBar: (completedValue, color) => ({
        height: "100%",
        width: `${completedValue}%`,
        backgroundColor: `${color}`,
        borderRadius: 50,
    }),
    textView: {
        justifyContent: "center",
        position: "absolute",
        top: 5,
    },
    spentText: {
        color: "white",
        paddingLeft: 6,
    },
});

export default ProgressBar;
