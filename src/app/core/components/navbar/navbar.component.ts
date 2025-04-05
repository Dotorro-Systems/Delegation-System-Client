import {Component, OnInit} from '@angular/core';
import {RouterLink, RouterLinkActive} from "@angular/router";
import {NgIf} from '@angular/common';
import {CoreModule} from '../../core.module';
import {ApiService} from '../../services/api.service';

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
  isAuthenticated: boolean = true;

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.apiService.isAuthenticated()
      .subscribe({
        next: (response: boolean) => {
          console.log(response);
          this.isAuthenticated = response;
        },
        error: () => {
          this.isAuthenticated = false;
        }
      })
  }
}
