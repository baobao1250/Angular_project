import { Component } from '@angular/core';
import { ModalComponent } from '../../shared/components/modal/modal';

@Component({
  selector: 'app-exercise-five',
  standalone: true,
  imports: [ModalComponent],
  templateUrl: './exercise-five.html',
})
export class ExerciseFive {
  showDeleteModal = false;
  showPromoModal = false;
}