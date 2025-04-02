import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AuthenticationRoutes} from './authentication.routes';
import {FeaturesModule} from '../features.module';


@NgModule({
  declarations: [],
  imports: [
    FeaturesModule,
    CommonModule,
    AuthenticationRoutes,
  ]
})
export class AuthenticationModule { }
