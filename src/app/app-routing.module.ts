import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {TablesComponent} from "./tables/tables.component";
import {UsersComponent} from "./users/users.component";
import {MenuItemsComponent} from "./menu-items/menu-items.component";
import {CategoriesComponent} from "./categories/categories.component";
import {LoginComponent} from "./login/login.component";
import {AuthGuard} from "./guard/auth.guard";

const routes: Routes = [
  {path:'', redirectTo: 'login', pathMatch:'full'},
  { path: 'login', component: LoginComponent },
  { path: 'tables', component:TablesComponent, canActivate:[AuthGuard] },
  { path: 'users', component:UsersComponent, canActivate:[AuthGuard] },
  { path: 'item', component:MenuItemsComponent, canActivate:[AuthGuard] },
  { path: 'categories', component:CategoriesComponent, canActivate:[AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
