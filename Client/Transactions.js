import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";

import { useAuth } from "../contexts/AuthContext";
import { database } from "../firebase";
import Dropdown from "../Components/Dropdown";

import { useSelector } from "react-redux";
import { Card } from "react-native-elements";

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
                <View style={{ width: 400, height: 150 }}>
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
            <Card>
                <Card.Title style={{}}>
                    <View>
                        <Text>Your Transaction History:</Text>
                        <Dropdown items={months} />
                    </View>
                </Card.Title>
                <Card.Divider
                    style={{
                        height: "100%",
                        backgroundColor: "white",
                        width: "100%",
                    }}
                >
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
                </Card.Divider>
            </Card>
        );
    };

    return (
        <View style={styles.container}>
            <View style={{ flex: 1 }}>{renderTransactions()}</View>
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
