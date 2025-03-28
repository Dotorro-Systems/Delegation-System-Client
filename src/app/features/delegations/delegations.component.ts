import {Component, OnInit} from '@angular/core';
import {Delegation} from '../delegations/interfaces/delegation';
import {NgForOf, NgIf} from '@angular/common';
import {DelegationService} from '../delegations/services/delegation.service';
import {DelegationsModule} from '../delegations/delegations.module';
import {UsersModule} from '../users/users.module';
import {User} from '../users/interfaces/user';
import {UserService} from '../users/services/user.service';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-delegations',
  imports: [
    DelegationsModule,
    UsersModule,
    NgIf,
    NgForOf,
    NgbNavModule,
    NgbNavModule
  ],
  templateUrl: './delegations.component.html',
  styleUrl: './delegations.component.css'
})
export class DelegationsComponent implements OnInit {
  delegationId!: number;
  delegation!: Delegation;
  user!: User;
  loading: boolean = true;
  error: string = '';

  constructor(
    private delegationService: DelegationService,
    private userService: UserService,
    private route: ActivatedRoute
    ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
          const id = params.get('id');
          this.delegationId = id ? +id : NaN;
        });

    this.userService.getUsers().subscribe({
      next: (data) => {
        this.user = data[0];
      }
    })

    this.delegationService.getById(this.delegationId).subscribe({
      next: (data) => {
        this.delegation = data;
        console.log('Delegation:', this.delegation);
        this.loading = false;
      },
      error: (error) => {
        this.error = 'Failed to load delegation';
        this.loading = false;
      }
    })
  }
}
