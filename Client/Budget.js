import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Button, ScrollView } from 'react-native';
import ProgressBar from "../Components/ProgressBar";
import { Divider } from 'react-native-elements';
import { Icon } from "react-native-elements";
import { TouchableOpacity } from 'react-native';

import { useAuth } from "../contexts/AuthContext";
import { database } from "../firebase";

const Budget = props => {
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
    const [budgetList, setBudgetList] = useState([]);

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
        const unsubscribe = database.budget.where("userId", "==", currentUser.uid).onSnapshot((snapshot) => {
            const currentBudgetList = snapshot.docs.map((doc) => {
                return {
                    ...doc.data()
                }
            })
          
            setBudgetList(currentBudgetList)
        })
        return unsubscribe
    }, []);

    const getTransactionsTotalThisMonth = (transactionsList) => {
        let data = transactionsList.filter(
            (transaction) => month[new Date(transaction.createdAt.toDate()).getMonth()] === currentMonth
        );
        let sum = 0;
        for (var i = 0; i < data.length; i++){
            if (typeof data[i].transAm == "string"){
                sum += parseFloat((data[i].transAm))
            }
            else {
                sum += data[i].transAm
            }            
        }
        return sum  
    }

    const getTransactionsByCategory = (transactionsList, transactionType) => {
        let data = transactionsList.filter(
            (transaction) => month[new Date(transaction.createdAt.toDate()).getMonth()] === currentMonth
         && transaction.category == transactionType);

        let sum = 0;

        for (var i = 0; i <data.length; i++) {
            if (typeof data[i].transAm == "string"){
                sum += parseFloat((data[i].transAm))
            }
            else {
                sum += data[i].transAm
            }   

        }
        return sum

    }

    const getBudget = (category) => {
        let budgetAmount = 0
        for (var i = 0; i < budgetList.length; i++){
            if (budgetList[i].category == category){
                budgetAmount = budgetList[i].budget
            }
        }
        return budgetAmount
    }


    const changeBudgetAmount = (budgetAmount, category) => {
        database.budget.where("category", "==", category).set({
            budget: budgetAmount,
        })
    }


    return (
        <ScrollView>

            <Text style={styles.categoryText}>Apparel & Accessories</Text>
            <View style={styles.categoryView}>
                <View style={styles.progressBarView}>
                    <ProgressBar completedValue={getTransactionsByCategory(transactions, 'Apparel & Accessories') / getBudget('Apparel & Accessories') * 100} color={'#0fbcf9'} 
                    totalSpent={getTransactionsByCategory(transactions, 'Apparel & Accessories')} budget={getBudget('Apparel & Accessories')} />
                </View>
                {/* <View style={styles.buttonView}>
                    <TouchableOpacity>
                        <Icon type="material-icons" name="create" />
                    </TouchableOpacity>
                </View> */}
            </View>
            <Divider style={{ height: 3 }}></Divider>

            <Text style={styles.categoryText}>Health & Wellness</Text>
            <View style={styles.categoryView}>
                <View style={styles.progressBarView}>
                    <ProgressBar completedValue={getTransactionsByCategory(transactions, 'Health & Wellness')/getBudget('Health & Wellness') * 100} color={'#575fcf'} 
                    totalSpent={getTransactionsByCategory(transactions, 'Health & Wellness')} budget={getBudget('Health & Wellness')} />
                </View>
                {/* <View style={styles.buttonView}>
                    <TouchableOpacity>
                        <Icon type="material-icons" name="create" />
                    </TouchableOpacity>
                </View> */}
            </View>
            <Divider style={{ height: 3 }}></Divider>

            <Text style={styles.categoryText}>Pet & Pet Supplies</Text>
            <View style={styles.categoryView}>
                <View style={styles.progressBarView}>
                    <ProgressBar completedValue={getTransactionsByCategory(transactions, 'Pet & Pet Supplies')/getBudget('Pet & Pet Supplies') * 100} color={'#ffc048'} 
                    totalSpent={getTransactionsByCategory(transactions, 'Pet & Pet Supplies')} budget={getBudget('Pet & Pet Supplies')} />
                </View>
                {/* <View style={styles.buttonView}>
                    <TouchableOpacity>
                        <Icon type="material-icons" name="create" />
                    </TouchableOpacity>
                </View> */}
            </View>
            <Divider style={{ height: 3 }}></Divider>

            <Text style={styles.categoryText}>Entertainment</Text>

            <View style={styles.categoryView}>
                <View style={styles.progressBarView}>
                    <ProgressBar completedValue={getTransactionsByCategory(transactions, 'Entertainment')/getBudget('Entertainment') * 100} color={'#ffcccc'} 
                    totalSpent={getTransactionsByCategory(transactions, 'Entertainment')} budget={getBudget('Entertainment')} />
                </View>
                {/* <View style={styles.buttonView}>
                    <TouchableOpacity>
                        <Icon type="material-icons" name="create" />
                    </TouchableOpacity>
                </View> */}
            </View>
            <Divider style={{ height: 3 }}></Divider>

            <Text style={styles.categoryText}>Travel</Text>
            <View style={styles.categoryView}>
                <View style={styles.progressBarView}>
                    <ProgressBar completedValue={getTransactionsByCategory(transactions, 'Travel')/getBudget('Travel') * 100} color={'#ffdd59'} 
                    totalSpent={getTransactionsByCategory(transactions, 'Travel')} budget={getBudget('Travel')} />
                </View>
                {/* <View style={styles.buttonView}>
                    <TouchableOpacity>
                        <Icon type="material-icons" name="create" />
                    </TouchableOpacity>
                </View> */}
            </View>
            <Divider style={{ height: 3 }}></Divider>

            <Text style={styles.categoryText}>Total Budget</Text>
            <View style={styles.totalBudgetView}>
                <ProgressBar completedValue={getTransactionsTotalThisMonth(transactions)/1600 * 100} color={'#63A088'} 
                totalSpent={getTransactionsTotalThisMonth(transactions)} budget={1600} />
            </View>
            <Divider style={{ height: 3 }}></Divider>

        </ScrollView>
    )

}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    categoryText: {
        fontSize: 14,
        marginTop: 10,
        marginLeft: 5
    },
    categoryView: {
        flex: 1,
        flexDirection: 'row'
    },
    progressBarView: {
        justifyContent: 'center',
        paddingLeft: 5,
        width: '98%',

    },
    buttonView: {
        flex: .10,
        justifyContent: 'center'
    },
    totalBudgetView: {
        width: '98%',
        paddingLeft: 5
    }

});

export default Budget;