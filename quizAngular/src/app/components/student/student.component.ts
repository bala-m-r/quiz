import { Component } from '@angular/core';
import { Student } from '../../models/student.model';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { QuestionService } from '../../services/question.service';
import { ResultsService } from '../../services/results.service';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { StudentService } from '../../services/student.service';
import { IconFieldModule } from 'primeng/iconfield';
import { TooltipModule } from 'primeng/tooltip';

@Component({
  selector: 'app-student',
  standalone: true,
  imports: [CommonModule, FormsModule, TooltipModule, HttpClientModule, ButtonModule, InputTextModule, IconFieldModule],
  templateUrl: './student.component.html',
  styleUrl: './student.component.css',
  providers: [HttpClient, QuestionService, StudentService]
})
export class StudentComponent {
  students: Student[] = [];
  newStudentName: string = '';

  constructor(private http: HttpClient, 
              private router: Router, 
              private studentService: StudentService,
              private questionService: QuestionService

  ) {
    this.getStudents();
  }

  getStudents() {
    this.http.get<any[]>('http://localhost:8080/student/getAll').subscribe(data => {
      this.students = data;
    });
  }

  addStudent() {

   

    if (this.newStudentName.trim()) {

      
      
      this.http.post('http://localhost:8080/student/add', { name: this.newStudentName }).subscribe(() => {
        this.getStudents(); // Refresh list after adding
        this.newStudentName = ''; // Clear input
      });
    }
  }

  deleteStudent(studentId: number){
    console.log(studentId);
    this.studentService.deleteStudent(studentId).subscribe(() => {
      this.getStudents();  
    });

  }

  viewProgress(studentId: number){
    this.router.navigate(['/resultsStudent', studentId]);

  }

  selectStudent(studentId: number) {
    
    this.questionService.setStudentId(studentId);
    
    this.router.navigate(['/studentSubjects', studentId]);
  }
}
