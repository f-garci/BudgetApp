import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

import { useAuth } from "../contexts/AuthContext";
import { signedIn } from "../store/actions/actionTypes";

import { useDispatch } from "react-redux";

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
            <TouchableOpacity
                style={styles.logoutButton}
                onPress={handleLogout}
            >
                <Text style={{ color: "white" }}>Logout</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
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
