import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Modal } from "react-native";
import { FlatList, TextInput } from "react-native-gesture-handler";
import { useAuth } from "../contexts/AuthContext";
import Login from "./Login";
import { database } from "../firebase";

const Dashboard = (props) => {
    const [error, setError] = useState("");
    const [userName, setUserName] = useState("");
    const [modalVisible, setModalVisible] = useState(false);
    const [transAmount, setTransAmount] = useState(0);
    const { logout, currentUser } = useAuth();

    async function handleLogout() {
        setError("");

        try {
            await logout();
            props.navigation.navigate(Login);
        } catch {
            setError("Failed to logout");
        }
    }

    // Will submit a profile for the user to the profiles table if the user has no profile yet
    const submitProfile = (e) => {
        e.preventDefault();

        database.profiles.add({
            userId: currentUser.uid,
            name: userName,
            date: database.getCurrentTimestamp(),
        });
    };

    // Will submit the transaction the user enters to the transactions table
    const submitTransaction = (e) => {
        e.preventDefault();

        database.transactions.add({
            budget: 1000,
            transAm: transAmount,
            createdAt: database.getCurrentTimestamp(),
            userId: currentUser.uid,
        });
        setModalVisible(!modalVisible); // exits the submission view after submitting
    };

    // Tester function to check if the transactions table is being read properly
    const renderTransAmount = ({ item }) => (
        <View>
            <View style={{ width: 300, height: 150 }}>
                <Text>{item.transAm} </Text>
                <Text>Remaining Budget: {item.budget}</Text>

                {/* in order to display the date it needs to be converted to a new Date object. 
                    It is then converted to a string so it can be printed out in the Text tag. 
                    `.toString()` prints the date in the following format: {`day name` month day year hours:minutes:seconds GMT-time timezone} 
                    (e.g. Fri Apr 23 2021 12:26:11 GMT-0700 (PDT))
                    `.toLocaleDateString()` prints the date in the following format: {mm/dd/yyyy} (e.g.04/23/2021) */}
                <Text>
                    {" "}
                    Day of transaction:
                    {item.createdAt
                        ? new Date(item.createdAt.toDate()).toString()
                        : ""}
                </Text>
            </View>
        </View>
    );

    // Will get the transactions that are loaded into the table on real time
    const getTransactions = () => {
        const [transactions, setTransactions] = useState([]);

        useEffect(() => {
            const unsubscribe = database.transactions
                .where("userId", "==", currentUser.uid)
                .orderBy("createdAt", "desc")
                .onSnapshot((snapshot) => {
                    const newTransaction = snapshot.docs.map((doc) => {
                        return {
                            id: doc.id,
                            ...doc.data(),
                        };
                    });
                    setTransactions(newTransaction);
                });

            return unsubscribe;
        }, []);

        return transactions;
    };

    // Will render the transactions obtained in a flatlist. For testing purposes.
    const renderTransactions = () => {
        const data = getTransactions();

        return (
            <View>
                <FlatList
                    data={data}
                    renderItem={renderTransAmount}
                    keyExtractor={(item) => item.id}
                />
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <View
                style={{
                    width: "100%",
                    height: "50%",
                    borderWidth: 1,
                    borderColor: "black",
                }}
            >
                {renderTransactions()}
            </View>

            {/* Will create a pop up when the user hits the add a Transaction button. 
                Will close after submitting the transaction or after user hits cancel button.
                TODO: Add cancel button*/}
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(!modalVisible)}
            >
                <View
                    style={{
                        flex: 1,
                        justifyContent: "center",
                        alignItems: "center",
                        marginTop: 22,
                    }}
                >
                    <View
                        style={{
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
                        }}
                    >
                        <Text>Transaction window</Text>
                        <TextInput
                            onChangeText={(text) => setTransAmount(text)}
                        />
                        <TouchableOpacity
                            style={{
                                backgroundColor: "pink",
                                borderRadius: 20,
                                padding: 10,
                                elevation: 10,
                            }}
                            onPress={submitTransaction}
                        >
                            <Text>Submit</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
            <TouchableOpacity
                style={{
                    borderRadius: 20,
                    padding: 10,
                    elevation: 2,
                    backgroundColor: "cyan",
                }}
                onPress={() => setModalVisible(true)}
            >
                <Text>Add Transaction</Text>
            </TouchableOpacity>
            <Text>Dashboard</Text>
            <TouchableOpacity
                style={styles.logoutButton}
                onPress={handleLogout}
            >
                <Text style={{ color: "white" }}>Logout</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    logoutButton: {
        width: 70,
        height: 40,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "green",
        borderRadius: 5,
    },
});

export default Dashboard;
