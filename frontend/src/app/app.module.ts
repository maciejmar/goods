import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { HomeComponent } from './home/home.component';
import { ItemListComponent } from './dashboard/item-list/item-list.component';
import { ItemDetailComponent } from './dashboard/item-detail/item-detail.component';
import { UserCanvasComponent } from './user-canvas/user-canvas.component';
import { HttpClientModule } from '@angular/common/http';
import { PaginationComponent } from './pagination/pagination.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NewItemComponent } from './dashboard/new-item/new-item.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
  
    HomeComponent,
    ItemListComponent,
    ItemDetailComponent,
    UserCanvasComponent,
    PaginationComponent,
    RegistrationComponent,
    DashboardComponent,
    NewItemComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap:[AppComponent]
  
})
export class AppModule { }
