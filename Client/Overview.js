import React, { useEffect, useState } from "react";
import {
    Text,
    View,
    TouchableOpacity,
    FlatList,
    ScrollView,
    StyleSheet,
} from "react-native";

import { useAuth } from "../contexts/AuthContext";
import { database } from "../firebase";
import { Card } from "react-native-elements";
import { useSelector } from "react-redux";
import TransactionModal from "../Components/TransactionModal";
import { PieChart } from "react-native-chart-kit";
import { ScreenWidth } from "react-native-elements/dist/helpers";
import ProgressBar from "../Components/ProgressBar";

const Overview = (props) => {
    const { currentUser } = useAuth();
    const modalVis = useSelector((state) => state.account.modalVisible);
    const categoryTotal = [
        {
            name: "Apparel & Accessories",
            total: 0,
            color: "rgba(131, 167, 234, 1)",
            legendFontColor: "#7F7F7F",
            legendFontSize: 10,
        },
        {
            name: "Health & Wellness",
            total: 0,
            color: "magenta",
            legendFontColor: "#7F7F7F",
            legendFontSize: 10,
        },
        {
            name: "Pet & Pet Supplies",
            total: 0,
            color: "red",
            legendFontColor: "#7F7F7F",
            legendFontSize: 10,
        },
        {
            name: "Self-care",
            total: 0,
            color: "pink",
            legendFontColor: "#7F7F7F",
            legendFontSize: 10,
        },
        {
            name: "Entertainment",
            total: 0,
            color: "gold",
            legendFontColor: "#7F7F7F",
            legendFontSize: 10,
        },
        {
            name: "Travel",
            total: 0,
            color: "blue",
            legendFontColor: "#7F7F7F",
            legendFontSize: 10,
        },
        {
            name: "Food",
            total: 0,
            color: "skyblue",
            legendFontColor: "#7F7F7F",
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
    //console.log(currentMonth)

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

        // console.log(categoryTotal);
        // console.log(transactions)
        

        return transactions;
    };


    // const getTransactionsTotalThisMonth = () => {
    //     let data = getTransactions().filter(
    //         (transaction) => month[new Date(transaction.createdAt.toDate()).getMonth()] === currentMonth
    //     );
        
    //     let sum = 0;
    //     for (var i = 0; i < data.length; i++){
    //         // console.log(typeof data[i].transAm + "  " + data[i].transAm)
    //         if (typeof data[i].transAm == "string"){
    //             sum += parseFloat((data[i].transAm))
    //         }
    //         else {
    //             sum += data[i].transAm
    //         }            
    //     }
    //     // let sum = data.reduce((accumulator, currentValue) => accumulator + currentValue.transAm, 0)

    //     //console.log(sum)
    //     return sum
        

    // }
    //getTransactionsTotalThisMonth()
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
                    <Card.Title> Recent Transactions </Card.Title>
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
                    <Text style={styles.budgetText}>You have spent out of a $1000 budget for this month.</Text>
                    <ProgressBar completedValue={100} color={'#63A088'} totalSpent={1000} budget={1000} />
                </Card>
            </TouchableOpacity>

            <TouchableOpacity
                onPress={() => props.navigation.navigate("Spending")}
            >
                <Card>
                    <Card.Title> Spending </Card.Title>
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
const styles = StyleSheet.create({
    budgetText: {
        fontSize: 15
    }

});

export default Overview;
