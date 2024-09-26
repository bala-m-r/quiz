import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Results } from '../models/student.model';
import { Result } from '../models/result.model';

@Injectable({
  providedIn: 'root'
})
export class ResultsService {

  private apiUrl = 'http://localhost:8080/results'; // Update this with your actual backend URL

  constructor(private http: HttpClient) { }

  // Method to add a result
  addResult(studentId: number, subjectId: number, mark: number): Observable<any> {

    const formData = new FormData();
    formData.append('studentId', studentId.toString());
    formData.append('subjectId', subjectId.toString());
    formData.append('mark', mark.toString());

    return this.http.post(`${this.apiUrl}/add`, formData);
  }

  getResultsOfSubject(subjectId: number): Observable<Result[]>{
    return this.http.get<Result[]>(`${this.apiUrl}/getBySubject/${subjectId}`);
  }

  getResultsOfStudent(studentId: number):Observable<Result[]>{
    return this.http.get<Result[]>(`${this.apiUrl}/getByStudent/${studentId}`);
  }

}
