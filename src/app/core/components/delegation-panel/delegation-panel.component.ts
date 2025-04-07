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
  notes!: Note[];

  noteForm: FormGroup;
  expanseForm: FormGroup;

  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    ) {
    this.noteForm = this.formBuilder.group({
      content: ['Enter note...'],
    })
    this.expanseForm = this.formBuilder.group({
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
              ...data,
              startDate: new Date(data.startDate),
              endDate: new Date(data.endDate),
              notes: data.notes.map(note => ({
                ...note,
                createdAt: new Date(note.createdAt)
              }))
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

  submitNote(): void {
    let body = {
      ...this.noteForm.value,
      delegationId: this.delegationId,
      userId: this.user.id,
      createdAt: new Date()
    }

    if (this.noteForm.valid) {
      console.log(this.noteForm.value);
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
}
