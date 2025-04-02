import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {UsersRoutes} from './users.routes';
import {FeaturesModule} from '../features.module';


@NgModule({
  declarations: [],
  imports: [
    FeaturesModule,
    CommonModule,
    UsersRoutes,
  ],
})
export class UsersModule { }
