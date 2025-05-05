import {Component, OnInit} from '@angular/core';
import {Delegation} from '../../../interfaces/delegation';
import {NgForOf, NgIf} from '@angular/common';
import {UsersModule} from '../users/users.module';
import {User} from '../../../interfaces/user';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import {ApiService} from '../../core/services/api.service';
import {FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ToastComponent} from '../../core/components/toast/toast.component';
import {DelegationsService} from '../delegations/services/delegations.service';
import {NotesService} from '../notes/services/notes.service';
import {ExpensesService} from '../expenses/services/expenses.service';
import {FeaturesModule} from '../features.module';

@Component({
  selector: 'app-dashboard',
  imports: [
    NgIf,
    NgForOf,
    NgbNavModule,
    NgbNavModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})

export class DashboardComponent implements OnInit {
  delegationForm: FormGroup;
  delegations: Delegation[] = [];
  user!: User;
  selectedDelegation!: Delegation;
  loading: boolean = true;
  error: string = '';

  constructor(private apiService: ApiService,
              private formBuilder: FormBuilder,
              private delegationsService: DelegationsService,
  ) {
    const today: Date = new Date();
    const inAWeek = new Date();
    inAWeek.setDate(inAWeek.getDate() + 7);

    this.delegationForm = this.formBuilder.group({
      title: ['Example Title'],
      origin: ['Origin'],
      destination: ['Destination'],
      startDate: new FormControl(today.toISOString().slice(0, 16)),
      endDate: new FormControl(inAWeek.toISOString().slice(0, 16)),
      addSelf: false,
    });
  }

  ngOnInit() {
    this.apiService.getMe()
      .subscribe({
        next: data => {
          this.user = data;

          this.apiService.get<Delegation[]>(`delegations/in-my-department`)
            .subscribe({
              next: (data) => {
                this.delegations = data.map(d => this.delegationsService.parseDelegation(d));
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
      departmentId: this.user.department.id
    };

    this.apiService
      .post<Delegation>(`delegations/create`, body)
        .subscribe({
          next: (data) => {
            let newDelegation = this.delegationsService.parseDelegation(data);

            if (this.delegationForm.value['addSelf'])
            {
              this.apiService.post<{}>(`delegations/add-user`, { delegationId: data.id, userId: this.user.id })
                .subscribe({
                  next: () => {

                  },
                  error: (err) => {
                    ToastComponent.showToast("Fail!", `${err.error}`);
                  }
                })

              newDelegation.users.push(this.user);
            }

            ToastComponent.showToast("Success!", "Delegation has been created successfully!");
            this.delegations.push(newDelegation);
          },
          error: (err) => {
            ToastComponent.showToast("Fail!", `${err.error}`);
          }
        });
  }
}
