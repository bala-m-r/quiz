import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Subject } from '../../models/subject.model';
import { SubjectService } from '../../services/subject.service';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { HttpClient, HttpClientModule, HttpHandler } from '@angular/common/http';
import { ListboxModule } from 'primeng/listbox';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-sutudent-subject-list',
  standalone: true,
  imports: [CommonModule, HttpClientModule, ListboxModule, ButtonModule],
  templateUrl: './student-subject-list.component.html',
  styleUrl: './student-subject-list.component.css',
  providers: [SubjectService, HttpClient]
})
export class StudentSubjectListComponent {
  subjects: Subject[] = [];
  subjectId!: number;
  studentId!: number;
  constructor(private subjectService: SubjectService,
              private route: ActivatedRoute,
              private router: Router,) {
    this.getSubjects();
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.studentId = +params['studentId'];  // Get the subject ID from the URL
      console.log('StudentSubjectListComponent', this.studentId);
    });
  }

  getSubjects(): void {
    this.subjectService.getSubjects().subscribe((data) => {
      this.subjects = data;
    });
  }

  selectSubject(subjectId: number): void {
    this.router.navigate(['/studentQuestion', subjectId, this.studentId]);
  }

  back(){
    this.router.navigate(['/student']);
  }

}
