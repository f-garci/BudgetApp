import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, LogBox, ScrollView, SafeAreaView } from "react-native";
import ProgressBar from "../Components/ProgressBar";
import { Divider } from "react-native-elements";

import { useAuth } from "../contexts/AuthContext";
import { database } from "../firebase";

LogBox.ignoreAllLogs();

const Budget = (props) => {
    const { currentUser } = useAuth();

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

    const [transactions, setTransactions] = useState([]);
    const [totalBudget, setTotalBudget] = useState(0);
    const [aaBudget, setAaBudget] = useState(200); //accessories and apparel
    const [hwBudget, setHwBudget] = useState(200); //health and wellness
    const [ppBudget, setPpBudget] = useState(200); //pet and pet supplies
    const [scBudget, setScBudget] = useState(200); //self care
    const [eBudget, setEBudget] = useState(200); //entertainment
    const [tBudget, setTBudget] = useState(200); //travel
    const [fBudget, setFBudget] = useState(200); //food

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
                        id: doc.id,
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
                setAaBudget(currentBudgetList[0].aa_budget);
                setHwBudget(currentBudgetList[0].hw_budget);
                setPpBudget(currentBudgetList[0].pp_budget);
                setScBudget(currentBudgetList[0].sc_budget);
                setEBudget(currentBudgetList[0].e_budget);
                setTBudget(currentBudgetList[0].t_budget);
                setFBudget(currentBudgetList[0].f_budget);
            });
        return unsubscribe;
    }, []);

    const getTransactionsTotalThisMonth = (transactionsList) => {
        let data = transactionsList.filter(
            (transaction) =>
                month[new Date(transaction.createdAt.toDate()).getMonth()] ===
                currentMonth
        );
        let sum = 0;
        for (var i = 0; i < data.length; i++) {
            if (typeof data[i].transAm == "string") {
                sum += parseFloat(data[i].transAm);
            } else {
                sum += data[i].transAm;
            }
        }
        return sum;
    };

    const getTransactionsByCategory = (transactionsList, transactionType) => {
        let data = transactionsList.filter(
            (transaction) =>
                month[new Date(transaction.createdAt.toDate()).getMonth()] ===
                    currentMonth && transaction.category == transactionType
        );

        let sum = 0;

        for (var i = 0; i < data.length; i++) {
            if (typeof data[i].transAm == "string") {
                sum += parseFloat(data[i].transAm);
            } else {
                sum += data[i].transAm;
            }
        }
        return sum;
    };

    return (
        <SafeAreaView style={{flex:1}}>
        <ScrollView style={styles.container}>
            <Text style={styles.categoryText}>Apparel & Accessories</Text>
            <View style={styles.categoryView}>
                <View style={styles.progressBarView}>
                    <ProgressBar
                        completedValue={
                            (getTransactionsByCategory(
                                transactions,
                                "Apparel & Accessories"
                            ) /
                                aaBudget) *
                            100
                        }
                        color={"#07706a"}
                        totalSpent={getTransactionsByCategory(
                            transactions,
                            "Apparel & Accessories"
                        )}
                        budget={aaBudget}
                    />
                </View>
            </View>
            <Divider style={{ height: 3 }}></Divider>

            <Text style={styles.categoryText}>Health & Wellness</Text>
            <View style={styles.categoryView}>
                <View style={styles.progressBarView}>
                    <ProgressBar
                        completedValue={
                            (getTransactionsByCategory(
                                transactions,
                                "Health & Wellness"
                            ) /
                                hwBudget) *
                            100
                        }
                        color={"#07706a"}
                        totalSpent={getTransactionsByCategory(
                            transactions,
                            "Health & Wellness"
                        )}
                        budget={hwBudget}
                    />
                </View>
            </View>
            <Divider style={{ height: 3 }}></Divider>

            <Text style={styles.categoryText}>Pet & Pet Supplies</Text>
            <View style={styles.categoryView}>
                <View style={styles.progressBarView}>
                    <ProgressBar
                        completedValue={
                            (getTransactionsByCategory(
                                transactions,
                                "Pet & Pet Supplies"
                            ) /
                                ppBudget) *
                            100
                        }
                        color={"#07706a"}
                        totalSpent={getTransactionsByCategory(
                            transactions,
                            "Pet & Pet Supplies"
                        )}
                        budget={ppBudget}
                    />
                </View>
            </View>
            <Divider style={{ height: 3 }}></Divider>

            <Text style={styles.categoryText}>Self-care</Text>

            <View style={styles.categoryView}>
                <View style={styles.progressBarView}>
                    <ProgressBar
                        completedValue={
                            (getTransactionsByCategory(
                                transactions,
                                "Self-care"
                            ) /
                                scBudget) *
                            100
                        }
                        color={"#07706a"}
                        totalSpent={getTransactionsByCategory(
                            transactions,
                            "Self-care"
                        )}
                        budget={scBudget}
                    />
                </View>
            </View>
            <Divider style={{ height: 3 }}></Divider>

            <Text style={styles.categoryText}>Entertainment</Text>

            <View style={styles.categoryView}>
                <View style={styles.progressBarView}>
                    <ProgressBar
                        completedValue={
                            (getTransactionsByCategory(
                                transactions,
                                "Entertainment"
                            ) /
                                eBudget) *
                            100
                        }
                        color={"#07706a"}
                        totalSpent={getTransactionsByCategory(
                            transactions,
                            "Entertainment"
                        )}
                        budget={eBudget}
                    />
                </View>
            </View>
            <Divider style={{ height: 3 }}></Divider>

            <Text style={styles.categoryText}>Travel</Text>
            <View style={styles.categoryView}>
                <View style={styles.progressBarView}>
                    <ProgressBar
                        completedValue={
                            (getTransactionsByCategory(transactions, "Travel") /
                                tBudget) *
                            100
                        }
                        color={"#07706a"}
                        totalSpent={getTransactionsByCategory(
                            transactions,
                            "Travel"
                        )}
                        budget={tBudget}
                    />
                </View>
            </View>
            <Divider style={{ height: 3 }}></Divider>

            <Text style={styles.categoryText}>Food</Text>

            <View style={styles.categoryView}>
                <View style={styles.progressBarView}>
                    <ProgressBar
                        completedValue={
                            (getTransactionsByCategory(transactions, "Food") /
                                fBudget) *
                            100
                        }
                        color={"#07706a"}
                        totalSpent={getTransactionsByCategory(
                            transactions,
                            "Food"
                        )}
                        budget={fBudget}
                    />
                </View>
            </View>
            <Divider style={{ height: 3 }}></Divider>

            <Text style={styles.categoryText}>Total Budget</Text>
            <View style={styles.totalBudgetView}>
                <ProgressBar
                    completedValue={
                        (getTransactionsTotalThisMonth(transactions) /
                            totalBudget) *
                        100
                    }
                    color={"#07706a"}
                    totalSpent={getTransactionsTotalThisMonth(transactions)}
                    budget={totalBudget}
                />
            </View>
        </ScrollView>
        </SafeAreaView>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:"#98c46a",
        paddingTop:20,
    },
    categoryText: {
        fontSize: 15,
        fontWeight: 'bold',
        color:"black",
        marginTop: 10,
        paddingTop: 10,
        marginLeft: 5,
    },
    categoryView: {
        flex: 1,
        flexDirection: "row",
    },
    progressBarView: {
        justifyContent: "center",
        paddingLeft: 5,
        width: "98%",
    },
    buttonView: {
        flex: 0.1,
        justifyContent: "center",
    },
    totalBudgetView: {
        width: "98%",
        paddingLeft: 5,
    },
});
export default Budget;
