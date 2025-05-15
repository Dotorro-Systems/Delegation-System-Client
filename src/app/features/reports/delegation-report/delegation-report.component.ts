import { Component } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ApiService} from '../../../core/services/api.service';

@Component({
  selector: 'app-delegation-report',
  imports: [],
  templateUrl: './delegation-report.component.html',
  styleUrl: './delegation-report.component.css'
})
export class DelegationReportComponent {
  delegationId!: number;
  returnUrl!: string;

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
  ) {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      this.delegationId = id ? +id : NaN;
    });

    const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl');

    if (returnUrl === null)
    {
      window.location.href = 'dashboard';
      return;
    }

    this.returnUrl = returnUrl;

    this.apiService.get<Blob>(`reports/pdf/${this.delegationId}`, { responseType: 'blob' })
      .subscribe({
        next: (data) => {
          const blob = new Blob([data], { type: 'application/pdf' });

          const url = window.URL.createObjectURL(blob);
          window.open(url);
          window.location.href = this.returnUrl;
        }
      });
  }
}
