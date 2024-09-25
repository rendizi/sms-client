import { useSubjects } from "@/app/subjectsContext";
import { proxy } from "@/lib/proxy";
import { Subject, Term, Year } from "@/lib/types";
import { useEffect, useRef, useState } from "react";
import { LoadingOverlay } from "./Loading";

export const Header = () => {
    const { subjects, setSubjects } = useSubjects(); // Single useSubjects call
    const [years, setYears] = useState<Year[] | null>(null);
    const [terms, setTerms] = useState<Term[] | null>(null);
    const [currentYear, setCurrentYear] = useState<string>('');
    const [currentTerm, setCurrentTerm] = useState<string>('');
    const yearRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (years){
            return 
        }

        const fetchYears = async () => {
            try {
                const response = await proxy.get<Year[]>("/sms/years");
                setYears([...response.data].sort((a, b) => a.Name.localeCompare(b.Name)));
            } catch (err) {
                console.error(err);
            }
        };
        fetchYears();
    }, []);

    useEffect(() => {
        if (!years) return;
        const actualYear = years.find((year) => year.isActual);
        if (actualYear) {
            setCurrentYear(actualYear.Id);
        }
    }, [years]);

    useEffect(() => {
        if (!currentYear) return;
        const fetchTerms = async () => {
            try {
                const response = await proxy.get<Term[]>(`/sms/terms?yearId=${currentYear}`);
                setTerms([...response.data].sort((a, b) => a.Name.localeCompare(b.Name)));
            } catch (err) {
                console.error(err);
            }
        };
        fetchTerms();

        // Scroll into view for the current year
        if (yearRef.current) {
            const currentElement = yearRef.current.querySelector(`[data-id="${currentYear}"]`);
            if (currentElement) {
                currentElement.scrollIntoView({ behavior: 'smooth', inline: 'center' });
            }
        }
    }, [currentYear]);

    // Set current term (1st quarter) if terms are available
    useEffect(() => {
        if (!terms) return;
        const firstTerm = terms.find((term) => term.Name.includes("1-я четверть"));
        if (firstTerm) {
            setCurrentTerm(firstTerm.Id);
        }
    }, [terms]);

    // Fetch subjects when current term is set
    useEffect(() => {
        if (!currentTerm) return;
        const fetchSubjects = async () => {
            try {
                const response = await proxy.get<Subject[]>(`/sms/diary/${currentTerm}`);
                setSubjects(response.data);
            } catch (err) {
                console.error(err);
            }
        };
        fetchSubjects();
    }, [currentTerm, setSubjects]);

    if (!subjects) {
        return <LoadingOverlay />;
    }

    return (
        <div className="bg-neutral-950 w-full flex flex-col items-center p-4">
            <div ref={yearRef} className="overflow-x-auto w-2/3 max-w-md scrollable">
                <div className="flex space-x-2 p-2">
                    {years &&
                        years.map((year) => (
                            <div
                                key={year.Id}
                                data-id={year.Id}
                                className={`px-4 py-2 rounded-lg transition duration-300 ${
                                    year.Id === currentYear
                                        ? "bg-blue-600 text-white shadow-lg transform scale-105"
                                        : "bg-gray-700 text-gray-300"
                                } hover:bg-blue-500 hover:text-white cursor-pointer`}
                                onClick={() => setCurrentYear(year.Id)}
                            >
                                {year.Name.replace(" учебный год", "")}
                            </div>
                        ))}
                </div>
            </div>

            <div className="flex justify-between w-1/2 max-w-md mt-2">
                {terms &&
                    terms.map((term) => (
                        <div
                            key={term.Id}
                            className={`px-4 py-2 rounded-lg text-center transition duration-300 ${
                                term.Id === currentTerm ? "bg-blue-600 text-white" : "bg-gray-700 text-gray-300"
                            } hover:bg-blue-500 cursor-pointer`}
                            onClick={() => setCurrentTerm(term.Id)}
                        >
                            {term.Name.replace("-я четверть", "")}
                        </div>
                    ))}
            </div>
        </div>
    );
};
