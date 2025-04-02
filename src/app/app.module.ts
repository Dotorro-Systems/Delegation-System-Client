import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CoreModule } from './core/core.module';
import {AppRoutingModule} from './app.routes';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {CustomHeaderInterceptor} from './core/interceptors/custom-header-interceptor.service';

@NgModule({
  declarations: [],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
  ],
  bootstrap: [],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: CustomHeaderInterceptor, multi: true }
  ]
})
export class AppModule {}
