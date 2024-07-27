import { Component, OnInit,Output, EventEmitter } from '@angular/core';
import { ItemserviceService } from 'src/app/itemservice.service';

@Component({
  selector: 'app-new-item',
  templateUrl: './new-item.component.html',
  styleUrls: ['./new-item.component.css']
})
export class NewItemComponent implements OnInit {
  newItem: any = {
    name: '',
    description: null,
    category: '',
    image: null
  };

  constructor(private itemService: ItemserviceService) { }

  ngOnInit(): void {
  }

  @Output() itemAdded: EventEmitter<any> = new EventEmitter<any>();

  addItem() {
    // Emit the itemAdded event with the new item
      
      const newItem = {
        title: this.newItem.title,
        description: this.newItem.description,
        category: this.newItem.category,
        image: this.newItem.image
      };

      this.itemService.saveItem(newItem).subscribe({
        next:(response) => {
          console.log('Item added successfully:', response);
          // Reset the form and any other necessary state
          this.resetForm();
          // Optionally, you can perform any additional actions after saving the item
        },
        error:(error) => {
          console.error('Error occurred while adding item:', error);
          // Handle the error scenario, display an error message, etc.
        }
       });
      // Emit the itemAdded event with the new item
      this.itemAdded.emit(newItem);
    }
    // Reset the form after emitting the event
    resetForm() {
      // Reset the form fields
      this.newItem = {};
    }

    onFileSelected(event: any) {
      this.newItem.image = event.target.files[0];
    }
   
  }  


