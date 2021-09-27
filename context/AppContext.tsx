import React from "react";

export const AppContext = React.createContext<IApp>(null)

export interface IApp { 
    sponsors: Array<object>, 
}