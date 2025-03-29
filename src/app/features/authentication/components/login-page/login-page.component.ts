import { Component } from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgIf} from '@angular/common';
import {ApiService} from '../../../../core/services/api.service';
import {ToastComponent} from '../../../../core/components/toast/toast.component';
import {UserService} from '../../../users/services/user.service';
import {User} from '../../../users/interfaces/user';

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

  constructor(private formBuilder: FormBuilder, private apiService: ApiService, private userService: UserService) {
    this.myForm = this.formBuilder.group({
      email: [''],
      password: [''],
      staySignedIn: false,
    });
  }

  login(): void {
    let user!: User;
    this.userService
      .getUsers()
      .subscribe(users => {
        const filteredUsers = users.filter(u => u.email == this.myForm.value['email']);
        if (filteredUsers.length > 0) {
          user = filteredUsers[0];
        }
        else
        {
          ToastComponent.showToast("Login failed!", `There is no user with this email`);
          return;
        }

        this.apiService
          .post<{}>(`users/${user.id}/authenticate`, this.myForm.value['password'])
          .subscribe({
            next: (response) => {
              if (response == true)
                window.location.href = 'dashboard';
              else
                ToastComponent.showToast("Login failed!", `Password and email pair is incorrect.`);
            },
            error: (err) => {ToastComponent.showToast("Login failed!", `${err.error}`);}
        });
    })
  }
}
