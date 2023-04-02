import { createContext, useContext, useState } from "react";
import { auth } from "./supabaseClient";

const AuthContext = createContext();

function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState(null);

    const login = async (userName, password) => {
        try {
            const userCredential = await auth.signInWithEmailAndPassword(
                `${userName}@cypher.com`,
                password
            );
            console.log(userCredential)
            setCurrentUser(userCredential.user);
        } catch (error) {
            console.error(error);
        }
    }

    const register = async (userName, email, password, confirmPassword) => {
        try {
            if (password !== confirmPassword) {
                throw new Error("Passwords do not match");
            }

            const userCredential = await auth.createUserWithEmailAndPassword(
                `${userName}@cypher.com`,
                password
            );
            console.log(userCredential)

            // Update the user's display name with their username
            await userCredential.user.updateProfile({
                displayName: userName,
            });

            await db.collection(userName).doc().set({
                userName,
                email,
            });

            setCurrentUser(userCredential.user);
        } catch (error) {
            console.error(error);
        }
    };

    const logout = async () => {
        try {
            await auth.signOut();
            setCurrentUser(null);
        } catch (error) {
            console.error(error);
        }
    };

    // Listen for changes to the authentication state and update the current user accordingly
    auth.onAuthStateChanged((user) => {
        setCurrentUser(user);
    });


    const value = { currentUser, login, register, logout };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

function useAuth() {
    return useContext(AuthContext);
}

export { AuthProvider, useAuth };
