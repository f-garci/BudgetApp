import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    TextInput,
} from "react-native";
import { useAuth } from "../contexts/AuthContext";

const SignUp = (props) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmedPassword, setConfirmedPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const { signup } = useAuth();

    async function handleSubmit(e) {
        e.preventDefault();

        if (email === "") {
            return setError("Email cannot be empty");
        }

        if (password !== confirmedPassword) {
            return setError("Passwords do not match");
        }

        try {
            setError("");
            setLoading(true);
            await signup(email, password);
            props.navigation.navigate("Login");
        } catch (error) {
            console.log(error);
            setError("Failed to create an account");
        }

        setLoading(false);
    }

    return (
        <View style={styles.container}>
            <Text>Create Profile</Text>
            <Text>{error}</Text>
            <Text>Email</Text>
            <TextInput onChangeText={(text) => setEmail(text)} />
            <Text>Password</Text>
            <TextInput onChangeText={(text) => setPassword(text)} />
            <Text>Confirm Password</Text>
            <TextInput onChangeText={(text) => setConfirmedPassword(text)} />
            <TouchableOpacity
                name={"Submit"}
                style={styles.saveButton}
                disabled={loading}
                onPress={handleSubmit}
            >
                <Text style={{ color: "white" }}>Save</Text>
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
    saveButton: {
        width: 70,
        height: 40,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "green",
        borderRadius: 5,
    },
});

export default SignUp;
