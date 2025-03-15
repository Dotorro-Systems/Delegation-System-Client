import {Component, OnInit} from '@angular/core';
import {User} from '../../interfaces/user';
import {UserService} from '../../services/user.service';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-user-list',
  imports: [
    CommonModule,
  ],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent implements OnInit {
  users: User[] = [];
  loading: boolean = true;
  error: string = '';

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.userService.getUsers().subscribe({
      next: (data) => {
        this.users = data;
        this.loading = false;
      },
      error: (error) => {
        this.error = 'Failed to load users';
        this.loading = false;
      }
    })
  }
}
