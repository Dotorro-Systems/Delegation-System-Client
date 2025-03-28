import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AuthenticationRoutes} from './authentication.routes';
import {provideHttpClient, withInterceptorsFromDi} from '@angular/common/http';
import {UserService} from '../users/services/user.service';
import {MockUserService} from '../users/services/mock-user.service';
import {ApiService} from '../../core/services/api.service';
import {DepartmentService} from '../departments/services/department.service';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AuthenticationRoutes,
  ],
  providers: [
    provideHttpClient(withInterceptorsFromDi()),
    { provide: ApiService, useClass: ApiService },
    { provide: DepartmentService, useClass: DepartmentService },
  ]
})
export class AuthenticationModule { }
