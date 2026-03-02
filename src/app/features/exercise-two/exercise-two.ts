import { Component } from '@angular/core';

@Component({
  selector: 'app-exercise-two',
  standalone: true,
  templateUrl: './exercise-two.html',
})
export class ExerciseTwo {
  isOpen: boolean = false;
  toggleOpen(): void {
    this.isOpen = !this.isOpen;
  }
}