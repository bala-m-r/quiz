import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  apiUrl = 'http://localhost:8080/student';

  constructor(
    private http: HttpClient
  ) { 
    
  }

  deleteStudent(studentId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${studentId}`);
  }
 
}
