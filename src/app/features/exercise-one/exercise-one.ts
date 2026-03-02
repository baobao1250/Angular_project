import { Component } from '@angular/core';
import { UserCard } from '../../shared/components/user-card/user-card';
import { User } from '../../shared/models/user';

@Component({
  selector: 'app-exercise-one',
  standalone: true,
  imports: [UserCard],
  templateUrl: './exercise-one.html',
})
export class ExerciseOne {
  // Khai báo một mảng các object
  users: User[] = [
    {
      name: 'Nguyễn Văn A',
      role: 'React Developer',
      avatarUrl: 'https://i.pravatar.cc/150?img=11'
    },
    {
      name: 'Trần Thị B',
      role: 'Angular Master',
      avatarUrl: 'https://i.pravatar.cc/150?img=47'
    },
    {
      name: 'Lê Văn C',
      role: 'UI/UX Designer',
      avatarUrl: 'https://i.pravatar.cc/150?img=12'
    },
    {
      name: 'Phạm Thị D',
      role: 'Project Manager',
      avatarUrl: 'https://i.pravatar.cc/150?img=5'
    }
  ];

  selectedUser: User | null = null;

  viewDetail(user: User) {
    this.selectedUser = user; // Lưu vào state để hiện Modal
  }

  closeModal() {
    this.selectedUser = null;
  }
}