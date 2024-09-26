import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { Question } from '../../models/question.model';
import { QuestionService } from '../../services/question.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpClientModule, HttpHandler } from '@angular/common/http';
import { CheckboxModule } from 'primeng/checkbox';
import { FormsModule } from '@angular/forms';
import { RadioButtonModule } from 'primeng/radiobutton';
import { ResultsService } from '../../services/results.service';
import { ListboxModule } from 'primeng/listbox';

@Component({
  selector: 'app-student-question',
  standalone: true,
  imports: [ButtonModule, ListboxModule, RadioButtonModule, CommonModule, InputTextModule, DropdownModule, HttpClientModule, CheckboxModule, FormsModule],
  templateUrl: './student-question.component.html',
  styleUrl: './student-question.component.css',
  providers: [QuestionService, HttpClient, ResultsService]
})
export class StudentQuestionComponent {
  subjectId!: number;
  studentId!: number;
  questions: Question[] = [];
  selectedAnswers: any[] = []; // This will store the user's selected options
  quizSubmitted: boolean = false;
  score: number = 0;

  

  constructor(
    private resultsService: ResultsService,
    private questionService: QuestionService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.subjectId = +params['subjectId']; 
      this.studentId = +params['studentId']; 
      this.getQuestionsBySubjectId(this.subjectId);
    });
  }

  getQuestionsBySubjectId(subjectId: number): void {
    this.questionService.getQuestionsForSubject(subjectId).subscribe(data => {
      this.questions = data;
    });
  }

  gotoSubject(studentId: number){
    this.router.navigate(['/studentSubjects', studentId]);
  }

 


  submitQuiz(): void {
    this.quizSubmitted = true;
    this.score = this.calculateScore();

    console.log(this.score, this.studentId, this.subjectId );

    // Call the service to save the result
    this.resultsService.addResult(this.studentId, this.subjectId, this.score)
      .subscribe({
        next: (response) => {
          console.log('Result saved successfully', response);
        },
        error: (err) => {
          console.error('Error saving result:', err);
        }
      });
  }

  calculateScore(): number {
    let correctAnswers = 0;

    // Loop through the questions and check the user's selected answers
    this.questions.forEach((question, index) => {
      const selectedOption = this.selectedAnswers[index];
      if (selectedOption && selectedOption.isright) {
        correctAnswers++;
      }
    });

    return correctAnswers;
  }

}
