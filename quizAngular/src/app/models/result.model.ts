export interface Student {
    id: number;
    name: string;
  }
  
  export interface Subject {
    id: number;
    subject: string;
  }
  
  export interface Result {
    id: number;
    mark: number;
    student: Student;
    subject: Subject;
  }