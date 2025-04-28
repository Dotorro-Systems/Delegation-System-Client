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
import {WorkLog} from '../../../interfaces/work-log';
import {DelegationsService} from '../delegations/services/delegations.service';
import {NotesService} from '../notes/services/notes.service';
import {ExpensesService} from '../expenses/services/expenses.service';
import {WorkLogsService} from '../work-logs/services/work-logs.service';

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
  usersInMyDepartment!: User[];
  selectedWorkLogId!: number;

  noteForm: FormGroup;
  expenseForm: FormGroup;
  usersForm!: FormGroup;
  workLogForm: FormGroup;
  workLogEditForm: FormGroup;

  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private delegationsService: DelegationsService,
    private notesService: NotesService,
    private expensesService: ExpensesService,
    private workLogService: WorkLogsService,
    ) {

    this.noteForm = this.formBuilder.group({
      content: [''],
    });

    this.workLogForm = this.formBuilder.group({
      startTime: [],
      endTime: [],
    })

    this.workLogEditForm = this.formBuilder.group({
      startTime: [''],
      endTime: [''],
    })

    this.expenseForm = this.formBuilder.group({
      description: [''],
      amount: []
    });

    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      this.delegationId = id ? +id : NaN;
    });

    this.apiService.get<Delegation>(`delegations/${this.delegationId}`)
      .subscribe({
        next: (data: Delegation) => {
          this.delegation = this.delegationsService.parseDelegation(data);

          this.apiService.get<User[]>(`users/in-my-department`)
            .subscribe({
              next: (data: User[]) => {
                this.usersInMyDepartment = data;

                this.usersForm = this.formBuilder.group({
                  ...this.usersInMyDepartment.reduce<Record<string, FormControl>>((acc, option) => {
                    const participatesInDelegation = this.delegation.users.filter(u => u.id.toString() == option.id.toString()).length == 1;
                    acc[option.id.toString()] = new FormControl(participatesInDelegation);
                    return acc;
                  }, {})
                });
              },
              error: (err) => {

              }
            });
        },
        error: (error) => {
          ToastComponent.showToast("Fail", error.err)
        }
      });
  }

  ngOnInit() {
    this.apiService.getMe()
      .subscribe({
        next: (data) => {
          this.user = data;
        }
    });
  }

  selectWorkLogForEdit(workLogId: number) {
    this.workLogEditForm.reset();
    this.selectedWorkLogId = workLogId;

    const selectedWorkLog = this.delegation.workLogs.find(log => log.id === workLogId);
    // @ts-ignore
    const startTimeIsoDateString = new Date(selectedWorkLog?.startTime - new Date().getTimezoneOffset() * 60000).toISOString().slice(0, 16)
    // @ts-ignore
    const endTimeIsoDateString = new Date(selectedWorkLog?.endTime - new Date().getTimezoneOffset() * 60000).toISOString().slice(0, 16)
    if (selectedWorkLog) {
      this.workLogEditForm.patchValue({
        startTime: startTimeIsoDateString,
        endTime: endTimeIsoDateString
      });
    }
  }

  submitExpense(): void {
    let body = {
      ...this.expenseForm.value,
      delegationId: this.delegation.id,
      userId: this.user.id,
      createdAt: new Date()
    }

    this.apiService
      .post<Expense>(`expenses/create`, body)
      .subscribe({
        next: (data) => {
          ToastComponent.showToast("Success!", "Expense has been added successfully!");
          this.delegation.expenses.push(this.expensesService.parseExpense(data));
        },
        error: (err) => {
          ToastComponent.showToast("Fail!", `${err.error}`);
          console.log(err);
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

  submitWorkLog(): void {
    let body = {
      ...this.workLogForm.value,
      delegationId: this.delegationId,
      userId: this.user.id,
    }

    this.apiService
      .post<WorkLog>(`workLogs/create`, body)
      .subscribe({
        next: (data) => {
          ToastComponent.showToast("Success!", "Work Log has been added successfully!");
          this.delegation.workLogs.push(this.workLogService.parseWorkLog(data));
        },
        error: (err) => {
          ToastComponent.showToast("Fail!", `${err.error}`);
        }
      });
  }

  editWorkLog() {
    let body = {
      ...this.workLogEditForm.value,
      delegationId: this.delegationId,
      userId: this.user.id,
    }

    this.apiService
      .put<WorkLog>(`workLogs/${this.selectedWorkLogId}`, body)
      .subscribe({
        next: (data) => {
          ToastComponent.showToast("Success!", "Work Log has been edited successfully!");
          const index = this.delegation.workLogs.findIndex(workLog => workLog.id === this.selectedWorkLogId);
          if (index !== -1) {
            this.delegation.workLogs[index] = this.workLogService.parseWorkLog(data);
          }
        },
        error: (err) => {
          ToastComponent.showToast("Fail!", `${err.error}`);
        }
      });
  }

  getTotalDelegationCost(): number {
    return this.delegation.expenses
      .reduce(function (a, b) {
        return a + b.amount;
      }, 0);
  }

  getColorByStatus(status: string) {
    if (status == 'Planned') return 'bg-warning';
    if (status == 'Active') return 'bg-success';
    if (status == 'Finished') return 'bg-danger';

    return 'bg-danger';
  }

  updateUsers() {
    for (const user of this.usersInMyDepartment) {
      if (this.usersForm.value[user.id.toString()] == true && this.delegation.users.filter(u => u.id.toString() === user.id.toString()).length == 0) {
        this.apiService.post<User>(`delegations/add-user`, { delegationId: this.delegation.id, userId: user.id })
          .subscribe({
            next: (data: User) => {
              this.delegation.users.push(data);
            }
        })
      }

      if (this.usersForm.value[user.id.toString()] == false && this.delegation.users.filter(u => u.id.toString() === user.id.toString()).length > 0)
      {
        this.apiService.delete<{}>(`delegations/${this.delegation.id}/delete-user/${user.id}`, { responseType: 'text' })
          .subscribe({
            next: () => {
              this.delegation.users = this.delegation.users.filter(u => u.id !== user.id);
            }
          })
      }
    }
  }

  deleteNote(id: number) {
    this.apiService.delete<{}>(`notes/${id}`, )
      .subscribe({
          next: () => {
            this.delegation.notes = this.delegation.notes.filter(note => note.id !== id);
          }
      });
  }

  deleteWorkLog(id: number) {
    this.apiService.delete<{}>(`workLogs/${id}`, )
      .subscribe({
        next: () => {
          this.delegation.workLogs = this.delegation.workLogs.filter(workLog => workLog.id !== id);
        }
      });
  }
}
