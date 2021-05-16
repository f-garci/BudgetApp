import React, { useState } from "react";
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Modal,
    TextInput,
    Keyboard,
} from "react-native";
import { useHeaderHeight } from "@react-navigation/stack";

import { useAuth } from "../contexts/AuthContext";
import { database } from "../firebase";

import { useDispatch } from "react-redux";
import { modalVisible } from "../store/actions/actionTypes";
import { KeyboardAvoidingView } from "react-native";

export default TransactionModal = () => {
    const [transaction, setTransaction] = useState(0);
    const [category, setCategory] = useState("");
    const [transactionName, setTransactionName] = useState("");

    const { currentUser } = useAuth();
    const dispatch = useDispatch();
    const headerheight = useHeaderHeight();

    const submitTransaction = (e) => {
        e.preventDefault();

        database.transactions.add({
            transactionName: transactionName,
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
                    <View
                        style={{
                            justifyContent: "center",
                            width: "100%",
                        }}
                    >
                        <View
                            style={{
                                flexDirection: "row",
                                alignItems: "center",
                                justifyContent: "flex-start",
                                width: "100%",
                                marginTop: 10,
                                marginBottom: 10,
                            }}
                        >
                            <Text style={{ marginRight: 10 }}>
                                Transaction Name:
                            </Text>
                            <Text style={{ marginRight: 5 }}> </Text>
                            <TextInput
                                onChangeText={(text) => {
                                    setTransactionName(text);
                                }}
                                style={{
                                    borderWidth: 1,
                                    width: "55%",
                                    borderRadius: 5,
                                    paddingRight: 5,
                                }}
                                onSubmitEditing={() => Keyboard.dismiss()}
                            />
                        </View>
                        <View
                            style={{
                                flexDirection: "row",
                                alignItems: "center",
                                justifyContent: "flex-start",
                                marginBottom: 10,
                            }}
                        >
                            <Text style={{ marginRight: 71 }}>Amount:</Text>
                            <Text style={{ marginRight: 6 }}>$</Text>
                            <TextInput
                                onChangeText={(text) => {
                                    setTransaction(+text);
                                }}
                                style={{
                                    borderWidth: 1,
                                    width: "55%",
                                    borderRadius: 5,
                                    paddingLeft: 5,
                                }}
                                onSubmitEditing={() => Keyboard.dismiss()}
                                keyboardType="decimal-pad"
                            />
                        </View>
                    </View>

                    <View
                        style={{
                            flexDirection: "row",
                            flexWrap: "wrap",
                            justifyContent: "space-evenly",
                            marginTop: 20,
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
                        <TouchableOpacity
                            style={
                                category === "Food"
                                    ? styles.selected
                                    : styles.unselected
                            }
                            onPress={() => setCategory("Food")}
                        >
                            <Text
                                style={
                                    category === "Food"
                                        ? styles.selectedText
                                        : styles.unselectedText
                                }
                            >
                                Food
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={
                                category === "Self-care"
                                    ? styles.selected
                                    : styles.unselected
                            }
                            onPress={() => setCategory("Self-care")}
                        >
                            <Text
                                style={
                                    category === "Self-care"
                                        ? styles.selectedText
                                        : styles.unselectedText
                                }
                            >
                                Self-care
                            </Text>
                        </TouchableOpacity>
                    </View>

                    <View
                        style={{
                            marginTop: 25,
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
                            <Text
                                style={{
                                    textAlign: "center",
                                    color: "white",
                                }}
                            >
                                Submit
                            </Text>
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
                            <Text
                                style={{
                                    textAlign: "center",
                                    color: "white",
                                }}
                            >
                                Cancel
                            </Text>
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
        backgroundColor: "#ecfade",
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
        height: "55%",
        width: "95%",
    },
    submitButton: {
        backgroundColor: "#07706a",
        borderRadius: 10,
        height: 45,
        width: 90,
        justifyContent: "center",
    },
    cancelButton: {
        backgroundColor: "#6d9aa8",
        borderRadius: 10,
        height: 45,
        width: 90,
        justifyContent: "center",
    },
    selected: {
        height: 40,
        width: 100,
        backgroundColor: "#07706a",
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
