import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { useAuth } from "../contexts/AuthContext";
import Login from "./Login";
// import logout from "../Backend/index";

const Dashboard = (props) => {
    const [error, setError] = useState("");
    const { currentUser, logout } = useAuth();

    async function handleLogout() {
        setError("");

        try {
            await logout();
            props.navigation.navigate(Login);
        } catch {
            setError("Failed to logout");
        }
    }

    return (
        <View style={styles.container}>
            <Text>Dashboard</Text>
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
        backgroundColor: "#fff",
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

export default Dashboard;
