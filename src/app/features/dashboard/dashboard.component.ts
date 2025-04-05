import {Component, OnInit} from '@angular/core';
import {Delegation} from '../../../interfaces/delegation';
import {NgForOf, NgIf} from '@angular/common';
import {UsersModule} from '../users/users.module';
import {User} from '../../../interfaces/user';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import {ApiService} from '../../core/services/api.service';
import {ToastComponent} from '../../core/components/toast/toast.component';

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
  user: User | null = null;
  selectedDelegation: Delegation | null = null;
  loading: boolean = true;

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.apiService.getMe()
      .subscribe({
        next: data => {
          this.user = data;

          if (this.user != null) {
            this.apiService.get<Delegation[]>('delegations/')
              .subscribe({
                next: (data) => {
                  // @ts-ignore
                  this.delegations = data.filter(d => d.users.some(user => user.id === this.user.id));
                  this.loading = false;
                  this.selectedDelegation = this.delegations[0];
                },
                error: (error) => {
                  ToastComponent.showToast("Fail", "Failed to load delegation");
                  this.loading = false;
                }
              })
          }
        }
      })
  }
}
