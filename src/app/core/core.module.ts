import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import {RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLinkActive,
    RouterLink
  ],
  providers: [
    provideHttpClient(withInterceptorsFromDi())
  ]
})
export class CoreModule { }
