import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

import { useAuth } from "../contexts/AuthContext";
import { signedIn } from "../store/actions/actionTypes";

import { useDispatch } from "react-redux";
import { TextInput } from "react-native-gesture-handler";

const Settings = (props) => {
    const [error, setError] = useState("");
    const { logout, currentUser } = useAuth();
    const dispatch = useDispatch();

    async function handleLogout() {
        setError("");

        try {
            await logout();
            dispatch({ type: signedIn, isSignedIn: false });
        } catch {
            setError("Failed to logout");
        }
    }
    return (
        <View style={styles.container}>
            <View style={styles.greetingContainer}>
                <Text style={styles.greeting}>
                    Welcome, {currentUser.email.split("@")[0]}!
                </Text>
            </View>
            <View style={styles.settingsContainer}>
                <View style={styles.settingsTabContainer}>
                    <Text style={styles.settingsTabLabel}>Username:</Text>
                    <TextInput
                        placeholder={currentUser.email.split("@")[0]}
                        style={styles.settingsTabInput}
                        placeholderTextColor={"black"}
                    />
                </View>
            </View>
            <View
                style={{
                    flex: 1,
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <TouchableOpacity
                    style={styles.logoutButton}
                    onPress={handleLogout}
                >
                    <Text style={{ color: "white" }}>Logout</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    greetingContainer: {
        flex: 1,
    },
    greeting: {
        fontSize: 35,
        marginTop: 30,
        marginBottom: 30,
        paddingLeft: 10,
    },
    settingsContainer: {
        flex: 4,
    },
    settingsTabContainer: {
        flexDirection: "row",
        alignItems: "center",
    },
    settingsTabLabel: {
        paddingLeft: 10,
    },
    settingsTabInput: {
        width: "30%",
        borderWidth: 1,
        padding: 3,
        paddingLeft: 5,
        borderRadius: 7,
        marginLeft: 5,
    },
    logoutButton: {
        width: 70,
        height: 40,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "green",
        borderRadius: 5,
    },
});

export default Settings;
