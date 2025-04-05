import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {DatePipe, NgForOf, NgIf} from '@angular/common';
import {NgbNavModule} from '@ng-bootstrap/ng-bootstrap';
import {ActivatedRoute} from '@angular/router';
import {Delegation} from './interfaces/delegation';
import {User} from './interfaces/user';
import {ApiService} from './app/core/services/api.service';
import {ToastComponent} from './app/core/components/toast/toast.component';

@Component({
  selector: 'app-delegations',
  imports: [
    NgIf,
    NgForOf,
    NgbNavModule,
    NgbNavModule,
    DatePipe
  ],
  templateUrl: './delegations.component.html',
  styleUrl: './delegations.component.css'
})
export class DelegationsComponent implements OnInit {
  @ViewChild('carouselInner', { static: false }) carouselInner!: ElementRef;
  delegationId!: number;
  delegation!: Delegation;
  user!: User;
  loading: boolean = true;

  scrollPosition = 0;
  cardWidth = 200; // Szerokość jednego elementu

  scrollNext() {
    const carousel = this.carouselInner.nativeElement;
    this.scrollPosition += this.cardWidth;
    carousel.scrollTo({
      left: this.scrollPosition,
      behavior: 'smooth'
    });
  }

  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute
    ) {}

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
}
