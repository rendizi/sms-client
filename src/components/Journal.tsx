'use client'

import { useSubjects } from "@/app/subjectsContext";
import { diary } from "@/lib/constants/temp";
import { useEffect } from "react";
import { SubjectCard } from "./SubjectCard";

export const Journal = () => {
    const { subjects, setSubjects } = useSubjects();

    useEffect(() => {
        const sortedSubjects = [...subjects].sort((a, b) => b.Score - a.Score);
        setSubjects(sortedSubjects)
    },[subjects])

    return (
        <div className="flex flex-col space-y-4 items-center mt-2">
            {subjects.map((subject) => (
                <SubjectCard key={subject.Id} subject={subject}/>
            ))}
        </div>
    );
};
