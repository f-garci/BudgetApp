import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { HomeScreenStack } from "./Navigation/MainNavigator";

import { AuthProvider } from "./contexts/AuthContext";

import selectionReducer from "./store/reducers/selectionReducer";
import { createStore, combineReducers } from "redux";
import { Provider } from "react-redux";

const rootReducer = combineReducers({
    month: selectionReducer,
});

const store = createStore(rootReducer);

export default function App() {
    return (
        <Provider store={store}>
            <AuthProvider>
                <NavigationContainer>
                    <HomeScreenStack></HomeScreenStack>
                </NavigationContainer>
            </AuthProvider>
        </Provider>
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
