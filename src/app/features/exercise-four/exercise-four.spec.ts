import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExerciseFour } from './exercise-four';

describe('ExerciseFour', () => {
  let component: ExerciseFour;
  let fixture: ComponentFixture<ExerciseFour>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExerciseFour]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExerciseFour);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
