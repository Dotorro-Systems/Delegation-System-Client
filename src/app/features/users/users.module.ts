import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {provideHttpClient, withInterceptorsFromDi} from '@angular/common/http';
import {UserListComponent} from './components/user-list/user-list.component';
import {UsersRoutes} from './users.routes';
import {UserService} from './services/user.service';
import {MockUserService} from './services/mock-user.service';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    UsersRoutes,
  ],
  providers: [
    provideHttpClient(withInterceptorsFromDi()),
    { provide: UserService, useClass: MockUserService },
  ]
})
export class UsersModule { }
