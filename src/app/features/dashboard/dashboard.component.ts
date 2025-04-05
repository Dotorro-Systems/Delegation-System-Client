import {Component, OnInit} from '@angular/core';
import {Delegation} from '../../../interfaces/delegation';
import {NgForOf, NgIf} from '@angular/common';
import {UsersModule} from '../users/users.module';
import {User} from '../../../interfaces/user';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import {ApiService} from '../../core/services/api.service';

@Component({
  selector: 'app-dashboard',
  imports: [
    UsersModule,
    NgIf,
    NgForOf,
    NgbNavModule,
    NgbNavModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  delegations: Delegation[] = [];
  user!: User;
  selectedDelegation!: Delegation;
  loading: boolean = true;
  error: string = '';

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.user = this.apiService.getMe();

    this.apiService.get<Delegation[]>('delegations/')
      .subscribe({
        next: (data) => {
          this.delegations = data.filter(d => d.users.includes(this.user));
          this.loading = false;
          this.selectedDelegation = this.delegations[0];
        },
        error: (error) => {
          this.error = 'Failed to load delegations';
          this.loading = false;
        }
    })
  }
}
