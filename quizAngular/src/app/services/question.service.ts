import { Injectable, signal } from '@angular/core';
import { Question } from '../models/question.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  private selectedStudentId: number = 0; // Holds the globally selected student ID

  // Set the selected student ID
  setStudentId(studentId: number) {
    this.selectedStudentId = studentId;
  }

  // Get the selected student ID
  getStudentId(): number {
    return this.selectedStudentId;
  }


  private apiUrl = 'http://localhost:8080/question'; // Update this URL to your Spring Boot API

  constructor(private http: HttpClient) {}

  getQuestionsForSubject(subjectId: number): Observable<Question[]> {
    return this.http.get<Question[]>(`${this.apiUrl}/getBySubjectId/${subjectId}`);
  }

  deleteQuestion(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${id}`);
  }

  editQuestion(id: number, questionText: string, subjectId: number, options: string[], isRight: boolean[]): Observable<void> {
    const url = `${this.apiUrl}/edit/${id}`;

    console.log(id, questionText, subjectId, options, isRight)

    // Create form data for the request
    const formData = new FormData();
    formData.append('questionText', questionText);
    formData.append('subjectId', subjectId.toString());

    options.forEach((option, index) => {
      formData.append(`options`, option);
    });

    isRight.forEach((value, index) => {
      formData.append(`isRight`, value.toString());
    });

    return this.http.put<void>(url, formData, {
      headers: new HttpHeaders({
        'enctype': 'multipart/form-data'
      })
    });
    // return this.http.put<void>(`${this.apiUrl}/edit/${id}`, {
    //   questionText,
    //   subjectId,
    //   options,
    //   isRight
    // });
  }

  addQuestion(questionText: string, subjectId: number, options: string[], isRight: boolean[]): Observable<Question> {
    const url = `${this.apiUrl}/add`;

    // Create form data for the request
    const formData = new FormData();
    formData.append('questionText', questionText);
    formData.append('subjectId', subjectId.toString());

    options.forEach((option, index) => {
      formData.append(`options`, option);
    });

    isRight.forEach((value, index) => {
      formData.append(`isRight`, value.toString());
    });

    return this.http.post<Question>(url, formData, {
      headers: new HttpHeaders({
        'enctype': 'multipart/form-data'
      })
    });
  }

 
}
