import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "../Client/Login";
import SignUp from "../Client/SignUp";
import Dashboard from "../Client/Dashboard";
import Profile from "../Client/Profile";
import Transactions from "../Client/Transactions";
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
            <Stack.Screen name="History" component={Transactions} />
        </Stack.Navigator>
    );
};

export { HomeScreenStack };
