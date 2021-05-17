import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    TextInput,
    LogBox,
    SafeAreaView,
} from "react-native";
import { useAuth } from "../contexts/AuthContext";

LogBox.ignoreAllLogs();

const SignUp = (props) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmedPassword, setConfirmedPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const { signup } = useAuth(); // imports sign up function for firebase

    // Will sign up the user. An error will arise if it fails to sign up the user.
    // If sign up is successful the user will be redirected to the sign in page again
    // where they will be able to sign in with their credentials submitted here.
    async function handleSignUp(e) {
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
        <SafeAreaView style={{flex:1, backgroundColor: "#98c46a",}}>
        <View style={styles.container}>
              
                <Text style={{fontSize: 30}}>Create Profile</Text>
                <Text>{error}</Text>
                <Text>Email:</Text>
                <TextInput style={styles.emailTextField} onChangeText={(text) => setEmail(text)} />
                <Text>Password:</Text>
                <TextInput style={styles.passwordTextField} onChangeText={(text) => setPassword(text)} />
                <Text>Confirm Password:</Text>
                <TextInput style={styles.passwordTextField} onChangeText={(text) => setConfirmedPassword(text)} />
            
                <Text></Text>
                <TouchableOpacity
                    name={"Submit"}
                    style={styles.saveButton}
                    disabled={loading}
                    onPress={handleSignUp}
                >
                    <Text style={{ color: "white" }}>Save</Text>
                </TouchableOpacity>
                <Text></Text>
                <TouchableOpacity
                    style={styles.saveButton}
                    onPress={() => {
                        props.navigation.navigate("Login");
                    }}
                >
                    <Text style={{ color: "white" }}>Back</Text>
                </TouchableOpacity>
            
        </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#98c46a",
        alignItems: "center",
        justifyContent: "center",
    },
    saveButton: {
        width: 70,
        height: 40,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#07706a",
        borderRadius: 5,
    },
    emailTextField: {
        backgroundColor: "#7a9d55",
        width: 150
    },
    passwordTextField: {
        backgroundColor: "#7a9d55",
        width: 150
    },
    buttonView: {
        flex: 4,
        flexDirection: "row"
    },
    inputView: {
        flex: .6
    }
});

export default SignUp;
