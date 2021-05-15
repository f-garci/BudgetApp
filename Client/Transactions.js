import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, FlatList, ScrollView } from "react-native";

import { useAuth } from "../contexts/AuthContext";
import { database } from "../firebase";
import Dropdown from "../Components/Dropdown";

import { useSelector } from "react-redux";
import { Card, Divider } from "react-native-elements";

const Transactions = (props) => {
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
    const selectedMonth = useSelector((state) => state.account.month);

    const renderFiltered = ({ item }) => {
        return (
            <View>
                <View style={styles.transactionView}>
                    <View style={{ flex: 0.6 }}>
                        <Text style={{ fontSize: 20, marginLeft: 5 }}>
                            Transaction Name
                        </Text>
                        <Text style={{ color: "gray", marginLeft: 5 }}>
                            {item.category}
                        </Text>
                    </View>
                    <View style={{ flex: 0.3 }}>
                        <Text style={{ fontSize: 20, marginLeft: 25 }}>
                            ${Number(item.transAm).toFixed(2)}
                        </Text>
                        <Text style={{ color: "gray", marginLeft: 25 }}>
                            {item.createdAt
                                ? new Date(
                                      item.createdAt.toDate()
                                  ).toLocaleDateString()
                                : ""}
                        </Text>
                    </View>
                </View>
                <Divider style={{ height: 1 }}></Divider>
            </View>
        );
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
        let data;
        if (selectedMonth === "All") {
            data = getTransactions();
        } else {
            data = getTransactions().filter(
                (transaction) =>
                    months[
                        new Date(transaction.createdAt.toDate()).getMonth()
                    ] === selectedMonth
            );
        }

        return (
            <Card containerStyle={styles.container}>
                <Card.Title style={styles.cardText}>
                    <View style={styles.drop}>
                        <Text>Your Transaction History:</Text>
                        <Dropdown items={months} />
                    </View>
                </Card.Title>

                {data.length > 0 ? (
                    <FlatList
                        data={data}
                        renderItem={renderFiltered}
                        keyExtractor={(item) => item.id}
                    />
                ) : (
                    <View
                        style={{
                            width: 350,
                            alignItems: "center",
                        }}
                    >
                        <Text>No transactions done this month.</Text>
                    </View>
                )}
            </Card>
        );
    };

    return (
        <View style={{ flex: 1, backgroundColor: "#98c46a" }}>
            {renderTransactions()}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        paddingTop: 10,
    },
    transactionView: {
        width: 400,
        height: 100,
        flex: 1,
        flexDirection: "row",
    },
});
export default Transactions;
