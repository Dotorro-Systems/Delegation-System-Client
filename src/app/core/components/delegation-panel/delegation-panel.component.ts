import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {DatePipe, NgForOf, NgIf} from '@angular/common';
import {NgbNavModule} from '@ng-bootstrap/ng-bootstrap';
import {ActivatedRoute} from '@angular/router';
import {Delegation} from '../../../../interfaces/delegation';
import {User} from '../../../../interfaces/user';
import {ApiService} from '../../services/api.service';
import {ToastComponent} from '../toast/toast.component';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {Note} from '../../../../interfaces/note';
import {Expense} from '../../../../interfaces/expense';

@Component({
  selector: 'app-delegations',
  imports: [
    NgIf,
    NgForOf,
    NgbNavModule,
    NgbNavModule,
    DatePipe,
    ReactiveFormsModule
  ],
  templateUrl: './delegation-panel.component.html',
  styleUrl: './delegation-panel.component.css'
})
export class DelegationPanelComponent implements OnInit {
  @ViewChild('carouselInner', { static: false }) carouselInner!: ElementRef;
  delegationId!: number;
  delegation!: Delegation;
  user!: User;
  loading: boolean = true;

  noteForm: FormGroup;
  expenseForm: FormGroup;

  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    ) {
    this.noteForm = this.formBuilder.group({
      content: [''],
    })
    this.expenseForm = this.formBuilder.group({
      description: [''],
      amount: []
    })
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
          const id = params.get('id');
          this.delegationId = id ? +id : NaN;
        });

    this.apiService.getMe()
      .subscribe({
        next: (data) => {
          this.user = data;
        }
    })

    this.apiService.get<Delegation>(`delegations/${this.delegationId}`)
      .subscribe({
        next: (data) => {
          if (data != null) {
            this.delegation = {
              ...data
            };
          }
          else {
            window.location.href = '/dashboard';
          }
          this.loading = false;
        },
        error: (error) => {
          ToastComponent.showToast("Fail", "Failed to load this delegation");
          this.loading = false;
        }
    })
  }

  submitExpense(): void {
    let body = {
      ...this.expenseForm.value,
      delegationId: this.delegationId,
      userId: this.user.id,
      createdAt: new Date()
    }

    this.apiService
      .post<Expense>(`expense/create`, body)
      .subscribe({
        next: (data) => {
          ToastComponent.showToast("Success!", "Expense has been added successfully!");
          this.delegation.expenses.push(data);
        },
        error: (err) => {
          ToastComponent.showToast("Fail!", `${err.error}`);
        }
      });
  }

  submitNote(): void {
    let body = {
      ...this.noteForm.value,
      delegationId: this.delegationId,
      userId: this.user.id,
      createdAt: new Date()
    }

    this.apiService
      .post<Note>(`notes/create`, body)
      .subscribe({
        next: (data) => {
          ToastComponent.showToast("Success!", "Note has been added successfully!");
          this.delegation.notes.push(data);
        },
        error: (err) => {
          ToastComponent.showToast("Fail!", `${err.error}`);
        }
        });
  }

  transformDate(date: any): string {
    return new Date(date).toDateString();
  }
}
