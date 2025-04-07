import { Component } from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {NavbarComponent} from './core/components/navbar/navbar.component';
import {ToastComponent} from './core/components/toast/toast.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  imports: [
    RouterOutlet,
    NavbarComponent,
    ToastComponent,
  ],
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Delegation System Client';
}
