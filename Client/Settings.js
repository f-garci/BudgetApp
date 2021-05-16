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
import { firestore } from "firebase";

const Settings = (props) => {
    const [error, setError] = useState("");
    const { logout, currentUser } = useAuth();
    const dispatch = useDispatch();
    const [newProfiles, setNewProfiles] = useState({});
    const [newBudgets, setNewBudgets] = useState({});
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
    const [changes, setChanges] = useState(false);

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
                setProfile({ ...newProfile[0] });
                setNewProfiles({ ...newProfile[0] });
            });
        return unsubscribe;
    }, []);

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
                    ...newBudget[0],
                });

                setNewBudgets({ ...newBudget[0] });
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

    const updateUser = () => {
        database.budget
            .doc(`${budgets.id}`)
            .update({
                aa_budget: newBudgets.aa_budget,
                e_budget: newBudgets.e_budget,
                f_budget: newBudgets.f_budget,
                hw_budget: newBudgets.hw_budget,
                pp_budget: newBudgets.pp_budget,
                sc_budget: newBudgets.sc_budget,
                t_budget: newBudgets.t_budget,
            })
            .then(() => console.log("Updated budget!"));

        database.profiles
            .doc(`${newProfiles.id}`)
            .update({
                name: newProfiles.name,
            })
            .then(() => console.log("Updated profile!"));

        setChanges(false);
    };

    console.log(newProfiles.name);

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
                                setNewProfiles({
                                    ...newProfiles,
                                    name: profile.name,
                                });
                                setChanges(false);
                            } else {
                                setNewProfiles({ ...newProfiles, name: text });
                                setChanges(true);
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
                                    setNewBudgets({
                                        ...newBudgets,
                                        aa_budget: budgets.aa_budget,
                                    });
                                    setChanges(false);
                                } else {
                                    setNewBudgets({
                                        ...newBudgets,
                                        aa_budget: +text,
                                    });
                                    setChanges(true);
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
                                    setNewBudgets({
                                        ...newBudgets,
                                        e_budget: budgets.e_budget,
                                    });
                                    setChanges(false);
                                } else {
                                    setNewBudgets({
                                        ...newBudgets,
                                        e_budget: +text,
                                    });
                                    setChanges(true);
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
                                    setNewBudgets({
                                        ...newBudgets,
                                        f_budget: budgets.f_budget,
                                    });
                                    setChanges(false);
                                } else {
                                    setNewBudgets({
                                        ...newBudgets,
                                        f_budget: +text,
                                    });
                                    setChanges(true);
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
                                    setNewBudgets({
                                        ...newBudgets,
                                        hw_budget: budgets.hw_budget,
                                    });
                                    setChanges(false);
                                } else {
                                    setNewBudgets({
                                        ...newBudgets,
                                        hw_budget: +text,
                                    });
                                    setChanges(true);
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
                                    setNewBudgets({
                                        ...newBudgets,
                                        pp_budget: budgets.pp_budget,
                                    });
                                    setChanges(false);
                                } else {
                                    setNewBudgets({
                                        ...newBudgets,
                                        pp_budget: +text,
                                    });
                                    setChanges(true);
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
                                    setNewBudgets({
                                        ...newBudgets,
                                        sc_budget: budgets.sc_budget,
                                    });
                                    setChanges(false);
                                } else {
                                    setNewBudgets({
                                        ...newBudgets,
                                        sc_budget: +text,
                                    });
                                    setChanges(true);
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
                                    setNewBudgets({
                                        ...newBudgets,
                                        t_budget: budgets.t_budget,
                                    });
                                    setChanges(false);
                                } else {
                                    setNewBudgets({
                                        ...newBudgets,
                                        t_budget: +text,
                                    });
                                    setChanges(true);
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
                {changes && (
                    <TouchableOpacity onPress={updateUser}>
                        <Text>Update</Text>
                    </TouchableOpacity>
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
