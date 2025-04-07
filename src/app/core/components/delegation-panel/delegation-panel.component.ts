import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {DatePipe, NgForOf, NgIf} from '@angular/common';
import {NgbNavModule} from '@ng-bootstrap/ng-bootstrap';
import {ActivatedRoute} from '@angular/router';
import {Delegation} from '../../../../interfaces/delegation';
import {User} from '../../../../interfaces/user';
import {ApiService} from '../../services/api.service';
import {ToastComponent} from '../toast/toast.component';
import {FormBuilder, FormGroup, ReactiveFormsModule} from '@angular/forms';

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
  expanseForm: FormGroup;

  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    ) {
    this.noteForm = this.formBuilder.group({
      delegationId: [this.delegationId],  // Możesz przypisać wartości domyślne, jeśli są dostępne
      userId: [this.user?.id],            // Wartość domyślna dla userId, jeśli jest dostępna
      content: [''],                      // Treść notatki
      createdAt: [new Date().toISOString().slice(0, 19)]
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
              endDate: new Date(data.endDate)
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
    const body = {
      delegationId: this.delegationId,
      userId: this.user.id,
      content: this.noteForm.value['content'],
      createdAt: new Date().toISOString().slice(0, 19)
    }

    if (this.noteForm.valid) {
      console.log(this.noteForm.value);
    }

    this.apiService
      .post<string>(`notes/create`, body)
  }
}
