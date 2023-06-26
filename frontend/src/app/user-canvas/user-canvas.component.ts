import { Component, OnInit } from '@angular/core';
import { ApiService } from './../api.service'; // Replace with your actual API service

@Component({
  selector: 'app-user-canvas',
  templateUrl: './user-canvas.component.html',
  styleUrls: ['./user-canvas.component.css']
})
export class UserCanvasComponent implements OnInit {
  userItems: any[] = [];
  otherUsersItems: any[] = [];
  mySelectedItem: any | null = null;
  otherUserSelectedItem: any | null = null;
  otherUserId: string =''
  currentPage:number = 1
  itemsPerPage = 10
  filterCategory: string=''
  sortField=''
  sortOrder = 1

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.getUserItems();
    this.getOtherUsersItems();
  }

  getUserItems() {
    this.apiService.getItems(this.currentPage, this.itemsPerPage,this.filterCategory, this.sortField,this.sortOrder)
      .subscribe(response => {
        this.userItems = response.items;
      });
  }

  getOtherUsersItems() {
    this.apiService.getOtherUserItems(this.otherUserId)
      .subscribe(response => {
        this.otherUsersItems = response.users;
      });
  }

  selectMyItem(item: any) {
    this.mySelectedItem = item;
  }

  selectOtherUserItem(item: any) {
    this.otherUserSelectedItem = item;
  }

  changeItems() {
    if (this.mySelectedItem && this.otherUserSelectedItem) {
      // Implement the logic to initiate the item change process
      console.log('Item change initiated:', this.mySelectedItem, this.otherUserSelectedItem);
      // Perform further actions based on the item change process
    } else {
      console.log('Please select both items for the exchange.');
    }
  }

  cancelExchange() {
    // Implement the logic to cancel the ongoing item exchange process
    console.log('Item exchange cancelled.');
    // Perform further actions after cancelling the exchange
  }
  acceptExchange() {
    if (this.mySelectedItem && this.otherUserSelectedItem) {
      // Implement the logic to accept the item exchange request
      console.log('Item exchange accepted.');
  
      // Assuming you have unique item IDs for the selected items
      const mySelectedItemId = this.mySelectedItem.id;
      const otherUserSelectedItemId = this.otherUserSelectedItem.id;
  
      // Make API calls to update the items in the database
      this.apiService.updateItemOwner(mySelectedItemId, this.otherUserSelectedItem.ownerId)
        .subscribe(response => {
          console.log('My item ownership updated successfully:', response);
          // Perform further actions or update the local data as needed
        });
  
      this.apiService.updateItemOwner(otherUserSelectedItemId, this.mySelectedItem.ownerId)
        .subscribe(response => {
          console.log('Other user item ownership updated successfully:', response);
          // Perform further actions or update the local data as needed
        });
  
      // Perform further actions after accepting the exchange
    } else {
      console.log('Please select both items for the exchange.');
    }
  }
  
}
