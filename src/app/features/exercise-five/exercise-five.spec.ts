import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExerciseFive } from './exercise-five';

describe('ExerciseFive', () => {
  let component: ExerciseFive;
  let fixture: ComponentFixture<ExerciseFive>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExerciseFive]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExerciseFive);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
