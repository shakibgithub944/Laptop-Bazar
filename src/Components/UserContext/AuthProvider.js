import React, { createContext, useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile } from 'firebase/auth'
import app from '../../Firebase/Firebase.config';


export const AuthContext = createContext();
const auth = getAuth(app)


const AuthProvider = ({ children }) => {

    const [user, serUser] = useState(null)
    const [loading, setloading] = useState(true);

    const createUser = (email, password) => {
        setloading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }
    const loginUser = (email, password) => {
        setloading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }
    const updateUser = (name) => {
        setloading(true)
        return updateProfile(auth.currentUser, {
            displayName: name,
        })
    }
    const logOut = () => {
        setloading(true)
        return signOut(auth)
    }
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currenUser => {
            serUser(currenUser)
            setloading(false);
        })
        return () => unsubscribe()
    }, [])


    const authInfo = {
        createUser,
        loginUser,
        logOut,
        updateUser,
        loading,
        user,
    }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;