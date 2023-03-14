import React from "react";
import firebase from "firebase";

export const AuthContext = React.createContext<IAuth>(null)

export interface IAuth { 
    logIn: (data: firebase.auth.UserCredential) => void, 
    logOut: () => void, 
    signUp: (data: firebase.auth.UserCredential) => void
}