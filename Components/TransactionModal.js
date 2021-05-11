import React, { useState } from "react";
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Modal,
    TextInput,
} from "react-native";
import { useHeaderHeight } from "@react-navigation/stack";

import { useAuth } from "../contexts/AuthContext";
import { database } from "../firebase";

import { useDispatch } from "react-redux";
import { modalVisible } from "../store/actions/actionTypes";

export default TransactionModal = () => {
    const [transaction, setTransaction] = useState(0);
    const [category, setCategory] = useState("");

    const { currentUser } = useAuth();
    const dispatch = useDispatch();
    const headerheight = useHeaderHeight();

    const submitTransaction = (e) => {
        e.preventDefault();

        database.transactions.add({
            budget: 1000,
            category: category,
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
                        style={{ borderWidth: 1, width: 60 }}
                        onSubmitEditing={submitTransaction}
                    />

                    <View
                        style={{
                            flexDirection: "row",
                            flexWrap: "wrap",
                            justifyContent: "space-evenly",
                        }}
                    >
                        <TouchableOpacity
                            style={
                                category === "Apparel & Accessories"
                                    ? styles.selected
                                    : styles.unselected
                            }
                            onPress={() => setCategory("Apparel & Accessories")}
                        >
                            <Text
                                style={
                                    category === "Apparel & Accessories"
                                        ? styles.selectedText
                                        : styles.unselectedText
                                }
                            >
                                Apparel & Accessories
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={
                                category === "Health & Wellness"
                                    ? styles.selected
                                    : styles.unselected
                            }
                            onPress={() => setCategory("Health & Wellness")}
                        >
                            <Text
                                style={
                                    category === "Health & Wellness"
                                        ? styles.selectedText
                                        : styles.unselectedText
                                }
                            >
                                Health & Wellness
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={
                                category === "Pet & Pet Supplies"
                                    ? styles.selected
                                    : styles.unselected
                            }
                            onPress={() => setCategory("Pet & Pet Supplies")}
                        >
                            <Text
                                style={
                                    category === "Pet & Pet Supplies"
                                        ? styles.selectedText
                                        : styles.unselectedText
                                }
                            >
                                Pet & Pet Supplies
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={
                                category === "Entertainment"
                                    ? styles.selected
                                    : styles.unselected
                            }
                            onPress={() => setCategory("Entertainment")}
                        >
                            <Text
                                style={
                                    category === "Entertainment"
                                        ? styles.selectedText
                                        : styles.unselectedText
                                }
                            >
                                Entertainment
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={
                                category === "Travel"
                                    ? styles.selected
                                    : styles.unselected
                            }
                            onPress={() => setCategory("Travel")}
                        >
                            <Text
                                style={
                                    category === "Travel"
                                        ? styles.selectedText
                                        : styles.unselectedText
                                }
                            >
                                Travel
                            </Text>
                        </TouchableOpacity>
                    </View>

                    <View
                        style={{
                            marginTop: 10,
                            flexDirection: "row",
                            justifyContent: "space-evenly",
                            width: 200,
                        }}
                    >
                        <TouchableOpacity
                            style={styles.submitButton}
                            onPress={
                                category !== ""
                                    ? submitTransaction
                                    : console.log("error")
                            }
                        >
                            <Text>Submit</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.cancelButton}
                            onPress={() =>
                                dispatch({
                                    type: modalVisible,
                                    visible: false,
                                })
                            }
                        >
                            <Text>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
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
        height: "40%",
        width: "80%",
    },
    submitButton: {
        backgroundColor: "pink",
        borderRadius: 10,
        padding: 10,
        elevation: 10,
    },
    cancelButton: {
        backgroundColor: "gray",
        borderRadius: 10,
        padding: 10,
        elevation: 10,
    },
    selected: {
        height: 40,
        width: 100,
        backgroundColor: "green",
        borderRadius: 5,
        margin: 5,
        justifyContent: "center",
    },
    unselected: {
        height: 40,
        width: 100,
        backgroundColor: "white",
        borderColor: "gray",
        borderWidth: 1,
        borderRadius: 5,
        margin: 5,
        justifyContent: "center",
    },
    selectedText: {
        color: "white",
        textAlign: "center",
    },
    unselectedText: {
        color: "black",
        textAlign: "center",
    },
});
