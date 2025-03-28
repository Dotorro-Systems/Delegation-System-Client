import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {UsersModule} from './features/users/users.module';
import {AuthenticationModule} from './features/authentication/authentication.module';
import {DashboardComponent} from './features/dashboard/dashboard.component';
import {DelegationsComponent} from './features/delegations/delegations.component';

export const routes: Routes = [
  { path: 'users', loadChildren: () => UsersModule },
  { path: 'authentication', loadChildren: () => AuthenticationModule },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'delegations/:id', component: DelegationsComponent},
  { path: '', redirectTo: '/users', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})

export class AppRoutingModule {}
