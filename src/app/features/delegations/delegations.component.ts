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
  delegations: Delegation[] = [];
  // @ts-ignore
  user: User;
  // @ts-ignore
  selectedDelegation: Delegation;
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
          this.delegationId = this.delegationId - 1;
        });

    this.userService.getUsers().subscribe({
      next: (data) => {
        this.user = data[0];
      }
    })

    this.delegationService.getDelegations().subscribe({
      next: (data) => {
        this.delegations = data.filter(d => d.users.includes(this.user));
        this.loading = false;
        this.selectedDelegation = this.delegations[0];
      },
      error: (error) => {
        this.error = 'Failed to load delegations';
        this.loading = false;
      }
    })
  }
}
