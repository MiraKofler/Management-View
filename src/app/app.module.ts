import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { TablesComponent } from './tables/tables.component';
import { CategoriesComponent } from './categories/categories.component';
import { MenuItemsComponent } from './menu-items/menu-items.component';
import { UsersComponent } from './users/users.component';
import { HomeComponent } from './home/home.component';
import {RouterModule} from "@angular/router";
import { HttpClientModule } from '@angular/common/http';
import {NgxQRCodeModule} from '@techiediaries/ngx-qrcode';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavBarComponent,
    TablesComponent,
    CategoriesComponent,
    MenuItemsComponent,
    UsersComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    HttpClientModule,
    NgxQRCodeModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
