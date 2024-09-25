'use client';

import { evals } from "@/lib/constants/temp";
import { EvaluationInfo, Subject } from "@/lib/types";
import { useState, useRef, useEffect } from "react";

export const SubjectCard = ({ subject }: { subject: Subject }) => {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [evaluations, setEvaluations] = useState<EvaluationInfo[] | null>(null)
    const dialogRef = useRef<HTMLDivElement>(null); 

    let progressColor = 'bg-red-600'; 

    if (subject.Score >= 39.5 && subject.Score < 84.5) {
        progressColor = 'bg-orange-500'; 
    } else if (subject.Score >= 84.5 && subject.Score <= 100) {
        progressColor = 'bg-green-600'; 
    }

    useEffect(() => {
        setEvaluations(evals)
    },[])

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dialogRef.current && !dialogRef.current.contains(event.target as Node)) {
                setIsDialogOpen(false);
            }
        };

        if (isDialogOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isDialogOpen]);

    return (
        <div
            className="lg:w-1/3 w-2/3 bg-slate-950 rounded-lg shadow-md relative"
            onClick={() => { setIsDialogOpen(true) }}
        >
            <div className="flex justify-between items-center p-4">
                <div className="text-white">{subject.Name}</div>
                <div className="text-white">{subject.Mark}</div>
            </div>
            <div className="absolute bottom-0 left-0 w-full bg-gray-800 h-1">
                <div
                    className={`${progressColor} h-full`}
                    style={{ width: `${subject.Score}%` }}
                />
            </div>

            {isDialogOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div
                        ref={dialogRef}
                        className="bg-slate-950 p-6 rounded shadow-md"
                    >
                        <h2 className="text-xl font-bold">{subject.Name}</h2>
                        <p>{subject.Score}% - {subject.Mark}</p>
                        
                        <div className="w-full bg-gray-800 h-1 mt-4">
                            <div
                                className={`${progressColor} h-full`}
                                style={{ width: `${subject.Score}%` }}
                            />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
