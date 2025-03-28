import { Component } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {ToastComponent} from '../../../../core/components/toast/toast.component';
import {ApiService} from '../../../../core/services/api.service';
import {AuthenticationModule} from '../../authentication.module';

@Component({
  selector: 'app-register-page',
  imports: [
    ReactiveFormsModule,
    AuthenticationModule,
  ],
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.css',
})
export class RegisterPageComponent {
  myForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private apiService: ApiService) {
    this.myForm = this.formBuilder.group({
      firstName: [''],
      lastName: [''],
      email: [''],
      password: [''],
      phone: [''],
      role: [''],
      agreement: false,
    });
  }

  register(): void {
    if (this.myForm.value['agreement'] == false) {
      ToastComponent.showToast("Registration failed!", `Registration failed due to agreement.`);
      return;
    }

    this.apiService
      .post<{}>('users/create', this.myForm.value)
      .subscribe(() => {
        window.location.href = '/dashboard';
      });
  }
}
