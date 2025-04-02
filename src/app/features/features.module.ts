import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi} from '@angular/common/http';
import {ApiService} from '../core/services/api.service';
import {CustomHeaderInterceptor} from '../core/interceptors/custom-header-interceptor.service';
import {AuthInterceptor} from '../core/interceptors/auth-interceptor';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    provideHttpClient(withInterceptorsFromDi()),
    { provide: ApiService, useClass: ApiService },
    { provide: HTTP_INTERCEPTORS, useClass: CustomHeaderInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ]
})
export class FeaturesModule { }
