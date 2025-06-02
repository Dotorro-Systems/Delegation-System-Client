import { Component } from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {User} from '../../../interfaces/user';
import {ApiService} from '../../core/services/api.service';

@Component({
  selector: 'app-admin-dashboard',
  imports: [
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent {
  user!: User;

  constructor(
    private apiService: ApiService,
    private formBuilder: FormBuilder,
  ) {
    this.apiService.getMe()
      .subscribe({
        next: data => {
          this.user = data;
        }
      })
  }
}
