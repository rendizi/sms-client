'use client'

import React, { createContext, ReactNode, useContext, useState } from "react";


interface LoadingContextType{
    isLoading: boolean
    setIsLoading: (newStatus: boolean) => void;
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined)

const LoadingProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [loading, setLoading] = useState(false)
    return (
        <LoadingContext.Provider value={{isLoading: loading, setIsLoading: setLoading}}>
            {children}
        </LoadingContext.Provider>
    )
}

const useLoading = () => {
    const context = useContext(LoadingContext)
    if (context === undefined){
        throw new Error("loading provider missing")
    }
    return context
}

export {LoadingProvider, useLoading}