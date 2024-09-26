import { HttpClient } from '@angular/common/http';
import { Injectable, signal, WritableSignal } from '@angular/core';
import { Subject } from '../models/subject.model';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class SubjectService {

  private apiUrl = 'http://localhost:8080/subject'; 

  subjectIdSignal: WritableSignal<number | null> = signal(null);

  constructor(private http: HttpClient) {}

  getSubjects(): Observable<Subject[]> {
    return this.http.get<Subject[]>(`${this.apiUrl}/getAll`);
  }

  addSubject(subject: Subject): Observable<Subject> {
    return this.http.post<Subject>(`${this.apiUrl}/new`, subject);
  }

  deleteSubject(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${id}`);
  }

  // Function to update subject ID
  updateSubjectId(id: number) {
    this.subjectIdSignal.set(id);
  }

}
