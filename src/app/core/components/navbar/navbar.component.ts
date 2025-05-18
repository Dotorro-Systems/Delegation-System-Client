import {Component, OnInit} from '@angular/core';
import {RouterLink, RouterLinkActive} from "@angular/router";
import {NgIf} from '@angular/common';
import {CoreModule} from '../../core.module';
import {ApiService} from '../../services/api.service';
import {User} from '../../../../interfaces/user';

@Component({
  selector: 'app-navbar',
  imports: [
    RouterLink,
    RouterLinkActive,
    CoreModule,
    NgIf,
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit{
  isAuthenticated: boolean = false;
  user: User | undefined;

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.apiService.isAuthenticated()
      .subscribe({
        next: (response: boolean) => {
          this.isAuthenticated = response;

          if (this.isAuthenticated) {
            this.apiService.getMe()
              .subscribe({
                next: (response) => {
                  this.user = response;
                },
                error: () => {

                }
              })
          }
        },
        error: () => {
          this.isAuthenticated = false;
        }
      })
  }
}
