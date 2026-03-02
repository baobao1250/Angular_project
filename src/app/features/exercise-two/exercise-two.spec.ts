import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExerciseTwo } from './exercise-two';

describe('ExerciseTwo', () => {
  let component: ExerciseTwo;
  let fixture: ComponentFixture<ExerciseTwo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExerciseTwo]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExerciseTwo);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
