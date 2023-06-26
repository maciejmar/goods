import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { ApiService} from '../api.service'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {


  username: string = '';
  userItems: any[] = [];
  otherUsersItems: any[] = [];

  constructor(private router: Router, private apiService: ApiService) {}

  ngOnInit() {
    this.apiService.getDashboardData().subscribe(
      response => {
        this.username = response.username;
        this.userItems = response.user_items;
        this.otherUsersItems = response.other_users_items;
      },
      error => {
        console.log(error);
        // Handle any error during dashboard data retrieval
      }
    );
  }

  logout() {
    this.apiService.logout().subscribe(
      () => {
        this.router.navigate(['/login']);
      },
      error => {
        console.log(error);
        // Handle any error during logout
      }
    );
  }
}
  


