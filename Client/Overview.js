import React, { useEffect, useState } from "react";
import {
    Text,
    View,
    TouchableOpacity,
    FlatList,
    ScrollView,
    StyleSheet,
    containerStyle,
} from "react-native";

import { useAuth } from "../contexts/AuthContext";
import { database } from "../firebase";
import { Card, withTheme } from "react-native-elements";
import { useSelector } from "react-redux";
import TransactionModal from "../Components/TransactionModal";
import { PieChart } from "react-native-chart-kit";
import { ScreenWidth } from "react-native-elements/dist/helpers";

const Overview = (props) => {
    const { currentUser } = useAuth();
    const modalVis = useSelector((state) => state.account.modalVisible);
    const categoryTotal = [
        {
            name: "Apparel & Accessories",
            total: 0,
            color: "rgba(131, 167, 234, 1)",
            legendFontColor: "white",
            legendFontSize: 10,
        },
        {
            name: "Health & Wellness",
            total: 0,
            color: "magenta",
            legendFontColor: "white",
            legendFontSize: 10,
        },
        {
            name: "Pet & Pet Supplies",
            total: 0,
            color: "red",
            legendFontColor: "white",
            legendFontSize: 10,
        },
        {
            name: "Self-care",
            total: 0,
            color: "pink",
            legendFontColor: "white",
            legendFontSize: 10,
        },
        {
            name: "Entertainment",
            total: 0,
            color: "gold",
            legendFontColor: "white",
            legendFontSize: 10,
        },
        {
            name: "Travel",
            total: 0,
            color: "blue",
            legendFontColor: "white",
            legendFontSize: 10,
        },
        {
            name: "Food",
            total: 0,
            color: "skyblue",
            legendFontColor: "white",
            legendFontSize: 10,
        },
    ];

    const chartConfig = {
        backgroundGradientFrom: "#1E2923",
        backgroundGradientFromOpacity: 0,
        backgroundGradientTo: "#08130D",
        backgroundGradientToOpacity: 0.5,
        color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
        strokeWidth: 2, // optional, default 3
        barPercentage: 0.5,
        useShadowColorFromDataset: false, // optional
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

        categoryTotal.forEach((category) => {
            transactions.forEach((transaction) => {
                if (category.name === transaction.category) {
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
            <View >
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
                <Text style={{ color: "#98c46a" }}>{item.transAm} </Text>
                <Text style={{ color: "#98c46a" }}>Remaining Budget: {item.budget}</Text>
                {/* in order to display the date it needs to be converted to a new Date object. 
                    It is then converted to a string so it can be printed out in the Text tag. 
                    `.toString()` prints the date in the following format: {`day name` month day year hours:minutes:seconds GMT-time timezone} 
                    (e.g. Fri Apr 23 2021 12:26:11 GMT-0700 (PDT))
                    `.toLocaleDateString()` prints the date in the following format: {mm/dd/yyyy} (e.g.04/23/2021) */}
                <Text style={styles.cardText}>
                    Day of transaction:
                    {item.createdAt
                        ? new Date(item.createdAt.toDate()).toString()
                        : ""}
                </Text>
            </View>
        </View>
    );

    return (
        <ScrollView style={styles.container}>
            <TouchableOpacity
                style={styles.container}
                onPress={() => props.navigation.navigate("Transactions")}
            >
                <Card containerStyle={styles.card}>
                    <Card.Title style={styles.cardText}> Transactions </Card.Title>
                    <Card.Divider />
                    {renderTransactions()}
                </Card>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.container}
                onPress={() => props.navigation.navigate("Budget")}
            >
                <Card containerStyle={styles.card}>
                    <Card.Title style={styles.cardText}> Budget </Card.Title>
                    <Card.Divider />
                    <Text style={styles.cardText}>Test</Text>
                    <Text style={styles.cardText}>Test</Text>
                    <Text style={styles.cardText}>Test</Text>
                </Card>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.container}
                onPress={() => props.navigation.navigate("Spending")}
            >
                <Card containerStyle={styles.card}>
                    <Card.Title style={styles.cardText}> Spending </Card.Title>
                    <Card.Divider />
                    <PieChart
                        data={categoryTotal}
                        width={350}
                        height={220}
                        chartConfig={chartConfig}
                        accessor={"total"}
                        backgroundColor={"transparent"}
                    />
                </Card>
            </TouchableOpacity>
            {modalVis && <TransactionModal />}
        </ScrollView>
    );
};

export default Overview;

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#98c46a",
        paddingTop: 18,
    },
    card: {
        backgroundColor: "#07706a",
        borderColor:"#07706a",
        borderRadius:10,
    },
    cardText:{
        color: "white",
    },
    
});