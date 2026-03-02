import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-like-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './like-button.html', // Trỏ thẳng vào file HTML mới
  styleUrl: './like-button.css'      // Trỏ thẳng vào file CSS mới
})
export class LikeButton { // Tên class không cần đuôi Component
  likes: number = 0;
  hasLiked: boolean = false;

  toggleLike(): void {
    this.hasLiked = !this.hasLiked;
    this.likes = this.hasLiked ? this.likes + 1 : this.likes - 1;
  }
}