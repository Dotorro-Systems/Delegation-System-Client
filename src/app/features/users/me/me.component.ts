import { Component } from '@angular/core';
import {ApiService} from '../../../core/services/api.service';
import {User} from '../../../../interfaces/user';

@Component({
  selector: 'app-me',
  imports: [],
  templateUrl: './me.component.html',
  styleUrl: './me.component.css'
})
export class MeComponent {
  me!: User;

  constructor(private apiService: ApiService) {
    this.apiService.getMe()
      .subscribe({
        next: (data: User) => {
          this.me = data;
        }
      })
  }
}
