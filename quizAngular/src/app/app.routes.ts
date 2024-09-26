import { RouterModule, Routes } from '@angular/router';
import { SubjectComponent } from './components/subject/subject.component';
import { QuestionComponent } from './components/question/question.component';
import { NgModule } from '@angular/core';
import { StudentSubjectListComponent } from './components/student-subject-list/student-subject-list.component';
import { StudentQuestionComponent } from './components/student-question/student-question.component';
import { StudentComponent } from './components/student/student.component';
import { ResultsSubjectComponent } from './components/results-subject/results-subject.component';
import { ResultsStudentComponent } from './components/results-student/results-student.component';
import { AppComponent } from './app.component';

export const routes: Routes = [
    { path: 'student', component: StudentComponent},
    { path:'subjects', component: SubjectComponent},
    { path: 'questions/:subjectId', component: QuestionComponent },
    { path: 'studentSubjects/:studentId', component: StudentSubjectListComponent},
    { path: 'studentQuestion/:subjectId/:studentId', component: StudentQuestionComponent},
    { path: 'resultsSubject/:subjectId', component: ResultsSubjectComponent},
    { path: 'resultsStudent/:studentId', component: ResultsStudentComponent}
];



@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })

  export class AppRoutingModule {}