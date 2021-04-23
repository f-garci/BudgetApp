import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect, useCallback } from "react";
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
    const [name, setName] = useState("");
    const [startingBudget, setStartingBudget] = useState(0);
    const [budgetPeriod, setBudgetPeriod] = useState("");
    const [biWeekly, setBiWeekly] = useState(false);
    const [weekly, setWeekly] = useState(false);
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
            <View>
                <View
                    style={{
                        flexDirection: "row",
                        width: 100,
                        justifyContent: "space-evenly",
                        alignItems: "center",
                        margin: 5,
                    }}
                >
                    <TouchableOpacity
                        onPress={() => {
                            setBiWeekly(!biWeekly);
                            setWeekly(false);
                            setMonthly(false);
                        }}
                        style={{
                            width: 125,
                            height: 20,
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "space-evenly",
                        }}
                    >
                        {biWeekly ? (
                            <Image
                                source={require("../Images/double-tick.png")}
                                style={{
                                    width: 25,
                                    height: 25,
                                    alignSelf: "auto",
                                }}
                            />
                        ) : (
                            <></>
                        )}
                        <View
                            style={{
                                backgroundColor: biWeekly ? "gray" : "green",
                                borderRadius: 50,
                                height: 30,
                                width: 80,
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                        >
                            <Text style={{ color: "white" }}>Bi-weekly</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <View
                    style={{
                        flexDirection: "row",
                        width: 100,
                        justifyContent: "space-evenly",
                        margin: 5,
                    }}
                >
                    <TouchableOpacity
                        onPress={() => setWeekly(!weekly)}
                        style={{
                            width: 20,
                            height: 20,
                            borderColor: "gray",
                            borderWidth: 1,
                            borderRadius: 5,
                        }}
                    >
                        <Text
                            style={{
                                textAlign: "center",
                            }}
                        >
                            {weekly ? "X" : ""}
                        </Text>
                    </TouchableOpacity>
                    <Text>Weekly</Text>
                </View>
            </View>
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
        borderBottomColor: "#D3D3D3",
    },
    loginButton: {
        width: 70,
        height: 40,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "green",
        borderRadius: 5,
    },
    createProfileLink: {
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "gray",
        width: 100,
        borderRadius: 5,
    },
    buttonText: {
        color: "white",
    },
});

export default Profile;
