import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {DatePipe, NgForOf, NgIf} from '@angular/common';
import {NgbNavModule} from '@ng-bootstrap/ng-bootstrap';
import {ActivatedRoute} from '@angular/router';
import {Delegation} from '../../../interfaces/delegation';
import {User} from '../../../interfaces/user';
import {ApiService} from '../../core/services/api.service';
import {ToastComponent} from '../../core/components/toast/toast.component';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {Note} from '../../../interfaces/note';
import {Expense} from '../../../interfaces/expense';
import {DelegationsService} from '../delegations/services/delegations.service';
import {NotesService} from '../notes/services/notes.service';
import {ExpensesService} from '../expenses/services/expenses.service';

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

  noteForm: FormGroup;
  expenseForm: FormGroup;

  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private delegationsService: DelegationsService,
    private notesService: NotesService,
    private expensesService: ExpensesService,
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
        next: (data: Delegation) => {
          this.delegation = this.delegationsService.parseDelegation(data);
        },
        error: (error) => {
          ToastComponent.showToast("Fail", error.err)
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
          this.delegation.expenses.push(this.expensesService.parseExpense(data));
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
          this.delegation.notes.push(this.notesService.parseNote(data));
        },
        error: (err) => {
          ToastComponent.showToast("Fail!", `${err.error}`);
        }
        });
  }

  getColorByStatus(status: string) {

  }
}
