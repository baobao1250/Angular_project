import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExerciseSix } from './exercise-six';

describe('ExerciseSix', () => {
  let component: ExerciseSix;
  let fixture: ComponentFixture<ExerciseSix>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExerciseSix]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExerciseSix);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
