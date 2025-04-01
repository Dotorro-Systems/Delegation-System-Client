import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {UserListComponent} from './components/user-list/user-list.component';
import {LogoutComponent} from './components/logout/logout.component';

const routes: Routes = [
  { path: 'list', component: UserListComponent },
  { path: 'logout', component: LogoutComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsersRoutes {}
