import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentQuestionComponent } from './student-question.component';

describe('StudentQuestionComponent', () => {
  let component: StudentQuestionComponent;
  let fixture: ComponentFixture<StudentQuestionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentQuestionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
