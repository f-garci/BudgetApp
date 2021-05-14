import React, { useContext, useEffect, useState } from "react";
import { auth, database } from "../firebase";

const AuthContext = React.createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState();
    const [loading, setLoading] = useState(true);

    const signup = (email, password) => {
        return auth
            .createUserWithEmailAndPassword(email, password)
            .then((response) => {
                database.budget.add({
                    aa_budget: 200,
                    hw_budget: 200,
                    pp_budget: 200,
                    sc_budget: 200,
                    e_budget: 200,
                    t_budget: 200,
                    f_budget: 200,
                    userId: response.user.uid,
                });
            });
    };

    const login = (email, password) => {
        return auth.signInWithEmailAndPassword(email, password);
    };

    const logout = () => {
        return auth.signOut();
    };

    useEffect(() => {
        const unsunscribe = auth.onAuthStateChanged((user) => {
            setCurrentUser(user);
            setLoading(false);
        });

        return unsunscribe;
    }, []);

    const value = {
        currentUser,
        signup,
        login,
        logout,
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};
