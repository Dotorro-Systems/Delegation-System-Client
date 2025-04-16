import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {UserListComponent} from './components/user-list/user-list.component';
import {MeComponent} from './me/me.component';

const routes: Routes = [
  { path: 'list', component: UserListComponent },
  { path: 'me', component: MeComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsersRoutes {}
