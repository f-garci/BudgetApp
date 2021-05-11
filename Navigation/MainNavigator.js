import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "../Client/Login";
import SignUp from "../Client/SignUp";
import Dashboard from "../Client/Dashboard";
import Profile from "../Client/Profile";
import AlertsScreen from '../Client/Alerts';
// import Constants from "expo-constants";

const Stack = createStackNavigator();

const HomeScreenStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Login"
                component={Login}
                options={{
                    headerStyle: {
                        backgroundColor: "#63A088",
                        // transform: [{ translateY: Constants.statusBarHeight }],
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
                        // transform: [{ translateY: Constants.statusBarHeight }],
                    },
                    headerTitleStyle: { color: "white" },
                }}
            />
            <Stack.Screen
                name="Dashboard"
                component={Dashboard}
                options={{
                    headerStyle: {
                        backgroundColor: "#63A088",
                        // transform: [{ translateY: Constants.statusBarHeight }],
                    },
                    headerTitleStyle: { color: "white" },
                    headerLeft: null,
                }}
            />
            <Stack.Screen
                name="Profile"
                component={Profile}
                options={{
                    headerStyle: {
                        backgroundColor: "#63A088",
                        // transform: [{ translateY: Constants.statusBarHeight }],
                    },
                    headerTitleStyle: { color: "white" },
                    headerLeft: null,
                }}
            />
        </Stack.Navigator>
    );
};

function OverviewStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Overview" component={Overview} />
            <Stack.Screen name="Transactions" component={Transactions} />
            <Stack.Screen name="Budget" component={Budget} />
            <Stack.Screen name="Spending" component={Spending} />
        </Stack.Navigator>
    );
}

function BottomTabNavigator() {
    return (
        <Tab.Navigator>
            <Tab.Screen name="OverviewScreen" component={OverviewStack} />
            <Tab.Screen name="AlertsScreen" component={AlertsScreen} />
            <Tab.Screen name="SettingsScreen" component={SettingsScreen} />
        </Tab.Navigator>
    );
}

export { HomeScreenStack, OverviewStack, BottomTabNavigator };
