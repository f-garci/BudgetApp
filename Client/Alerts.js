import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    FlatList,
} from "react-native";

import { useAuth } from "../contexts/AuthContext";
import { database } from "../firebase";

const Alerts = (props) => {
    const { currentUser } = useAuth();
    const [transactions, setTransactions] = useState([]);
    const [budget, setBudget] = useState(1000.0);
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

    // var amount = 1000.0;

    const obtainTransactions = () => {
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

        return (
            <View>
                <FlatList
                    data={transactions}
                    renderItem={({ item }) => {
                        // var amount = item.budget;
                        // var update = amount - item.transAm;
                        if (!item.category) {
                            var amount = item.budget;
                            var update = amount - item.transAm;
                            return (
                                <View style={styles.alertContainer}>
                                    <Text style={styles.alertText}>
                                        You paid {item.transAm} on{" "}
                                        {
                                            months[
                                                new Date(
                                                    item.createdAt.toDate()
                                                ).getMonth()
                                            ]
                                        }{" "}
                                        {new Date(
                                            item.createdAt.toDate()
                                        ).getDate()}
                                        .
                                    </Text>
                                    <Text style={styles.alertText}>
                                        Your remaining balance is{" "}
                                        {item.remainingBudget}
                                    </Text>
                                </View>
                            );
                        } else {
                            var amount = item.budget;
                            var update = amount - item.transAm;
                            return (
                                <View style={styles.alertContainer}>
                                    <Text style={styles.alertText}>
                                        You paid {item.transAm} for{" "}
                                        {item.category} on{" "}
                                        {
                                            months[
                                                new Date(
                                                    item.createdAt.toDate()
                                                ).getMonth()
                                            ]
                                        }{" "}
                                        {new Date(
                                            item.createdAt.toDate()
                                        ).getDate()}
                                        .
                                    </Text>
                                    <Text style={styles.alertText}>
                                        Your remaining balance is:{" "}
                                        {item.remainingBudget}
                                    </Text>
                                </View>
                            );
                        }
                    }}
                />
            </View>
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <View>
                {obtainTransactions()}
            </View>
        </SafeAreaView>
    );
};
const styles = StyleSheet.create({
    container:{
        backgroundColor: "#98c46a",
        alignItems: 'center',
        justifyContent: 'center',
    },
    alertContainer:{
        backgroundColor: '#07706a',
        width: 300,
        height: 150,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal:10,
        borderRadius: 30,
        margin: 10,
    },
    alertText:{
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        color: 'white',
    }
});

export default Alerts;
