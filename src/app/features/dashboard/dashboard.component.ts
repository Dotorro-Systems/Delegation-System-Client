import {Component, OnInit} from '@angular/core';
import {Delegation} from '../../../interfaces/delegation';
import {NgForOf, NgIf} from '@angular/common';
import {UsersModule} from '../users/users.module';
import {User} from '../../../interfaces/user';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import {ApiService} from '../../core/services/api.service';
import {FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ToastComponent} from '../../core/components/toast/toast.component';

@Component({
  selector: 'app-dashboard',
  imports: [
    UsersModule,
    NgIf,
    NgForOf,
    NgbNavModule,
    NgbNavModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  delegationForm: FormGroup;
  delegations: Delegation[] = [];
  user!: User;
  selectedDelegation!: Delegation;
  loading: boolean = true;
  error: string = '';

  constructor(private apiService: ApiService,
              private formBuilder: FormBuilder) {
    const tomorrow: Date = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const nextMonth = new Date();
    nextMonth.setMonth(tomorrow.getMonth() + 1);

    this.delegationForm = this.formBuilder.group({
      title: ['Example Title'],
      origin: ['Origin'],
      destination: ['Destination'],
      startDate: new FormControl(tomorrow.toISOString().slice(0, 16)),
      endDate: new FormControl(nextMonth.toISOString().slice(0, 16)),
    });
  }

  ngOnInit() {
    this.apiService.getMe()
      .subscribe({
        next: data => {
          this.user = data;

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
      })
  }

  createDelegation(): void {
    let body = {
      ...this.delegationForm.value,
      status: 'Planned',
    };

    this.apiService
      .post<Delegation>(`delegations/create`, body)
      .subscribe({
        next: (data) => {
          this.apiService.post<{}>(`delegationDepartments/create`, { departmentId: this.user.department.id, delegationId: data.id })
            .subscribe({
              next: () => {
                ToastComponent.showToast("Success!", "Delegation has been created successfully!");
                this.delegations.push(data);
              },
              error: (err) => {
                ToastComponent.showToast("Fail!", `${err.error}`);
              }
            })
        },
        error: (err) => {
          ToastComponent.showToast("Fail!", `${err.error}`);
        }
      });
  }
}
