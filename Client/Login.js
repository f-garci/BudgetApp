import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
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

const Login = (props) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();

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
            props.navigation.navigate("BottomTab");
        } catch (error) {
            console.log(error);
            setError("Failed to sign in.");
        }

        setLoading(false);
    }

    return (
        <View style={styles.container}>
            <Image
                source={require("../Images/1611179.png")}
                style={{
                    width: 90,
                    height: 90,
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
                    <Text style={styles.buttonText}>Create Profile</Text>
                </TouchableOpacity>
            </View>
            <TouchableOpacity
                onPress={() => props.navigation.navigate("Dashboard")}
            >
                <Text>Go to Dashboard Testing</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => props.navigation.navigate("Profile")}
            >
                <Text>Go to Profile Testing</Text>
            </TouchableOpacity>
            <StatusBar style="auto" />
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

export default Login;
