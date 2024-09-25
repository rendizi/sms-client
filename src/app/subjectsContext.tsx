'use client'

import { Subject } from "@/lib/types";
import React, { createContext, ReactNode, useContext, useState } from "react";

interface SubjectsContextType{
    subjects: Subject[]
    setSubjects: (newSubjects: Subject[]) => void
}

const SubjectsContext = createContext<SubjectsContextType | undefined>(undefined)

const SubjectsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [subjects, setSubjects] = useState<Subject[]>([])
    return (
        <SubjectsContext.Provider value={{subjects, setSubjects}}>
            {children}
        </SubjectsContext.Provider>
    )
}

const useSubjects = () => {
    const context = useContext(SubjectsContext);
    if (context === undefined) {
        throw new Error("useSubjects must be used within a MyProvider");
    }
    return context;
};

export { SubjectsProvider, useSubjects };