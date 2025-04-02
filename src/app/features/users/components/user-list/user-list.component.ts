import {Component, OnInit} from '@angular/core';
import {User} from '../../../../../interfaces/user';
import {CommonModule} from '@angular/common';
import {ApiService} from '../../../../core/services/api.service';

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

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.apiService.get<User[]>('users/')
      .subscribe({
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
