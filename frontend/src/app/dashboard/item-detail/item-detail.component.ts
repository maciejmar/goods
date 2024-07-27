import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../api.service'; // Replace with your actual API service

@Component({
  selector: 'app-item-detail',
  templateUrl: './item-detail.component.html',
  styleUrls: ['./item-detail.component.css']
})
export class ItemDetailComponent implements OnInit {
  selectedItem: any;

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.getSelecteditem();
  }

  getSelecteditem() {
    // Replace with your logic to get the selected item from the API or local storage
    this.selectedItem = {
      id: 1,
      name: 'Sample Item',
      description: 'This is a sample item.',
      // Add more properties as needed
    };
  }

  exchangeItems() {
    // Implement the logic to initiate the item exchange process
    console.log('Exchange initiated with item:', this.selectedItem);
    // Perform further actions based on the exchange process
  }
}
