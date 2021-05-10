import React, { useState } from "react";
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Modal,
    TextInput,
} from "react-native";

import { useAuth } from "../contexts/AuthContext";
import { database } from "../firebase";

import { useDispatch } from "react-redux";
import { modalVisible } from "../store/actions/actionTypes";

export default TransactionModal = () => {
    const [transaction, setTransaction] = useState(0);
    const { currentUser } = useAuth();
    const dispatch = useDispatch();

    const submitTransaction = (e) => {
        e.preventDefault();

        database.transactions.add({
            budget: 1000,
            transAm: transaction,
            createdAt: database.getCurrentTimestamp(),
            userId: currentUser.uid,
        });
        dispatch({ type: modalVisible, visible: false }); // exits the submission view after submitting
    };

    return (
        <Modal animationType="slide" transparent={true}>
            <View style={styles.popUpContainer}>
                <View style={styles.popUp}>
                    <Text>New Transaction</Text>
                    <TextInput
                        onChangeText={(text) => {
                            setTransaction(+text);
                        }}
                    />
                    <TouchableOpacity
                        style={styles.submitButton}
                        onPress={submitTransaction}
                    >
                        <Text>Submit</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <Text>hi</Text>
            <TouchableOpacity
                onPress={() => dispatch({ type: modalVisible, visible: false })}
            >
                <Text>Close Modal</Text>
            </TouchableOpacity>
        </Modal>
    );
};

const styles = StyleSheet.create({
    popUpContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    popUp: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        height: "30%",
        width: "50%",
    },
    submitButton: {
        backgroundColor: "pink",
        borderRadius: 20,
        padding: 10,
        elevation: 10,
    },
});
