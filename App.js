import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { HomeScreenStack } from "./Navigation/MainNavigator";
import { AuthProvider } from "./contexts/AuthContext";

export default function App() {
    return (
        <AuthProvider>
            <NavigationContainer>
                <HomeScreenStack></HomeScreenStack>
            </NavigationContainer>
        </AuthProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
});
