import React from "react";
import { Text, StyleSheet, TouchableOpacity } from "react-native";

import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Login from "../Client/Login";
import SignUp from "../Client/SignUp";
import Transactions from "../Client/Transactions";
import Overview from "../Client/Overview";
import Budget from "../Client/Budget";
import Spending from "../Client/Spending";
import AddTransactions from "../Client/AddTransactions";
import Alerts from "../Client/Alerts";
import Settings from "../Client/Settings";
import { Icon } from "react-native-elements";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const HomeScreenStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Login"
                component={Login}
                options={{
                    headerStyle: {
                        backgroundColor: "#63A088",
                    },
                    headerTitleStyle: { color: "white" },
                }}
            />
            <Stack.Screen
                name="Sign Up"
                component={SignUp}
                options={{
                    headerStyle: {
                        backgroundColor: "#63A088",
                    },
                    headerTitleStyle: { color: "white" },
                }}
            />

            <Stack.Screen
                name="BottomTab"
                component={BottomTabNavigator}
                options={{
                    headerShown: false,
                }}
            />
        </Stack.Navigator>
    );
};

const OverviewStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Overview"
                component={Overview}
                options={({ navigation }) => ({
                    headerStyle: {
                        backgroundColor: "#63A088",
                    },
                    headerTitleStyle: { color: "white" },
                    title: "Overview",
                    headerRight: () => (
                        <TouchableOpacity
                            onPress={() =>
                                navigation.navigate("AddTransactions")
                            }
                        >
                            <Text style={styles.plusButton}> + </Text>
                        </TouchableOpacity>
                    ),
                    headerLeft: () => {
                        return null;
                    },
                })}
            />
            <Stack.Screen
                name="Transactions"
                component={Transactions}
                options={{
                    headerStyle: {
                        backgroundColor: "#63A088",
                    },
                    headerTitleStyle: { color: "white" },
                    headerTitle: "Transactions History",
                }}
            />
            <Stack.Screen
                name="Budget"
                component={Budget}
                options={{
                    headerStyle: {
                        backgroundColor: "#63A088",
                    },
                    headerTitleStyle: { color: "white" },
                    headerTitle: "Budget Breakdown",
                }}
            />
            <Stack.Screen
                name="Spending"
                component={Spending}
                options={{
                    headerStyle: {
                        backgroundColor: "#63A088",
                    },
                    headerTitleStyle: { color: "white" },
                    headerTitle: "Spending Breakdown",
                }}
            />
            <Stack.Screen
                name="AddTransactions"
                component={AddTransactions}
                options={{
                    headerStyle: {
                        backgroundColor: "#63A088",
                    },
                    headerTitleStyle: { color: "white" },
                    headerTitle: "Add new transaction",
                }}
            />
        </Stack.Navigator>
    );
};

const AlertStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Alerts"
                component={Alerts}
                options={{
                    headerStyle: {
                        backgroundColor: "#63A088",
                    },
                    headerTitleStyle: { color: "white" },
                    headerLeft: () => {
                        return null;
                    },
                }}
            />
        </Stack.Navigator>
    );
};
const SettingsStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Settings"
                component={Settings}
                options={{
                    headerStyle: {
                        backgroundColor: "#63A088",
                    },
                    headerTitleStyle: { color: "white" },
                    headerLeft: () => {
                        return null;
                    },
                }}
            />
        </Stack.Navigator>
    );
};

const BottomTabNavigator = () => {
    return (
        <Tab.Navigator>
            <Tab.Screen
                name="OverviewTab"
                component={OverviewStack}
                options={{
                    title: "Overview",
                    tabBarIcon: () => (
                        <Icon type="ionicon" name="home-outline" />
                    ),
                }}
            />
            <Tab.Screen
                name="AlertsTab"
                component={AlertStack}
                options={{
                    title: "Alerts",
                    tabBarIcon: () => (
                        <Icon type="ionicon" name="notifications-outline" />
                    ),
                }}
            />
            <Tab.Screen
                name="SettingsTab"
                component={SettingsStack}
                options={{
                    title: "Settings",
                    tabBarIcon: () => (
                        <Icon type="ionicon" name="settings-outline" />
                    ),
                }}
            />
        </Tab.Navigator>
    );
};

const styles = StyleSheet.create({
    plusButton: {
        fontSize: 28,
        marginRight: 15,
        color: "white",
    },
});

export { HomeScreenStack };
