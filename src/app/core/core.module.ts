import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi} from '@angular/common/http';
import {RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import {ApiService} from './services/api.service';
import {CustomHeaderInterceptor} from './interceptors/custom-header-interceptor.service';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLinkActive,
    RouterLink
  ],
  providers: [
    provideHttpClient(withInterceptorsFromDi()),
    { provide: ApiService, useClass: ApiService },
  ]
})
export class CoreModule { }
