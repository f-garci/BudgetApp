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

    const submitProfile = (e) => {
        e.preventDefault();

        database.profiles.add({
            userId: currentUser.uid,
            name: userName,
            date: database.getCurrentTimestamp(),
        });
    };

    const submitTransaction = (e) => {
        e.preventDefault();

        database.transactions.add({
            budget: 1000,
            transAm: transAmount,
            createdAt: database.getCurrentTimestamp(),
            userId: currentUser.uid,
        });
        setModalVisible(!modalVisible);
    };

    const renderTransAmount = ({ item }) => (
        <View>
            <View style={{ width: 300, height: 150 }}>
                <Text>{item.transAm} </Text>
                <Text>Remaining Budget: {item.budget}</Text>
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
