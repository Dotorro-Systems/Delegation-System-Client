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
  report!: {};

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
  ) {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      this.delegationId = id ? +id : NaN;
    });

    this.apiService.get<{}>(`reports/${this.delegationId}`)
      .subscribe({
        next: (data) => {
          this.report = data;
        }
      });
  }

  protected readonly JSON = JSON;
}
