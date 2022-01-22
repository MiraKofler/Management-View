import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {TablesComponent} from "./tables/tables.component";
import {UsersComponent} from "./users/users.component";
import {MenuItemsComponent} from "./menu-items/menu-items.component";
import {CategoriesComponent} from "./categories/categories.component";

const routes: Routes = [
  { path: '', redirectTo: 'tables', pathMatch: 'full' },
  { path: 'tables', component:TablesComponent },
  { path: 'users', component:UsersComponent },
  { path: 'item', component:MenuItemsComponent },
  { path: 'categories', component:CategoriesComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
