import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, FlatList, ScrollView } from "react-native";

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
            <View  style={styles.card}>
                <View style={{ width: 350, height: 100 }}>
                    <Text style={styles.cardText}>{item.transAm} </Text>
                    <Text style={{ color:"#98c46a" }}>Remaining Budget: {item.budget}</Text>
                    <Text style={styles.cardText}>
                        {""}
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
            <Card containerStyle={styles.container}>
                <Card.Title style={styles.cardText}>
                    <View style={styles.drop}>
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
        backgroundColor: "#98c46a",
        borderColor:"#98c46a",
        alignItems: "center",
        justifyContent: "center",
        paddingTop:10,
        // paddingBottom:10,
    },
    drop: {
        backgroundColor: "#98c46a",
        color:"white",
        paddingTop:180,
    },
    card: {
        backgroundColor: "#07706a",
        borderColor:"#98c46a",
    },
    cardText:{
        color: "white",
    },
    
});
export default Transactions;
