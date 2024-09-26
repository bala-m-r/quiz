import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultsStudentComponent } from './results-student.component';

describe('ResultsStudentComponent', () => {
  let component: ResultsStudentComponent;
  let fixture: ComponentFixture<ResultsStudentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResultsStudentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResultsStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
