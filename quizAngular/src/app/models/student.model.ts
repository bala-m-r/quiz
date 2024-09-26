export interface Student{
    id: number,
    name: string,
    results: Results[]
}

export interface Results{
    id: number,
    mark: number,
    studentid: number,
    subjectid: number
}