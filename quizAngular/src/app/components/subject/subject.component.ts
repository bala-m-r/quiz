import { Component, EventEmitter, Output } from '@angular/core';
import { Subject } from '../../models/subject.model';
import { SubjectService } from '../../services/subject.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule, HttpHandler } from '@angular/common/http';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TooltipModule } from 'primeng/tooltip';
import { IconFieldModule } from 'primeng/iconfield';

@Component({
  selector: 'app-subject',
  standalone: true,
  imports: [CommonModule, RouterModule, TooltipModule, IconFieldModule, FormsModule, HttpClientModule, ButtonModule, InputTextModule],
  templateUrl: './subject.component.html',
  styleUrl: './subject.component.css',
  providers: [SubjectService, HttpClient]
})
export class SubjectComponent {

  subjects: Subject[] = [];
  newSubject: Subject = { id: 0, subject: '' };
  subjectId!: number;

  constructor(private subjectService: SubjectService, 
              private router: Router) {
    this.getSubjects();
  }
  getSubjects(): void {
    this.subjectService.getSubjects().subscribe((data) => {
      this.subjects = data;
    });
  }

  addSubject(): void {
    if (this.newSubject.subject.trim()) {
      this.subjectService.addSubject(this.newSubject).subscribe(() => {
        this.getSubjects();  // Refresh the list
        this.newSubject = { id: 0, subject: '' };  // Reset the input
      });
    }
  }

  viewProgress(index: number): void{
    const subjectId = this.subjects[index].id;
    this.router.navigate(['/resultsSubject', subjectId]);

  }
  deleteSubject(index: number): void {
    const subjectToDelete = this.subjects[index];
    this.subjectService.deleteSubject(subjectToDelete.id).subscribe(() => {
      this.getSubjects();  // Refresh the list after deletion
    });
  }

  selectSubject(subjectId: number): void {
    this.router.navigate(['/questions', subjectId]);
  }

}
