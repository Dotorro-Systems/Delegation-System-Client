import {Component, OnInit} from '@angular/core';
import {NgForOf, NgIf} from '@angular/common';
import {NgbPagination} from '@ng-bootstrap/ng-bootstrap';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {User} from '../../../interfaces/user';
import {ApiService} from '../../core/services/api.service';
import {ToastComponent} from '../../core/components/toast/toast.component';
import {Department} from '../../../interfaces/department';

@Component({
  selector: 'app-departments-list',
  imports: [
    NgForOf,
    NgIf,
    NgbPagination,
    ReactiveFormsModule
  ],
  templateUrl: './departments-list.component.html',
  styleUrl: './departments-list.component.css'
})
export class DepartmentsListComponent implements OnInit {
  lastInteractedDepartmentId: number = -1;
  modalType: string = 'Register';
  departmentForm!: FormGroup;
  lastSortingCondition: string = 'sort-id-asc';
  filterCondition: string = '';

  user!: User;
  allDepartments: Department[] = [];
  filteredDepartments: Department[] = [];
  displayedDepartments: Department[] = [];
  DepartmentDisplayLimit = 5;

  lastPage: number = 1;

  constructor(
    private apiService: ApiService,
    private formBuilder: FormBuilder,
  ) {
    this.departmentForm = this.formBuilder.group({
      name: ['Example Name'],
    });
  }

  ngOnInit(): void {
    this.apiService.getMe()
      .subscribe({
        next: data => {
          this.user = data;

          this.apiService.get<Department[]>(`departments/`)
            .subscribe({
              next: (data) => {
                this.allDepartments = data;
                this.setPage(1);
                this.onDepartmentsUpdated();
              }
            })
        }
      })
  }

  resetDepartmentFormToDefaults()
  {
    this.departmentForm.patchValue({
      name: 'Example Name',
    });
  }

  searchOnChange(eventTarget: EventTarget | null): void {
    const target = eventTarget as HTMLInputElement;
    this.filterCondition = target.value;
    this.onDepartmentsUpdated();
  }

  updateSortingCondition(eventTarget: EventTarget | null): void {
    const target = eventTarget as HTMLInputElement;
    this.lastSortingCondition = target.value;
    this.onDepartmentsUpdated();
  }

  getColumnNames()
  {
    return [
      'ID',
      'Name',
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

    this.onDepartmentsUpdated();
  }

  sortDepartments() {
    this.allDepartments.sort((a, b) => {
      switch (this.lastSortingCondition) {
        case 'sort-id-asc':
          return a.id > b.id ? 1 : -1
        case 'sort-id-desc':
          return b.id > a.id ? 1 : -1
        case 'sort-name-asc':
          return a.name.localeCompare(b.name)
        case 'sort-name-desc':
          return b.name.localeCompare(a.name)
      }

      return 0;
    });
  }

  filterDepartments() {
    if (this.filterCondition === '') {
      this.filteredDepartments = this.allDepartments;
      return;
    }

    const searches: string[] = this.filterCondition.toLowerCase().split(' ');

    this.filteredDepartments = [];

    const search = searches[0].toLowerCase();

    this.filteredDepartments = this.allDepartments.filter(Department =>
      Department.name.toLowerCase().includes(search)
    )

    if (searches.length > 1) {
      for (let i = 1; i < searches.length; i++) {
        const search = searches[i].toLowerCase();
        if (search === '')
          continue;

        this.filteredDepartments = this.filteredDepartments.filter(Department =>
          Department.name.toLowerCase().includes(search)
        );
      }
    }
  }

  onDepartmentsUpdated(): void {
    this.sortDepartments();
    this.filterDepartments();
    this.refreshPage();
  }

  getPagesCount(): number {
    return Math.ceil(this.filteredDepartments.length / this.DepartmentDisplayLimit);
  }

  displayLimitSelectChanged(eventTarget: EventTarget | null): void {
    const target = eventTarget as HTMLSelectElement;

    this.setDisplayLimit(Number(target.value));
  }

  setDisplayLimit(limit: number) {
    this.DepartmentDisplayLimit = limit;
    this.refreshPage()
  }

  setPage(page: number): void {
    if (this.filteredDepartments.length === 0) {
      this.displayedDepartments = [];
      return;
    }

    const leftIndex = (page - 1) * this.DepartmentDisplayLimit;
    const rightIndex = leftIndex + this.DepartmentDisplayLimit;

    this.displayedDepartments = this.filteredDepartments.slice(leftIndex, rightIndex);
  }

  refreshPage(): void {
    this.setPage(this.lastPage);
  }

  public disableFormInputs() {
    this.departmentForm.disable();
  }

  public enableFormInputs() {
    this.departmentForm.enable();
  }

  public fillFormWithDepartment() {
    this.apiService
      .get<Department>(`departments/${this.lastInteractedDepartmentId}`)
      .subscribe((department: Department) => {
        if (this.departmentForm)
        {
          this.departmentForm.patchValue({
            ...(department),
          });
        }
      })
  }

  public departmentModalButton() {
    switch (this.modalType) {
      case 'Create':
        this.createDepartmentSubmit();
        break;
      case 'Edit':
        this.putDepartmentSubmit();
        break;
    }
  }

  public createDepartmentSubmit() {
    const body = {
      ...this.departmentForm.value,
      departmentId: this.user.department.id
    }

    this.apiService
      .post<Department>(`departments/create`, body)
      .subscribe({
        next: (department) => {
          this.allDepartments.push(department);
          this.onDepartmentsUpdated();
          ToastComponent.showToast("Create Department", `Department has been added successfully.`);
        },
        error: (err) => {
          ToastComponent.showToast("Fail!", `${err.error}`);
        }
      });
  }

  public putDepartmentSubmit() {
    const body = {
      ...this.departmentForm.value,
      departmentId: this.user.department.id
    }

    this.apiService
      .put<Department>(`departments/${this.lastInteractedDepartmentId}`, body)
      .subscribe((department: Department) => {
        const index = this.allDepartments.findIndex(g => g.id === this.lastInteractedDepartmentId);
        this.allDepartments[index] = department;
        this.onDepartmentsUpdated();
        ToastComponent.showToast("Edit Department", `Department has been edited successfully.`);
      })
  }

  public deleteDepartment(DepartmentId: number): void {
    this.apiService
      .delete<{}>(`departments/${DepartmentId}`)
      .subscribe((response: any) => {
        const Department = this.allDepartments.find(g => DepartmentId === g.id);
        this.allDepartments = this.allDepartments.filter(Department => DepartmentId !== Department.id);
        this.onDepartmentsUpdated();
        ToastComponent.showToast("Delete Department", `Department has been deleted successfully.`);
      });
  }
}
