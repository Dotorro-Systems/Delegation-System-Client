import {Component, ElementRef, ViewChild} from '@angular/core';
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
import {Stage} from '../../../interfaces/stage';
import {StagesService} from '../stages/services/stages.service';

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
export class DelegationPanelComponent {
  @ViewChild('carouselInner', { static: false }) carouselInner!: ElementRef;
  delegationId!: number;
  delegation!: Delegation;
  user!: User;
  usersInMyDepartment!: User[];
  selectedWorkLogId!: number;
  selectedExpenseId!: number;
  selectedNoteId!: number;
  selectedStageId!: number;

  noteForm: FormGroup;
  noteEditForm: FormGroup;
  expenseForm: FormGroup;
  expenseEditForm: FormGroup;
  usersForm!: FormGroup;
  workLogForm: FormGroup;
  workLogEditForm: FormGroup;
  delegationForm!: FormGroup;
  stagesForm: FormGroup;

  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private delegationsService: DelegationsService,
    private notesService: NotesService,
    private expensesService: ExpensesService,
    private workLogService: WorkLogsService,
    private stagesService: StagesService,
    ) {

    this.noteForm = this.formBuilder.group({
      content: [''],
    });

    let now = new Date();
    let hourPastNow = new Date();
    hourPastNow.setHours(hourPastNow.getHours() + 1);

    this.workLogForm = this.formBuilder.group({
      startTime: new FormControl(now.toISOString().slice(0, 16)),
      endTime: new FormControl(hourPastNow.toISOString().slice(0, 16)),
    })

    this.stagesForm = this.formBuilder.group({
      type: ['Departure'],
      place: [''],
      description: [''],
      time: new FormControl(now.toISOString().slice(0, 16)),
    })

    this.workLogEditForm = this.formBuilder.group({
      startTime: [''],
      endTime: [''],
    })

    this.expenseForm = this.formBuilder.group({
      description: [''],
      amount: []
    });

    this.expenseEditForm = this.formBuilder.group({
      description: [''],
      amount: []
    });

    this.noteEditForm = this.formBuilder.group({
      content: [''],
    })

    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      this.delegationId = id ? +id : NaN;
    });

    this.apiService.getMe()
      .subscribe({
        next: (data) => {
          this.user = data;
        }
      });

    this.apiService.get<Delegation>(`delegations/${this.delegationId}`)
      .subscribe({
        next: (data: Delegation) => {
          this.delegation = this.delegationsService.parseDelegation(data);

          this.delegationForm = this.formBuilder.group({
            title: this.delegation.title,
            origin: this.delegation.origin,
            destination: this.delegation.destination,
            startDate: new FormControl(this.delegation.startDate.toISOString().slice(0, 16)),
            endDate: new FormControl(this.delegation.endDate.toISOString().slice(0, 16)),
          });

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

  getSortedStage(): Stage[] {
    return this.delegation.stages.sort((a, b) => a.time.getTime() - b.time.getTime());
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

  selectExpenseForEdit(expenseId: number) {
    this.expenseEditForm.reset();
    this.selectedExpenseId = expenseId;

    const selectedExpense = this.delegation.expenses.find(log => log.id === expenseId);
    if (selectedExpense) {
      this.expenseEditForm.patchValue({
        description: selectedExpense.description,
        amount: selectedExpense.amount
      });
    }
  }

  selectNoteForEdit(noteId: number) {
    this.noteEditForm.reset();
    this.selectedNoteId = noteId;

    const selectedNote = this.delegation.notes.find(log => log.id === noteId);
    if (selectedNote) {
      this.noteEditForm.patchValue({
        content: selectedNote.content,
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

  editExpense() {
    const originalExpense = this.delegation.expenses.find(e => e.id === this.selectedExpenseId);

    let body = {
      ...this.expenseEditForm.value,
      delegationId: this.delegationId,
      userId: this.user.id,
      createdAt: originalExpense?.createdAt
    };

    this.apiService
      .put<Expense>(`expenses/${this.selectedExpenseId}`, body)
      .subscribe({
        next: (data) => {
          ToastComponent.showToast("Success!", "Expense has been edited successfully!");
          const index = this.delegation.expenses.findIndex(expense => expense.id === this.selectedExpenseId);
          if (index !== -1) {
            this.delegation.expenses[index] = this.expensesService.parseExpense(data);
          }
        },
        error: (err) => {
          ToastComponent.showToast("Fail!", `${err.error}`);
        }
      });
  }

  editNote() {
    const originalNote = this.delegation.notes.find(e => e.id === this.selectedNoteId);

    let body = {
      ...this.noteEditForm.value,
      delegationId: this.delegationId,
      userId: this.user.id,
      createdAt: originalNote?.createdAt
    };

    this.apiService
      .put<Expense>(`notes/${this.selectedNoteId}`, body)
      .subscribe({
        next: (data) => {
          ToastComponent.showToast("Success!", "Note has been edited successfully!");
          const index = this.delegation.notes.findIndex(note => note.id === this.selectedNoteId);
          if (index !== -1) {
            this.delegation.notes[index] = this.notesService.parseNote(data);
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

  deleteExpense(id: number) {
    this.apiService.delete<{}>(`expenses/${id}`, )
      .subscribe({
        next: () => {
          this.delegation.expenses = this.delegation.expenses.filter(expense => expense.id !== id);
        }
      });
  }

  editDelegation() {
    const body = {
      ...this.delegationForm.value,
      departmentId: this.delegation.department.id
    }

    this.apiService.put<Delegation>(`delegations/${this.delegation.id}`, body)
      .subscribe({
        next: (data: Delegation) => {
          this.delegation = this.delegationsService.parseDelegation(data);
        }
      });
  }

  addStage() {
    const body = {
      ...this.stagesForm.value,
      delegationId: this.delegation.id,
    }

    this.apiService.post<Stage>(`stages/create`, body)
      .subscribe({
        next: (data: Stage) => {
          this.delegation.stages.push(this.stagesService.parseStage(data));
        }
      });
  }

  deleteStage(id: number) {
    this.apiService.delete<{}>(`stages/${id}`)
      .subscribe({
        next: () => {
          this.delegation.stages = this.delegation.stages.filter(stage => stage.id !== id);
        }
      });
  }

  selectStageForEdit(id: number) {
    this.selectedStageId = id;

    const stage = this.delegation.stages.filter(stage => stage.id === id)[0];

    // @ts-ignore
    const timeIsoDateString = new Date(stage?.time - new Date().getTimezoneOffset() * 60000).toISOString().slice(0, 16)

    this.stagesForm.patchValue({
      ...stage,
      time: timeIsoDateString
    })
  }

  editStage() {
    const body = {
      ...this.stagesForm.value,
      delegationId: this.delegation.id
    }

    this.apiService.put<Stage>(`stages/${this.selectedStageId}`, body)
      .subscribe({
        next: (data: Stage) => {
          ToastComponent.showToast("Success!", "Stage has been edited successfully!");
          const index = this.delegation.stages.findIndex(stage => stage.id === this.selectedStageId);
          if (index !== -1) {
            this.delegation.stages[index] = this.stagesService.parseStage(data);
          }
        },
        error: (err) => {
          ToastComponent.showToast("Fail!", `${err.error}`);
        }
      });
  }
}
