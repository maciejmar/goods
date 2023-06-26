import { Component, OnInit } from '@angular/core';
import { ApiService } from './../api.service'; // Replace with your actual API service

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  myItems: any[] = [];
  otherUsers: any[] = [];

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.getMyItems();
    this.getOtherUsersItems('1');
  }

  getMyItems() {
    this.apiService.getMyItems() //ai gave primaty getMyItems
      .subscribe(response => {
        this.myItems = response.items;
      });
  }

  getOtherUsersItems(userId:string) {
    this.apiService.getOtherUserItems(userId)
      .subscribe(response => {
        this.otherUsers = response.users;
      });
  }

  selectItemForExchange(item: any) {
    // Implement the logic to select an item for exchange
    console.log('Selected item:', item);
    // Perform further actions based on the selected item
  }
}
