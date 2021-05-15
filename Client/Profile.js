import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import {
    Image,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    Alert,
} from "react-native";
import { useAuth } from "../contexts/AuthContext";

const Profile = (props) => {
    const [monthly, setMonthly] = useState(false);

    return (
        <View style={styles.container}>
            <Text>Profile Page</Text>
            <Text>Name:</Text>
            <TextInput onChangeText={(text) => setName(text)} />
            <Text>Budget Amount</Text>
            <TextInput
                onChangeText={(text) => setBudget(text)}
                keyboardType={"numeric"}
            />
            <Text>Preferred Budget Length</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#98c46a",
        alignItems: "center",
        justifyContent: "center",
    },
    inputContainer: {
        width: 200,
    },
    buttonsContainer: {
        flexDirection: "row",
        width: 200,
        justifyContent: "space-evenly",
        padding: 10,
    },
    inputs: {
        borderBottomWidth: 1,
        height: 40,
        borderBottomColor: "#000000",
    },
    loginButton: {
        width: 70,
        height: 40,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#07706a",
        borderRadius: 5,
    },
    createProfileLink: {
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#6d9aa8",
        width: 100,
        borderRadius: 5,
    },
    buttonText: {
        color: "white",
    },
});

export default Profile;
