import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Results } from '../../models/student.model';
import { ResultsService } from '../../services/results.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Result } from '../../models/result.model';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { FloatLabelModule } from 'primeng/floatlabel';
import { filter } from 'rxjs';

@Component({
  selector: 'app-results-subject',
  standalone: true,
  imports: [HttpClientModule, CommonModule, TableModule, ButtonModule, InputTextModule, FormsModule, FloatLabelModule],
  templateUrl: './results-subject.component.html',
  styleUrl: './results-subject.component.css',
  providers: [HttpClient, ResultsService]
})
export class ResultsSubjectComponent {

  subjectId!: number;
  totalRecords: number = 0;
  serachValue: string ='';

  results: Result[] = [];

  filteredResults: Result[]= [];

  constructor(
    private resultService: ResultsService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.subjectId = +params['subjectId'];  // Get the subject ID from the URL
      this.getResultsOfSubject(this.subjectId);
    });
  }

  getResultsOfSubject(subjectId: number): void{
    this.resultService.getResultsOfSubject(subjectId).subscribe( {
      next: (data) => {
        this.results = data;
        this.filteredResults = data;
      },
      error: (error) => {
        console.error('Error fetching results:', error);
      }
    });
    this.totalRecords = this.results.length;

  }

  onSearch(): void {
    this.filteredResults = [];
    if (this.serachValue) {
      this.filteredResults = this.results.filter(result =>
        result.student.name.toLowerCase().includes(this.serachValue.toLowerCase()) ||
        result.mark.toString().includes(this.serachValue)
      );
    } else {
      this.filteredResults = [...this.results]; 
    }
  }

  back(){
    this.router.navigate(['/subjects']);
  }

}
