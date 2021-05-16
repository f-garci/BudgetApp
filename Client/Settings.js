import React, { useEffect, useState } from "react";
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    TextInput,
} from "react-native";
import { Card } from "react-native-elements";

import { useAuth } from "../contexts/AuthContext";
import { signedIn } from "../store/actions/actionTypes";

import { useDispatch } from "react-redux";
import { database } from "../firebase";

const Settings = (props) => {
    const [error, setError] = useState("");
    const { logout, currentUser } = useAuth();
    const dispatch = useDispatch();
    const [newProfile, setNewProfile] = useState();
    const [newBudgets, setNewBudgets] = useState();
    const [profile, setProfile] = useState({ name: "" });
    const [budgets, setBudgets] = useState({
        aa_budget: 0,
        e_budget: 0,
        f_budget: 0,
        hw_budget: 0,
        pp_budget: 0,
        sc_budget: 0,
        t_budget: 0,
    });

    useEffect(() => {
        const unsubscribe = database.profiles
            .where("userId", "==", currentUser.uid)
            .onSnapshot((snapshot) => {
                const newProfile = snapshot.docs.map((doc) => {
                    return {
                        id: doc.id,
                        ...doc.data(),
                    };
                });
                setProfile({ name: newProfile[0].name });
                setNewProfile({ ...profile });
            });
        return unsubscribe;
    }, []);

    console.log(profile);

    useEffect(() => {
        const unsubscribe = database.budget
            .where("userId", "==", currentUser.uid)
            .onSnapshot((snapshot) => {
                const newBudget = snapshot.docs.map((doc) => {
                    return {
                        id: doc.id,
                        ...doc.data(),
                    };
                });
                setBudgets({
                    aa_budget: newBudget[0].aa_budget,
                    e_budget: newBudget[0].e_budget,
                    f_budget: newBudget[0].f_budget,
                    hw_budget: newBudget[0].hw_budget,
                    pp_budget: newBudget[0].pp_budget,
                    sc_budget: newBudget[0].sc_budget,
                    t_budget: newBudget[0].t_budget,
                });

                setNewBudgets({ ...budgets });
            });

        return unsubscribe;
    }, []);

    async function handleLogout() {
        setError("");

        try {
            await logout();
            dispatch({ type: signedIn, isSignedIn: false });
        } catch {
            setError("Failed to logout");
        }
    }

    console.log(newBudgets);
    console.log(budgets);
    return (
        <View style={styles.container}>
            <View style={styles.greetingContainer}>
                <Text style={styles.greeting}>
                    Welcome, {profile.name ? profile.name : ""}!
                </Text>
            </View>
            <Card>
                <Card.Title>Profile</Card.Title>
                <Card.Divider />
                <View style={styles.settingsContainer}>
                    <Text style={styles.settingsTabLabel}>Name:</Text>
                    <TextInput
                        placeholder={profile.name ? profile.name : ""}
                        style={styles.settingsTabInput}
                        placeholderTextColor={"black"}
                        onChangeText={(text) => {
                            if (text.length === 0) {
                                setNewProfile({ ...profile });
                            } else {
                                setNewProfile({ ...newProfile, name: text });
                            }
                        }}
                    />
                </View>
            </Card>
            <Card>
                <Card.Title>Budgets</Card.Title>
                <Card.Divider />
                <View>
                    <View
                        style={{
                            flexDirection: "row",
                            alignItems: "center",
                            margin: 5,
                        }}
                    >
                        <Text style={{ marginLeft: 10, marginRight: 20 }}>
                            Apparel & Accessories:
                        </Text>
                        <TextInput
                            style={styles.settingsTabInput}
                            placeholder={String(budgets.aa_budget)}
                            placeholderTextColor={"black"}
                            onChangeText={(text) => {
                                if (text.length === 0) {
                                    setNewBudgets({ ...budgets });
                                } else {
                                    setNewBudgets({
                                        ...newBudgets,
                                        aa_budget: +text,
                                    });
                                }
                            }}
                        />
                    </View>
                    <View
                        style={{
                            flexDirection: "row",
                            alignItems: "center",
                            margin: 5,
                        }}
                    >
                        <Text style={{ marginLeft: 10, marginRight: 67 }}>
                            Entertainment:
                        </Text>
                        <TextInput
                            style={styles.settingsTabInput}
                            placeholder={String(budgets.e_budget)}
                            placeholderTextColor={"black"}
                            onChangeText={(text) => {
                                if (text.length === 0) {
                                    setNewBudgets({ ...budgets });
                                } else {
                                    setNewBudgets({
                                        ...newBudgets,
                                        e_budget: +text,
                                    });
                                }
                            }}
                        />
                    </View>
                    <View
                        style={{
                            flexDirection: "row",
                            alignItems: "center",
                            margin: 5,
                        }}
                    >
                        <Text style={{ marginLeft: 10, marginRight: 126 }}>
                            Food:
                        </Text>
                        <TextInput
                            style={styles.settingsTabInput}
                            placeholder={String(budgets.f_budget)}
                            placeholderTextColor={"black"}
                            onChangeText={(text) => {
                                if (text.length === 0) {
                                    setNewBudgets({ ...budgets });
                                } else {
                                    setNewBudgets({
                                        ...newBudgets,
                                        f_budget: +text,
                                    });
                                }
                            }}
                        />
                    </View>
                    <View
                        style={{
                            flexDirection: "row",
                            alignItems: "center",
                            margin: 5,
                        }}
                    >
                        <Text style={{ marginLeft: 10, marginRight: 43 }}>
                            Health & Wellness:
                        </Text>
                        <TextInput
                            style={styles.settingsTabInput}
                            placeholder={String(budgets.hw_budget)}
                            placeholderTextColor={"black"}
                            onChangeText={(text) => {
                                if (text.length === 0) {
                                    setNewBudgets({ ...budgets });
                                } else {
                                    setNewBudgets({
                                        ...newBudgets,
                                        hw_budget: +text,
                                    });
                                }
                            }}
                        />
                    </View>
                    <View
                        style={{
                            flexDirection: "row",
                            alignItems: "center",
                            margin: 5,
                        }}
                    >
                        <Text style={{ marginLeft: 10, marginRight: 36 }}>
                            Pets & Pet Supplies:
                        </Text>
                        <TextInput
                            style={styles.settingsTabInput}
                            placeholder={String(budgets.pp_budget)}
                            placeholderTextColor={"black"}
                            onChangeText={(text) => {
                                if (text.length === 0) {
                                    setNewBudgets({ ...budgets });
                                } else {
                                    setNewBudgets({
                                        ...newBudgets,
                                        pp_budget: +text,
                                    });
                                }
                            }}
                        />
                    </View>
                    <View
                        style={{
                            flexDirection: "row",
                            alignItems: "center",
                            margin: 5,
                        }}
                    >
                        <Text style={{ marginLeft: 10, marginRight: 102 }}>
                            Self-care:
                        </Text>
                        <TextInput
                            style={styles.settingsTabInput}
                            placeholder={String(budgets.sc_budget)}
                            placeholderTextColor={"black"}
                            onChangeText={(text) => {
                                if (text.length === 0) {
                                    setNewBudgets({ ...budgets });
                                } else {
                                    setNewBudgets({
                                        ...newBudgets,
                                        sc_budget: +text,
                                    });
                                }
                            }}
                        />
                    </View>
                    <View
                        style={{
                            flexDirection: "row",
                            alignItems: "center",
                            margin: 5,
                        }}
                    >
                        <Text style={{ marginLeft: 10, marginRight: 121 }}>
                            Travel:
                        </Text>
                        <TextInput
                            style={styles.settingsTabInput}
                            placeholder={String(budgets.t_budget)}
                            placeholderTextColor={"black"}
                            onChangeText={(text) => {
                                if (text.length === 0) {
                                    setNewBudgets({ ...budgets });
                                } else {
                                    setNewBudgets({
                                        ...newBudgets,
                                        t_budget: +text,
                                    });
                                }
                            }}
                        />
                    </View>
                </View>
            </Card>

            <View
                style={{
                    flex: 1,
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                {(JSON.stringify(newBudgets) !== JSON.stringify(budgets) ||
                    JSON.stringify(newProfile) !== JSON.stringify(profile)) && (
                    <Text>Changes have been made</Text>
                )}
                <TouchableOpacity
                    style={styles.logoutButton}
                    onPress={handleLogout}
                >
                    <Text style={{ color: "white" }}>Logout</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    greetingContainer: {
        flex: 1,
    },
    greeting: {
        fontSize: 35,
        marginTop: 30,
        marginBottom: 30,
        paddingLeft: 10,
    },
    settingsContainer: {
        flexDirection: "row",
        alignItems: "center",
    },
    settingsTabLabel: {
        marginLeft: 10,
    },
    settingsTabInput: {
        width: "30%",
        borderWidth: 1,
        padding: 3,
        paddingLeft: 5,
        borderRadius: 7,
        marginLeft: 5,
    },
    logoutButton: {
        width: 70,
        height: 40,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#07706a",
        borderRadius: 5,
    },
});

export default Settings;
