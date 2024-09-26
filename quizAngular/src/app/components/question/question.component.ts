import { Component } from '@angular/core';
import { SubjectService } from '../../services/subject.service';
import { QuestionService } from '../../services/question.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Answer, Question } from '../../models/question.model';
import { HttpClientModule } from '@angular/common/http';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CheckboxModule } from 'primeng/checkbox';
import { PaginatorModule } from 'primeng/paginator';

@Component({
  selector: 'app-question',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, HttpClientModule, ButtonModule, InputTextModule, CheckboxModule],
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css'], 
  providers: [QuestionService, SubjectService]
})
export class QuestionComponent {
  subjectId!: number;
  questions: Question[] = [];
  isAdd: boolean = false;
  isList: boolean = true;
  isEdit: boolean = false;
  newQuestion: Question = {
    id: 0,
    question: '',
    subject_id: 0,
    options: []
  };
  newQuestionText: string = '';
  
  // Update newOptions to hold objects
  newOptions: { answer: string; isright: boolean }[] = [{ answer: '', isright: false }];

  constructor(
    private questionService: QuestionService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.subjectId = +params['subjectId'];  // Get the subject ID from the URL
      this.getQuestionsBySubjectId(this.subjectId);
    });
  }

  getQuestionsBySubjectId(subjectId: number): void {
    this.questionService.getQuestionsForSubject(subjectId).subscribe(data => {
      this.questions = data;
    });
  }

  deleteQuestion(id: number) {
    this.questionService.deleteQuestion(id).subscribe(() => {
      this.getQuestionsBySubjectId(this.subjectId);  // Refresh the list after deletion
    });
  }

  editQuestion(question: Question): void {
    this.subjectId = question.subject_id;
    
    this.newQuestion = { ...question }; // Create a copy of the question for editing
    this.newQuestion.id = question.id;
    this.isEdit = true; // Show the edit form
    this.isAdd = false;
    this.isList = false;
  }

  submitQuestion(): void {
    const answers = this.newOptions.map(opt => opt.answer);
    const isRights = this.newOptions.map(opt => opt.isright);
    
    this.questionService.addQuestion(this.newQuestionText, this.subjectId, answers, isRights)
      .subscribe({
        next: (response) => {
          console.log('Question added successfully:', response);
          this.resetForm();
          this.addForm();
        },
        error: (err) => {
          console.error('Error adding question:', err);
        }
      });
  }

  submitEditQuestion() {
    const options = this.newQuestion.options.map(opt => opt.answer);
    const isright = this.newQuestion.options.map(opt => opt.isright);
    
    this.route.params.subscribe(params => {
      this.subjectId = +params['subjectId'];  // Get the subject ID from the URL
      
    });
    
    this.questionService.editQuestion(this.newQuestion.id, this.newQuestion.question, this.subjectId, options, isright)
      .subscribe(response => {
        console.log('Question edited successfully:', response);
        this.resetForm();
      });
  }

  addOptionEdit() {
    this.newQuestion.options.push({
      id: 0,
      answer: '', isright: false
    });
  }

  removeOptionEdit(index: number) {
    this.newQuestion.options.splice(index, 1);
  }

  addForm(){
    this.isAdd = true;
    this.isEdit = false;
    this.isList = false;
  }
  

  gotoSubject() {
    this.router.navigate(['/subjects']);
  }

  addQuestion() {
    this.isAdd = true;
    this.isList = false;
    this.isEdit = false;
  }

  addOption(): void {
    this.newOptions.push({ answer: '', isright: false });
  }

  removeOption(index: number): void {
    if (this.newOptions.length > 1) {
      this.newOptions.splice(index, 1);
    }
  }

  toQuestions() {
    this.isAdd = false;
    this.isList = true;
    this.isEdit = false;
    this.getQuestionsBySubjectId(this.subjectId);
  }

  private resetForm(): void {
    this.newQuestionText = '';
    this.newOptions = [{ answer: '', isright: false }];
    this.isAdd = false;
    this.isEdit = false;
    this.isList = true;
    this.getQuestionsBySubjectId(this.subjectId); 
  }
}
