export interface Subject{
    Name: string 
    JournalId: string 
    Score: number 
    Mark: number 
    Evaluations: {
        ShortName: string 
        Percent: number 
        Id: string 
    }[]
    Id: string 
}

export interface EvaluationInfo{
    Name: string 
    Description: string 
    Score: number
    MaxScore: number 
    Disabled: boolean
    Comment: null 
    RubricId: string 
    Id: string 
}

export interface Rubric{
    Criterion: string 
    CriterionId: string 
    LowDescriptor: string 
    MediumDescriptor: string 
    HighDescriptor: string 
    LowResult: boolean
    MediumResult: boolean
    HighResult: boolean
}

export interface Term{
    Name: string 
    Id: string 
}

export interface Year{
    Name: string 
    Id: string 
    isActual: boolean
}