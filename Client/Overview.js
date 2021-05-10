import React, { useEffect, useState } from "react";
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Modal,
    FlatList,
    TextInput,
    ScrollView,
} from "react-native";
import { useAuth } from "../contexts/AuthContext";
import Login from "./Login";
import { database } from "../firebase";
import { Card } from "react-native-elements";
import { useSelector, useDispatch } from "react-redux";
import { modalVisible } from "../store/actions/actionTypes";

const Overview = (props) => {
    const [error, setError] = useState("");
    const [userName, setUserName] = useState("");
    const [transAmount, setTransAmount] = useState(0);
    const { logout, currentUser } = useAuth();
    const modalVis = useSelector((state) => state.account.modalVisible);
    const dispatch = useDispatch();

    async function handleLogout() {
        setError("");

        try {
            await logout();
            props.navigation.navigate(Login);
        } catch {
            setError("Failed to logout");
        }
    }
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

    const submitTransaction = (e) => {
        e.preventDefault();

        database.transactions.add({
            budget: 1000,
            transAm: transAmount,
            createdAt: database.getCurrentTimestamp(),
            userId: currentUser.uid,
        });
        setModalVisible(!modalVisible); // exits the submission view after submitting
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
            {modalVis && (
                <Modal animationType="slide" transparent={true}>
                    <View style={styles.popUpContainer}>
                        <View style={styles.popUp}>
                            <Text>New Transaction</Text>
                            <TextInput onChangeText={(text) => {}} />
                            <TouchableOpacity style={styles.submitButton}>
                                <Text>Submit</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <Text>hi</Text>
                    <TouchableOpacity
                        onPress={() =>
                            dispatch({ type: modalVisible, visible: false })
                        }
                    >
                        <Text>Close Modal</Text>
                    </TouchableOpacity>
                </Modal>
            )}
        </ScrollView>
    );
};
const styles = StyleSheet.create({
    popUpContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    popUp: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        height: "30%",
        width: "50%",
    },
    submitButton: {
        backgroundColor: "pink",
        borderRadius: 20,
        padding: 10,
        elevation: 10,
    },
});

export default Overview;
