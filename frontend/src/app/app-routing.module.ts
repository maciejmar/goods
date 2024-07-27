import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { HomeComponent } from './home/home.component';
import { UserCanvasComponent } from './user-canvas/user-canvas.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ItemListComponent } from './dashboard/item-list/item-list.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegistrationComponent },
  { path: 'home', component: HomeComponent },
  { path: 'user-canvas', component: UserCanvasComponent },
  { path: 'dashboard', component:DashboardComponent },
  { path: 'showAllItems', component:DashboardComponent},
  { path: 'items', component: ItemListComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
