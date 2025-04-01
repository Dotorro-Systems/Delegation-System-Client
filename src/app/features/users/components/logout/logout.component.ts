import {Component, OnInit} from '@angular/core';
import {ApiService} from '../../../../core/services/api.service';

@Component({
  selector: 'app-logout',
  imports: [],
  templateUrl: './logout.component.html',
  styleUrl: './logout.component.css'
})
export class LogoutComponent implements OnInit {

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.apiService.post<{}>('users/logout', {}, { responseType: 'text', withCredentials: true })
      .subscribe({
        next: response => {
          console.log(response);
        }
      })
  }
}
