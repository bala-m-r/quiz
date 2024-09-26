import { Component } from '@angular/core';
import { ResultsService } from '../../services/results.service';
import { Result } from '../../models/result.model';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ButtonModule } from 'primeng/button';
import { FloatLabelModule } from 'primeng/floatlabel';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-results-student',
  standalone: true,
  imports: [CommonModule, InputTextModule, TableModule, ButtonModule, HttpClientModule, FloatLabelModule, FormsModule],
  templateUrl: './results-student.component.html',
  styleUrl: './results-student.component.css',
  providers: [ResultsService, HttpClient]
})
export class ResultsStudentComponent {

  studentId!: number;
  totalRecords: number = 0;

  results: Result[] = [];

  filteredResults: Result[] =[];

  serachValue: string ='';

  constructor(
    private resultService: ResultsService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.studentId = +params['studentId'];  // Get the subject ID from the URL
      this.getResultsOfStudent(this.studentId);
    });
  }

  getResultsOfStudent(studentId: number): void{
    this.resultService.getResultsOfStudent(studentId).subscribe( {
      next: (data) => {
        this.results = data;
        this.filteredResults = data;
      },
      error: (error) => {
        console.error('Error fetching results:', error);
      }
    });
    this.totalRecords = this.results.length;
    console.log(this.results);

  }

  onSearch(): void {
    this.filteredResults = [];
    if (this.serachValue) {
      this.filteredResults = this.results.filter(result =>
        result.subject.subject.toLowerCase().includes(this.serachValue.toLowerCase()) ||
        result.mark.toString().includes(this.serachValue)
      );
    } else {
      this.filteredResults = [...this.results]; 
    }
  }

  back(){
    this.router.navigate(['/student']);
  }

}
