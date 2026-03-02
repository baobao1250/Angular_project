import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExerciseOne } from './exercise-one';

describe('ExerciseOne', () => {
  let component: ExerciseOne;
  let fixture: ComponentFixture<ExerciseOne>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExerciseOne]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExerciseOne);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
