import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "../Client/Login";
import NewProfile from "../Client/NewProfile";
import Dashboard from "../Client/Dashboard";
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
                name="New Profile"
                component={NewProfile}
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
        </Stack.Navigator>
    );
};

export { HomeScreenStack };
