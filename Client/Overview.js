import React, { useEffect, useState } from "react";
import {
    Text,
    View,
    TouchableOpacity,
    FlatList,
    ScrollView,
} from "react-native";

import { useAuth } from "../contexts/AuthContext";
import { database } from "../firebase";
import { Card } from "react-native-elements";
import { useSelector } from "react-redux";
import TransactionModal from "../Components/TransactionModal";

const Overview = (props) => {
    const { currentUser } = useAuth();
    const modalVis = useSelector((state) => state.account.modalVisible);
    const categoryTotal = [
        {
            category: "Apparel & Accessories",
            total: 0,
        },
        {
            category: "Health & Wellness",
            total: 0,
        },
        {
            category: "Pet & Pet Supplies",
            total: 0,
        },
        {
            category: "Self-care",
            total: 0,
        },
        {
            category: "Entertainment",
            total: 0,
        },
        {
            category: "Travel",
            total: 0,
        },
        {
            category: "Food",
            total: 0,
        },
    ];

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

        categoryTotal.forEach((category) => {
            transactions.forEach((transaction) => {
                if (category.category === transaction.category) {
                    category.total = category.total + 1;
                }
            });
        });

        console.log(categoryTotal);

        return transactions;
    };

    const renderTransactions = () => {
        const data = getTransactions().slice(0, 3);

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
                    Day of transaction:
                    {item.createdAt
                        ? new Date(item.createdAt.toDate()).toString()
                        : ""}
                </Text>
            </View>
        </View>
    );

    return (
        <ScrollView>
            <TouchableOpacity
                onPress={() => props.navigation.navigate("Transactions")}
            >
                <Card>
                    <Card.Title> Transactions </Card.Title>
                    <Card.Divider />
                    {renderTransactions()}
                </Card>
            </TouchableOpacity>

            <TouchableOpacity
                onPress={() => props.navigation.navigate("Budget")}
            >
                <Card>
                    <Card.Title> Budget </Card.Title>
                    <Card.Divider />
                    <Text>Test</Text>
                    <Text>Test</Text>
                    <Text>Test</Text>
                </Card>
            </TouchableOpacity>

            <TouchableOpacity
                onPress={() => props.navigation.navigate("Spending")}
            >
                <Card>
                    <Card.Title> Spending </Card.Title>
                    <Card.Divider />
                    <Text>Test</Text>
                    <Text>Test</Text>
                    <Text>Test</Text>
                </Card>
            </TouchableOpacity>
            {modalVis && <TransactionModal />}
        </ScrollView>
    );
};

export default Overview;
