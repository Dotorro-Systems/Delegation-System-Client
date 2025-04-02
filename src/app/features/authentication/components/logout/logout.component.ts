import {Component, OnInit} from '@angular/core';
import {ApiService} from '../../../../core/services/api.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-logout',
  imports: [],
  templateUrl: './logout.component.html',
  styleUrl: './logout.component.css'
})
export class LogoutComponent implements OnInit {

  constructor(private apiService: ApiService, private router: Router) { }

  ngOnInit() {
    this.apiService.post<{}>('users/logout', {}, { responseType: 'text' })
      .subscribe({
        next: response => {
          setTimeout(() => {
            this.router.navigate(['/login']);
          }, 2000);
        }
      })
  }
}
