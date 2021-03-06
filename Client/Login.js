import { StatusBar } from "expo-status-bar";
import { LinearGradient } from "expo-linear-gradient";
import React, { useState, useEffect } from "react";
import {
    Image,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    LogBox,
} from "react-native";

import { signedIn } from "../store/actions/actionTypes";

import { useAuth } from "../contexts/AuthContext";
import { useDispatch } from "react-redux";

LogBox.ignoreAllLogs();

const Login = (props) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();

    const dispatch = useDispatch();

    // Will handle login. A message will display if the login was unsuccessful.
    // If login is successful, it will redirect to the dashboard of authenticated user
    async function handleLogin(e) {
        e.preventDefault();

        if (email === "") {
            return setError("Email cannot be empty.");
        }

        if (password === "") {
            return setError("Passwords cannot be empty.");
        }

        try {
            setError("");
            setLoading(true);
            await login(email, password);
            dispatch({ type: signedIn, isSignedIn: true });
        } catch (error) {
            console.log(error);
            setError("Failed to sign in.");
        }

        setLoading(false);
    }

    return (
        // <View style={styles.container}>
        <LinearGradient
            colors={["#07706a", "#98c46a"]}
            style={styles.container}
        >
            <Image
                source={require("../Images/1611179.png")}
                style={{
                    width: 200,
                    height: 200,
                    transform: [{ translateY: -50 }],
                }}
            />
            <Text>{error}</Text>
            <View style={styles.inputContainer}>
                <TextInput
                    placeholder="Email"
                    style={styles.inputs}
                    onChangeText={(text) => setEmail(text)}
                />
                <TextInput
                    placeholder="Password"
                    style={styles.inputs}
                    onChangeText={(text) => setPassword(text)}
                    secureTextEntry
                />
            </View>
            <View style={styles.buttonsContainer}>
                <TouchableOpacity
                    style={styles.loginButton}
                    onPress={handleLogin}
                >
                    <Text style={styles.buttonText}>Login</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.createProfileLink}
                    onPress={() => props.navigation.navigate("Sign Up")}
                >
                    <Text style={styles.buttonText}>Sign Up</Text>
                </TouchableOpacity>
            </View>
            <StatusBar style="auto" />
        </LinearGradient>
        // </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#98c46a",
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
        borderBottomColor: "#000000",
    },
    loginButton: {
        width: 70,
        height: 40,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#07706a",
        borderRadius: 5,
    },
    createProfileLink: {
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#6d9aa8",
        width: 100,
        borderRadius: 5,
    },
    buttonText: {
        color: "white",
    },
});

export default Login;
