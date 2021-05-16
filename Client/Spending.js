import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    StyleSheet,
    Button,
    TouchableOpacity,
    FlatList,
    SafeAreaView
} from "react-native";
import { PieChart } from "react-native-chart-kit";
import { useAuth } from "../contexts/AuthContext";
import { database } from "../firebase";
import { Icon, Divider, Card } from "react-native-elements";

const Spending = (props) => {
    const { currentUser } = useAuth();

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

    const categories = [
        "All Categories",
        "Apparel & Accessories",
        "Health & Wellness",
        "Pet & Pet Supplies",
        "Self-care",
        "Entertainment",
        "Travel",
        "Food",
    ];

    const [transactions, setTransactions] = useState([]);
    const [currentCategoryIndex, setCurrentCategoryIndex] = useState(0);

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

    const getTotalSpending = () => {
        let data = transactions.filter(
            (transaction) =>
                month[new Date(transaction.createdAt.toDate()).getMonth()] ===
                currentMonth
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
            (transaction) =>
                month[new Date(transaction.createdAt.toDate()).getMonth()] ===
                    currentMonth && transaction.category === category
        );
        let sum = 0;
        sum = data.reduce(
            (accumulator, currentValue) => accumulator + currentValue.transAm,
            0
        );
        return sum;
    };

    const renderFiltered = ({ item }) => {
        return (
            <View style={styles.container}>
                <View style={styles.transactionView}>
                    <View style={{ flex: 0.7 }}>
                        <Text style={{ fontSize: 20, marginLeft: 5, color: "#ecfade", paddingTop:10 }}>
                            {item.transactionName}
                        </Text>
                        <Text style={{ color: "white", marginLeft: 10, paddingTop:5 }}>
                            {item.category}
                        </Text>
                    </View>
                    <View style={{ flex: 0.3 }}>
                        <Text style={{ fontSize: 20, marginLeft: 25,color: "#ecfade", paddingTop:10 }}>
                            ${Number(item.transAm).toFixed(2)}
                        </Text>
                        <Text style={{ color: "white", marginLeft: 25 , paddingTop:5}}>
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

    const renderTransactions = (category) => {
        let data = transactions;
        if (category == "All Categories") {
            data = transactions.filter(
                (transaction) =>
                    month[
                        new Date(transaction.createdAt.toDate()).getMonth()
                    ] === currentMonth
            );
        } else {
            data = transactions.filter(
                (transaction) =>
                    month[
                        new Date(transaction.createdAt.toDate()).getMonth()
                    ] === currentMonth && transaction.category === category
            );
        }
        return (
            <View
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
            </View>
        );
    };

    const getCurrentCategoryTotal = (category) => {
        let data = transactions;
        if (category == "All Categories") {
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
            categoryTotal.forEach((category) => {
                transactions.forEach((transaction) => {
                    if (category.name === transaction.category) {
                        category.total =
                            (getSpendingByCategory(category.name) /
                                getTotalSpending()) *
                            100;
                    }
                });
            });
            return categoryTotal;
        } else {
            data = transactions.filter(
                (transaction) =>
                    month[
                        new Date(transaction.createdAt.toDate()).getMonth()
                    ] === currentMonth
            );
            const oneCategory = [
                {
                    name: "Other Categories",
                    total: 0,
                    color: "#dfe6e9",
                    legendFontColor: "white",
                    legendFontSize: 10,
                },
                {
                    name: "",
                    total: 0,
                    color: "#63A088",
                    legendFontColor: "white",
                    legendFontSize: 10,
                },
            ];

            oneCategory[0].total =
                getTotalSpending() - getSpendingByCategory(category);
            oneCategory[1].name = category;
            oneCategory[1].total = getSpendingByCategory(category);

            return oneCategory;
        }
    };

    const renderChart = () => {
        return (
            <PieChart
                data={getCurrentCategoryTotal(categories[currentCategoryIndex])}
                // data = {categoryTotal}
                width={300}
                height={200}
                chartConfig={chartConfig}
                accessor={"total"}
                backgroundColor={"transparent"}
                paddingLeft={20}
            />
        );
    };

    return (
        <SafeAreaView style={{flex:1}}>
        <View style={styles.container}>
            <View style={styles.topContainer}>
                <View style={styles.backButtonView}>
                    <TouchableOpacity
                        onPress={() => {
                            console.log("pressed");
                            if (
                                currentCategoryIndex <= 7 &&
                                currentCategoryIndex > 0
                            ) {
                                setCurrentCategoryIndex(
                                    currentCategoryIndex - 1
                                );
                            } else if (currentCategoryIndex == 0) {
                                setCurrentCategoryIndex(7);
                            }
                        }}
                    >
                        <Icon type="ionicon" name="chevron-back-outline" />
                    </TouchableOpacity>
                </View>
                <View style={styles.chartView}>{renderChart()}</View>
                <View style={styles.forwardButtonView}>
                    <TouchableOpacity
                        onPress={() => {
                            console.log(currentCategoryIndex);
                            if (currentCategoryIndex < 7) {
                                setCurrentCategoryIndex(
                                    currentCategoryIndex + 1
                                );
                            } else {
                                setCurrentCategoryIndex(0);
                            }
                        }}
                    >
                        <Icon type="ionicon" name="chevron-forward-outline" />
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.bottomContainer}>
                <Divider style={{ height: 3 }}></Divider>
                <View style={styles.titleView}>
                    <Text style={styles.title}>
                        {categories[currentCategoryIndex]}
                    </Text>
                </View>
                <Divider style={{ height: 3 }}></Divider>
                <View style={styles.transactionView}>
                    {renderTransactions(categories[currentCategoryIndex])}
                </View>
            </View>
        </View>
        </SafeAreaView>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        paddingTop: 10,
        backgroundColor:"#98c46a",
        borderColor:"#98c46a",
    },
    topContainer: {
        flex: 0.4,
        flexDirection: "row",
    },
    backButtonView: {
        flex: 0.1,
        justifyContent: "center",
    },
    forwardButtonView: {
        flex: 0.1,
        justifyContent: "center",
    },
    chartView: {
        flex: 0.8,
        justifyContent: "center",
    },
    bottomContainer: {
        flex: 0.6,
    },
    titleView: {
        flex: 0.15,
    },
    transactionView: {
        flex: 0.85,
    },
    title: {
        fontSize: 25,
        marginTop: 15,
        marginLeft: 5,
    },
    transactionView: {
        width: "100%",
        height: 100,
        flex: 1,
        flexDirection: "row",
        backgroundColor:"#07706a",
        borderRadius:10,
    },
});

export default Spending;
