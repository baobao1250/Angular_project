import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExerciseThree } from './exercise-three';

describe('ExerciseThree', () => {
  let component: ExerciseThree;
  let fixture: ComponentFixture<ExerciseThree>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExerciseThree]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExerciseThree);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
