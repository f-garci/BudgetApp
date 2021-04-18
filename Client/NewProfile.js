import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Alert,
    TextInput,
    Button,
} from "react-native";
import { useAuth } from "../contexts/AuthContext";

const NewProfile = (props) => {
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
                // () => {
                //     if (email === "" || password === "") {
                //         Alert.alert(
                //             "Missing information",
                //             "Email/password cannot be left blank."
                //         );
                //     } else if (password.length < 6) {
                //         Alert.alert(
                //             "Password Error",
                //             "Password cannot be less than 6 characters."
                //         );
                //     } else {
                //         handleSubmit(event);
                //         // const error = addUser(userName, password, budget);
                //         // if (!error) props.navigation.navigate("Dashboard");
                //         // else Alert.alert("Email", "Not a valid email");
                //     }
                // }
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

export default NewProfile;
