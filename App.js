import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { HomeScreenStack } from "./Navigation/MainNavigator";
import { AuthProvider } from "./contexts/AuthContext";

// if (firebase.apps.length === 0) {
//     firebase.initializeApp(fbconfig);
// }

// const authStateChange = (callback) => {
//     return firebase.auth().onAuthStateChanged((user) => {
//         if (user) {
//             callback({ loggedIn: true });
//         } else {
//             callback({ loggedIn: false });
//         }
//     });
// };

export default function App() {
    // const [user, setUser] = useState({ loggedIn: false });

    // useEffect(() => {
    //     const unsubscribe = authStateChange(setUser);

    //     return () => {
    //         unsubscribe();
    //     };
    // }, []);

    // if (!user.loggedIn) {
    //     console.log("user is logged out");
    // } else {
    //     console.log("user is logged in");
    // }

    return (
        <AuthProvider>
            <NavigationContainer>
                <HomeScreenStack></HomeScreenStack>
            </NavigationContainer>
        </AuthProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
});
