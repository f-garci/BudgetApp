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
import { FlatList } from "react-native-gesture-handler";

// import { Dropdown } from "react-native-material-dropdown";

import { useAuth } from "../contexts/AuthContext";
import { database } from "../firebase";

const Transactions = (props) => {
    const [transactionMonth, setTransactionMonth] = useState("All");
    const { currentUser } = useAuth();
    const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];

    const renderFiltered = ({ item }) => {
        const month = months[new Date(item.createdAt.toDate()).getMonth()];

        // hard coded value for testing purposes. REMOVE LATER!!
        if (month === "April") {
            return (
                <View>
                    <View style={{ width: "100%", height: 150 }}>
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
        }
    };

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

        const transactionMonths = [];

        data.forEach((transaction) => {
            const month = new Date(transaction.createdAt.toDate()).getMonth();

            if (!transactionMonths.includes(months[month])) {
                transactionMonths.push(months[month]);
            }
        });

        return (
            <View>
                <FlatList
                    data={data}
                    renderItem={renderFiltered}
                    keyExtractor={(item) => item.id}
                />
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <Text>Your Transaction History:</Text>
            {renderTransactions()}
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
});

export default Transactions;
