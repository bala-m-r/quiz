export interface Question {
    id : number;
    question : string;
    subject_id : number;  
    options: Answer[];  
  }
  
  export interface Answer {
    id: number;
    answer : string;
    isright: boolean;
  }


  