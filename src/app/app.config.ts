import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import {HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi} from '@angular/common/http';
import {ApiService} from './core/services/api.service';
import {CustomHeaderInterceptor} from './core/interceptors/custom-header-interceptor.service';
import {DelegationsService} from './features/delegations/services/delegations.service';
import {NotesService} from './features/notes/services/notes.service';
import {ExpensesService} from './features/expenses/services/expenses.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withInterceptorsFromDi()),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CustomHeaderInterceptor,
      multi: true
    },
  ]
};
