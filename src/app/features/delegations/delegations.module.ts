import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {provideHttpClient, withInterceptorsFromDi} from '@angular/common/http';
import {DelegationService} from './services/delegation.service';
import {MockDelegationService} from './services/mock-delegation.service';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
  ],
  providers: [
    provideHttpClient(withInterceptorsFromDi()),
    { provide: DelegationService, useClass: MockDelegationService },
  ]
})
export class DelegationsModule { }
