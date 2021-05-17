import React, { useEffect, useState } from "react";
import {
    Text,
    View,
    TouchableOpacity,
    FlatList,
    ScrollView,
    StyleSheet,
    LogBox,
    SafeAreaView
} from "react-native";

import { useAuth } from "../contexts/AuthContext";
import { database } from "../firebase";
import { Card, withTheme } from "react-native-elements";
import { useSelector, useDispatch } from "react-redux";
import TransactionModal from "../Components/TransactionModal";
import { PieChart } from "react-native-chart-kit";
import { ScreenWidth } from "react-native-elements/dist/helpers";
import ProgressBar from "../Components/ProgressBar";
import { modalVisible } from "../store/actions/actionTypes";

const Overview = (props) => {
    const { currentUser } = useAuth();
    const modalVis = useSelector((state) => state.account.modalVisible);
    const dispatch = useDispatch();

    LogBox.ignoreAllLogs();

    const categoryTotal = [
        {
            name: "Apparel & Accessories",
            total: 0,
            color: "#f368e0",
            legendFontColor: "white",
            legendFontSize: 10,
        },
        {
            name: "Health & Wellness",
            total: 0,
            color: "#ff9f43",
            legendFontColor: "white",
            legendFontSize: 10,
        },
        {
            name: "Pet & Pet Supplies",
            total: 0,
            color: "#ee5253",
            legendFontColor: "white",
            legendFontSize: 10,
        },
        {
            name: "Self-care",
            total: 0,
            color: "#0abde3",
            legendFontColor: "white",
            legendFontSize: 10,
        },
        {
            name: "Entertainment",
            total: 0,
            color: "#10ac84",
            legendFontColor: "white",
            legendFontSize: 10,
        },
        {
            name: "Travel",
            total: 0,
            color: "#00d2d3",
            legendFontColor: "white",
            legendFontSize: 10,
        },
        {
            name: "Food",
            total: 0,
            color: "#54a0ff",
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

    const d = new Date();
    const month = new Array();
    month[0] = "January";
    month[1] = "February";
    month[2] = "March";
    month[3] = "April";
    month[4] = "May";
    month[5] = "June";
    month[6] = "July";
    month[7] = "August";
    month[8] = "September";
    month[9] = "October";
    month[10] = "November";
    month[11] = "December";
    const currentMonth = month[d.getMonth()];

    const [totalBudget, setTotalBudget] = useState(0);
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

    useEffect(() => {
        const unsubscribe = database.budget
            .where("userId", "==", currentUser.uid)
            .onSnapshot((snapshot) => {
                const currentBudgetList = snapshot.docs.map((doc) => {
                    return {
                        ...doc.data(),
                    };
                });

                setTotalBudget(
                    currentBudgetList[0].aa_budget +
                        currentBudgetList[0].hw_budget +
                        currentBudgetList[0].pp_budget +
                        currentBudgetList[0].sc_budget +
                        currentBudgetList[0].e_budget +
                        currentBudgetList[0].t_budget +
                        currentBudgetList[0].f_budget
                );
            });
        return unsubscribe;
    }, []);

    const renderTransactions = () => {
        const data = transactions.slice(0, 3);
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
            <View style={styles.transactionView}>
                <View style={{ flex: 0.7 }}>
                    <Text style={{ fontSize: 20, color: "#ecfade" }}>{item.transactionName}</Text>
                    <Text style={{ color: "white" }}>{item.category}</Text>
                </View>
                <View style={{ flex: 0.3 }}>
                    <Text style={{ fontSize: 20, color: "#ecfade" }}>
                        ${item.transAm.toFixed(2)}
                    </Text>
                    {/* <Text>Remaining Budget: {item.budget}</Text> */}
                    {/* in order to display the date it needs to be converted to a new Date object. 
                        It is then converted to a string so it can be printed out in the Text tag. 
                        `.toString()` prints the date in the following format: {`day name` month day year hours:minutes:seconds GMT-time timezone} 
                        (e.g. Fri Apr 23 2021 12:26:11 GMT-0700 (PDT))
                        `.toLocaleDateString()` prints the date in the following format: {mm/dd/yyyy} (e.g.04/23/2021) */}
                    <Text style={{ color: "white" }}>
                        {item.createdAt
                            ? new Date(
                                  item.createdAt.toDate()
                              ).toLocaleDateString()
                            : ""}
                    </Text>
                </View>
            </View>
        </View>
    );

    const getMonthlyTotal = () => {
        let data = transactions.filter(
            (transaction) => month[new Date(transaction.createdAt.toDate()).getMonth()] === currentMonth
        );
        let sum = 0;
        sum = data.reduce(
            (accumulator, currentValue) => accumulator + currentValue.transAm,
            0
        );
        return sum;
    };

    const getSpendingByCategory = (category) => {
        let data = transactions.filter(
            (transaction) => month[new Date(transaction.createdAt.toDate()).getMonth()] === currentMonth && transaction.category === category
        );
        // let data = transactions.filter(
        //     (transaction) => transaction.category === category
        // );
        let sum = 0;
        sum = data.reduce(
            (accumulator, currentValue) => accumulator + currentValue.transAm,
            0
        );
        return sum;
    };
    categoryTotal.forEach((category) => {
        transactions.forEach((transaction) => {
            if (category.name === transaction.category) {
                category.total =
                    (getSpendingByCategory(category.name) / getMonthlyTotal()) *
                    100;
            }
        });
    });

    return (
        <SafeAreaView style={{flex: 1, backgroundColor: "#98c46a",}}>
        <ScrollView style={styles.scrollContainer}>
            {modalVis && <TransactionModal />}
            <TouchableOpacity
                style={styles.container}
                onPress={() => props.navigation.navigate("Transactions")}
            >
                <Card containerStyle={styles.card}>
                    <Card.Title style={styles.cardText}> Recent Transactions </Card.Title>
                    <Card.Divider />
                    {renderTransactions()}
                    <Card.Divider />
                    <View style={{ alignItems: "center" }}>
                        <TouchableOpacity
                            style={{
                                borderWidth: 1,
                                padding: 10,
                                borderRadius: 5,
                                borderColor: "#ecfade",
                            }}
                            onPress={() =>
                                dispatch({
                                    type: modalVisible,
                                    visible: true,
                                })
                            }
                        >
                            <Text style={styles.budgetText}>Add a Transaction</Text>
                        </TouchableOpacity>
                    </View>
                </Card>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.container}
                onPress={() => props.navigation.navigate("Budget")}
            >
                <Card containerStyle={styles.card}>
                    <Card.Title style={styles.cardText}> Budget </Card.Title>
                    <Card.Divider />
                    <Text style={styles.budgetText}>
                        You have spent ${Number(getMonthlyTotal()).toFixed(2)}{" "}
                        out of a ${totalBudget.toFixed(2)} budget for this
                        month.
                    </Text>
                    <ProgressBar
                        completedValue={getMonthlyTotal() / totalBudget * 100}
                        color={"#63A088"}
                        totalSpent={Number(getMonthlyTotal()).toFixed(2)}
                        budget={totalBudget.toFixed(2)}
                    />
                    {/* {renderProgressBar()} */}
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
        </SafeAreaView>
    );
};
const styles = StyleSheet.create({
    scrollContainer: {
        flex: 1,
        backgroundColor: "#98c46a",
    },
    container: {
        paddingTop: 18,
    },
    card: {
        backgroundColor: "#07706a",
        borderColor: "#07706a",
        borderRadius: 10,
    },
    cardText: {
        color: "#ecfade",
        fontSize: 18,
    },
    budgetText: {
        fontSize: 15,
        color: "#ecfade",
    },
    transactionView: {
        width: "100%",
        height: 100,
        flex: 1,
        flexDirection: "row",
    },
});

export default Overview;
