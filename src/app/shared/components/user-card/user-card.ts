// Thêm Output và EventEmitter vào đây
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { User } from '../../models/user';

@Component({
  selector: 'app-user-card',
  standalone: true,
  templateUrl: './user-card.html',
})
export class UserCard {
  @Input() userInfo!: User; 

  @Output() cardClick = new EventEmitter<User>();

  handleClick() {
    this.cardClick.emit(this.userInfo);
  }
}