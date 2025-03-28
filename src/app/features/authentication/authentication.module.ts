import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AuthenticationRoutes} from './authentication.routes';
import {provideHttpClient, withInterceptorsFromDi} from '@angular/common/http';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AuthenticationRoutes,
  ],
  providers: [
    provideHttpClient(withInterceptorsFromDi())
  ]
})
export class AuthenticationModule { }
