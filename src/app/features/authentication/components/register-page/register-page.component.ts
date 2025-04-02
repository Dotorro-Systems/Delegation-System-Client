import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {ToastComponent} from '../../../../core/components/toast/toast.component';
import {ApiService} from '../../../../core/services/api.service';
import {CommonModule} from '@angular/common';
import {Department} from '../../../../../interfaces/department';
import {Router} from '@angular/router';

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

  constructor(private formBuilder: FormBuilder,
              private apiService: ApiService,
              private router: Router) {
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
    this.apiService.get<Department[]>('departments/')
      .subscribe(departments => {
        this.departments = departments;
    });
  }

  register(): void {
    if (this.myForm.value['agreement'] == false) {
      ToastComponent.showToast("Registration failed!", `In order to register check the agreement`);
      return;
    }

    this.apiService
      .post<{}>('users/register', this.myForm.value)
      .subscribe({
        next: (response) => {
          this.router.navigate(['/login']);
        },
        error: (err) => {ToastComponent.showToast("Registration failed!", `${err.error}`);}
      });
  }
}
