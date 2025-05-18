import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {UsersModule} from './features/users/users.module';
import {AuthenticationModule} from './features/authentication/authentication.module';
import {DashboardComponent} from './features/dashboard/dashboard.component';
import {AuthenticationGuard} from './core/guards/AuthenticationGuard';
import {PageNotFoundComponent} from './core/components/page-not-found/page-not-found.component';
import {DelegationPanelComponent} from './features/delegation-panel/delegation-panel.component';
import {DelegationReportComponent} from './features/reports/delegation-report/delegation-report.component';
import {DelegationListComponent} from './features/delegation-list/delegation-list.component';
import {ManagerDashboardComponent} from './features/manger-dashboard/manager-dashboard.component';
import {ManagerGuard} from './core/guards/ManagerGuard';

export const routes: Routes = [
  { path: 'users', loadChildren: () => UsersModule, canActivate: [ AuthenticationGuard ] },
  { path: '', loadChildren: () => AuthenticationModule },
  { path: 'dashboard', component: DashboardComponent, canActivate: [ AuthenticationGuard ]},
  { path: 'dashboard/manager', component: ManagerDashboardComponent, canActivate: [ ManagerGuard ]},
  { path: 'delegations/:id', component: DelegationPanelComponent, canActivate: [ AuthenticationGuard ]},
  { path: 'list/delegations', component: DelegationListComponent, canActivate: [ AuthenticationGuard ]},
  { path: 'reports/:id', component: DelegationReportComponent, canActivate: [ AuthenticationGuard ]},
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent, pathMatch: 'full' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
})

export class AppRoutingModule {}
