import { Component, OnInit, Input } from '@angular/core';
import { ApiService } from '../../api.service'; // Replace with your actual API service
import { FormsModule } from "@angular/forms";
import { ItemService } from 'src/app/item.service';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css']
})
export class ItemListComponent implements OnInit {
  @Input()
  items: any[] = [];

  currentPage = 1;
  itemsPerPage = 10;
  totalItems = 0;

  filterCategory = '';
  sortField = '';
  sortOrder = 1;


  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.getItems();
  }

  getItems() {
    this.apiService.getItems(this.currentPage, this.itemsPerPage, this.filterCategory, this.sortField, this.sortOrder)
      .subscribe(response => {
        this.items = response.items;
        this.totalItems = response.totalItems;
      });
  }

  onPageChange(page: number) {
    this.currentPage = page;
    this.getItems();
  }

  onFilterChange(category: string) {
    this.filterCategory = category;
    this.currentPage = 1;
    this.getItems();
  }

  onSortChange(field: string, sortOrder: number) {
    if (this.sortField === field) {
      this.sortOrder = sortOrder;
    } else {
      this.sortField = field;
      this.sortOrder = 1;
    }
    this.getItems();
  }
}
