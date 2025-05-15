import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {Delegation} from '../../../interfaces/delegation';
import {ApiService} from '../../core/services/api.service';
import {DelegationsService} from '../delegations/services/delegations.service';
import { User } from '../../../interfaces/user';
import {ToastComponent} from '../../core/components/toast/toast.component';
import {NgbPagination} from '@ng-bootstrap/ng-bootstrap';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-delegation-list',
  imports: [
    CommonModule,
    NgbPagination,
    ReactiveFormsModule
  ],
  templateUrl: './delegation-list.component.html',
  styleUrl: './delegation-list.component.css'
})
export class DelegationListComponent implements OnInit {
  lastInteractedDelegationId: number = -1;
  modalType: string = 'Register';
  delegationForm!: FormGroup;
  lastSortingCondition: string = 'sort-id-asc';
  filterCondition: string = '';

  user!: User;
  allDelegations: Delegation[] = [];
  filteredDelegations: Delegation[] = [];
  displayedDelegations: Delegation[] = [];
  delegationDisplayLimit = 5;

  lastPage: number = 1;

  constructor(
    private apiService: ApiService,
    private delegationsService: DelegationsService,
    private formBuilder: FormBuilder,
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
    });
  }

  ngOnInit(): void {
    this.apiService.getMe()
      .subscribe({
        next: data => {
          this.user = data;

          this.apiService.get<Delegation[]>(`delegations/in-my-department`)
            .subscribe({
              next: (data) => {
                this.allDelegations = data.map(d => this.delegationsService.parseDelegation(d));
                this.setPage(1);
                this.onDelegationsUpdated();
              }
            })
        }
      })
  }

  resetDelegationFormToDefaults()
  {
    const today: Date = new Date();
    const inAWeek = new Date();
    inAWeek.setDate(inAWeek.getDate() + 7);

    this.delegationForm.patchValue({
      title: 'Example Title',
      origin: 'Origin',
      destination: 'Destination',
      startDate: today.toISOString().slice(0, 16),
      endDate: inAWeek.toISOString().slice(0, 16),
    });
  }

  searchOnChange(eventTarget: EventTarget | null): void {
    const target = eventTarget as HTMLInputElement;
    this.filterCondition = target.value;
    this.onDelegationsUpdated();
  }

  updateSortingCondition(eventTarget: EventTarget | null): void {
    const target = eventTarget as HTMLInputElement;
    this.lastSortingCondition = target.value;
    this.onDelegationsUpdated();
  }

  getColumnNames()
  {
    return [
      'ID',
      'Title',
      'Status',
      'Participants',
      'Origin',
      'Destination',
      'Start Date',
      'End Date',
    ]
  }

  getSortingConditionByColumnName(columnName: string)
  {
    return columnName.toLowerCase().replace(' ', '-');
  }

  getSortingCaret(sortingCondition: string) {
    if (this.lastSortingCondition.includes(sortingCondition)) {
      if (this.lastSortingCondition.includes('asc'))
        return 'up';
      else
        return 'down';
    }

    return 'down';
  }

  isColumnActiveInSorting(sortingCondition: string)
  {
    if (this.lastSortingCondition.includes(sortingCondition))
        return 'bg-dark-subtle';

    return '';
  }

  setSortingCondition(sortingCondition: string) {
    if (this.lastSortingCondition.includes(sortingCondition))
    {
      if (this.lastSortingCondition.includes('asc'))
        this.lastSortingCondition = this.lastSortingCondition.replace('asc', 'desc');
      else
        this.lastSortingCondition = this.lastSortingCondition.replace('desc', 'asc');
    }
    else
      this.lastSortingCondition = `${sortingCondition}-asc`;

    this.onDelegationsUpdated();
  }

  sortDelegations() {
    this.allDelegations.sort((a, b) => {
      switch (this.lastSortingCondition) {
        case 'sort-id-asc':
          return a.id > b.id ? 1 : -1
        case 'sort-id-desc':
          return b.id > a.id ? 1 : -1
        case 'sort-title-asc':
          return a.title.localeCompare(b.title)
        case 'sort-title-desc':
          return b.title.localeCompare(a.title)
        case 'sort-start-date-asc':
          return a.startDate > b.startDate ? -1 : 1
        case 'sort-start-date-desc':
          return b.startDate > a.startDate ? -1 : 1
        case 'sort-end-date-asc':
          return a.endDate > b.endDate ? -1 : 1
        case 'sort-end-date-desc':
          return b.endDate > a.endDate ? -1 : 1
        case 'sort-status-asc':
          return a.status > b.status ? -1 : 1
        case 'sort-status-desc':
          return b.status > a.status ? -1 : 1
        case 'sort-participants-asc':
          return a.users.length > b.users.length ? -1 : 1
        case 'sort-participants-desc':
          return b.users.length > a.users.length ? -1 : 1
        case 'sort-origin-asc':
          return a.origin.localeCompare(b.origin)
        case 'sort-origin-desc':
          return b.origin.localeCompare(a.origin)
        case 'sort-destination-asc':
          return a.destination.localeCompare(b.destination)
        case 'sort-destination-desc':
          return b.destination.localeCompare(a.destination)
      }

      return 0;
    });
  }

  filterDelegations() {
    if (this.filterCondition === '') {
      this.filteredDelegations = this.allDelegations;
      return;
    }

    const searches: string[] = this.filterCondition.toLowerCase().split(' ');

    this.filteredDelegations = [];

    const search = searches[0].toLowerCase();

    this.filteredDelegations = this.allDelegations.filter(delegation =>
      delegation.title.toLowerCase().includes(search)
    )

    if (searches.length > 1) {
      for (let i = 1; i < searches.length; i++) {
        const search = searches[i].toLowerCase();
        if (search === '')
          continue;

        this.filteredDelegations = this.filteredDelegations.filter(delegation =>
          delegation.title.toLowerCase().includes(search)
        );
      }
    }
  }

  onDelegationsUpdated(): void {
    this.sortDelegations();
    this.filterDelegations();
    this.refreshPage();
  }

  getPagesCount(): number {
    return Math.ceil(this.filteredDelegations.length / this.delegationDisplayLimit);
  }

  displayLimitSelectChanged(eventTarget: EventTarget | null): void {
    const target = eventTarget as HTMLSelectElement;

    this.setDisplayLimit(Number(target.value));
  }

  setDisplayLimit(limit: number) {
    this.delegationDisplayLimit = limit;
    this.refreshPage()
  }

  setPage(page: number): void {
    if (this.filteredDelegations.length === 0) {
      this.displayedDelegations = [];
      return;
    }

    const leftIndex = (page - 1) * this.delegationDisplayLimit;
    const rightIndex = leftIndex + this.delegationDisplayLimit;

    this.displayedDelegations = this.filteredDelegations.slice(leftIndex, rightIndex);
  }

  refreshPage(): void {
    this.setPage(this.lastPage);
  }

  public disableFormInputs() {
    this.delegationForm.disable();
  }

  public enableFormInputs() {
    this.delegationForm.enable();
  }

  public fillFormWithDelegation() {
    this.apiService
      .get<Delegation>(`delegations/${this.lastInteractedDelegationId}`)
      .subscribe((delegation: Delegation) => {
        if (this.delegationForm)
        {
          const parsedDelegation = this.delegationsService.parseDelegation(delegation);
          this.delegationForm.patchValue({
            ...parsedDelegation,
            startDate: parsedDelegation.startDate.toISOString().slice(0, 16),
            endDate: parsedDelegation.endDate.toISOString().slice(0, 16),
          });
        }
      })
  }

  public delegationModalButton() {
    switch (this.modalType) {
      case 'Register':
        this.createDelegationSubmit();
        break;
      case 'Edit':
        this.putDelegationSubmit();
        break;
      case 'View':
        this.modalType = 'Edit';
        this.enableFormInputs();
        break;
    }
  }

  public createDelegationSubmit() {
    const body = {
      ...this.delegationForm.value,
      departmentId: this.user.department.id
    }

    this.apiService
      .post<Delegation>(`delegations/create`, body)
      .subscribe({
        next: (delegation) => {
          delegation = this.delegationsService.parseDelegation(delegation);
          this.allDelegations.push(delegation);
          this.onDelegationsUpdated();
          ToastComponent.showToast("Create Delegation", `Delegation has been added successfully.`);
        },
        error: (err) => {
          ToastComponent.showToast("Fail!", `${err.error}`);
        }
      });
  }

  public putDelegationSubmit() {
    const body = {
      ...this.delegationForm.value,
      departmentId: this.user.department.id
    }

    this.apiService
      .put<Delegation>(`delegations/${this.lastInteractedDelegationId}`, body)
      .subscribe((delegation: Delegation) => {
        delegation = this.delegationsService.parseDelegation(delegation)
        const index = this.allDelegations.findIndex(g => g.id === this.lastInteractedDelegationId);
        this.allDelegations[index] = delegation;
        this.onDelegationsUpdated();
        ToastComponent.showToast("Edit Delegation", `Delegation has been edited successfully.`);
      })
  }

  public deleteDelegation(delegationId: number): void {
    this.apiService
      .delete<{}>(`delegations/${delegationId}`)
      .subscribe((response: any) => {
        const delegation = this.allDelegations.find(g => delegationId === g.id);
        this.allDelegations = this.allDelegations.filter(delegation => delegationId !== delegation.id);
        this.onDelegationsUpdated();
        ToastComponent.showToast("Delete Delegation", `Delegation has been deleted successfully.`);
      });
  }
}
