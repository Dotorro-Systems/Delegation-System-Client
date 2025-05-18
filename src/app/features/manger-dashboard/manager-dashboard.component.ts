import { Component } from '@angular/core';
import {ApiService} from '../../core/services/api.service';
import {User} from '../../../interfaces/user';
import {FormBuilder, FormGroup, ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-manager-dashboard',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './manager-dashboard.component.html',
  styleUrl: './manager-dashboard.component.css'
})
export class ManagerDashboardComponent {
  user!: User;
  monthlyReportForm: FormGroup;
  yearlyReportForm: FormGroup;

  constructor(
    private apiService: ApiService,
    private formBuilder: FormBuilder,
  ) {
    const today = new Date();

    this.monthlyReportForm = formBuilder.group({
      year: [today.getFullYear()],
      month: [today.getMonth()],
    })

    this.yearlyReportForm = formBuilder.group({
      year: [today.getFullYear()],
    })

    this.apiService.getMe()
      .subscribe({
        next: data => {
          this.user = data;
        }
      })
  }

  generateMonthlyReport() {
    const year = this.monthlyReportForm.value['year'];
    const month = this.monthlyReportForm.value['month'];

    this.apiService.get<Blob>(`reports/pdf/${this.user.department.id}/${year}/${month}`, { responseType: 'blob' })
      .subscribe({
        next: (data) => {
          const blob = new Blob([data], { type: 'application/pdf' });

          const url = window.URL.createObjectURL(blob);
          window.open(url);
        }
      });
  }

  generateYearlyReport() {
    const year = this.monthlyReportForm.value['year'];

    this.apiService.get<Blob>(`reports/pdf/${this.user.department.id}/${year}`, { responseType: 'blob' })
      .subscribe({
        next: (data) => {
          const blob = new Blob([data], { type: 'application/pdf' });

          const url = window.URL.createObjectURL(blob);
          window.open(url);
        }
      });
  }
}
