import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {ToastComponent} from '../../../../core/components/toast/toast.component';
import {ApiService} from '../../../../core/services/api.service';
import {CommonModule} from '@angular/common';
import {Department} from '../../../departments/interfaces/department';
import {DepartmentService} from '../../../departments/services/department.service';

@Component({
  selector: 'app-register-page',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ToastComponent,
  ],
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.css',
})
export class RegisterPageComponent implements OnInit {
  myForm: FormGroup;
  departments!: Department[];

  constructor(private formBuilder: FormBuilder, private apiService: ApiService, private departmentService: DepartmentService) {
    this.myForm = this.formBuilder.group({
      firstName: [''],
      lastName: [''],
      email: [''],
      password: [''],
      phone: [''],
      role: 'Employee',
      agreement: false,
      departmentId: 1,
    });
  }

  ngOnInit() {
    this.departmentService
      .getDepartments()
      .subscribe(departments => {
        this.departments = departments;
    });
  }

  register(): void {
    if (this.myForm.value['agreement'] == false) {
      ToastComponent.showToast("Registration failed!", `Registration failed due to agreement.`);
      return;
    }

    this.apiService
      .post<{}>('users/create', this.myForm.value)
      .subscribe({
        next: (response) => {
          window.location.href = 'dashboard';
        },
        error: (err) => {ToastComponent.showToast("Registration failed!", `${err.error}`);}
      });
  }
}
