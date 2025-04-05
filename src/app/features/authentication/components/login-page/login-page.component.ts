import { Component } from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgIf} from '@angular/common';
import {ApiService} from '../../../../core/services/api.service';
import {ToastComponent} from '../../../../core/components/toast/toast.component';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login-page',
  imports: [
    FormsModule,
    NgIf,
    ReactiveFormsModule,
    ToastComponent
  ],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent {
  myForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private apiService: ApiService,
              private router: Router) {
    this.myForm = this.formBuilder.group({
      email: [''],
      password: [''],
      staySignedIn: false,
    });
  }

  login(): void {
    const body = {
      email: this.myForm.value['email'],
      password: this.myForm.value['password'],
    }

    this.apiService
      .post<{}>(`users/login`, body, { responseType: "text" })
      .subscribe({
        next: (response) => {
          window.location.href = '/dashboard'
        },
        error: (err) => {
          if (err.status === 401)
            ToastComponent.showToast("Login failed!", `Email and password pair doesn't match`);
        }
      });
  }
}
