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
  isLoading: boolean = false;

  constructor(private formBuilder: FormBuilder,
              private apiService: ApiService,) {
    this.myForm = this.formBuilder.group({
      email: [''],
      password: [''],
      staySignedIn: false,
    });
  }

  login(): void {
    if (this.isLoading) return;

    const body = {
      email: this.myForm.value['email'],
      password: this.myForm.value['password'],
    }

    this.apiService
      .post<string>(`users/login`, body, { responseType: "text" })
      .subscribe({
        next: (response: string) => {
          this.isLoading = true;
          ToastComponent.showToast("Login success!", response);

          setTimeout(() => {
            window.location.href = '/dashboard'
          }, 1000);
        },
        error: (err) => {
          if (err.status === 401)
            ToastComponent.showToast("Login failed!", `Email and password pair doesn't match`);

          this.isLoading = false;
        }
      });
  }
}
