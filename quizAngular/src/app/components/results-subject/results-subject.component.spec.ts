import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultsSubjectComponent } from './results-subject.component';

describe('ResultsSubjectComponent', () => {
  let component: ResultsSubjectComponent;
  let fixture: ComponentFixture<ResultsSubjectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResultsSubjectComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResultsSubjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
