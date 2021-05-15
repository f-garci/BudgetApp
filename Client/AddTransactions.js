import React, { useEffect, useState } from "react";

import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
} from "react-native";

import { database } from "../firebase";
import { useAuth } from "../contexts/AuthContext";

const AddTranscations = (props) => {
    const [transAmount, setTransAmount] = useState(0);

    const [remainingBudg, setRemainingBudget] = useState(0.0);

    const { currentUser } = useAuth();

    const submitTransaction = (e) => {
        e.preventDefault();

        database.transactions.add({
            budget: 1000,
            transAm: transAmount,
            remainingBudget: 30,
            createdAt: database.getCurrentTimestamp(),
            userId: currentUser.uid,
        });
    };

    return (
        <View>
            <Text>Main Screen</Text>
            <Text>Transaction window</Text>
            <TextInput onChangeText={(text) => setTransAmount(text)} />
            <TouchableOpacity
                style={{
                    backgroundColor: "#98c46a",
                    borderRadius: 20,
                    padding: 10,
                    elevation: 10,
                }}
                onPress={submitTransaction}
            >
                <Text>Submit</Text>
            </TouchableOpacity>
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export default AddTranscations;
