import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { TablesComponent } from './tables/tables.component';
import { CategoriesComponent } from './categories/categories.component';
import { MenuItemsComponent } from './menu-items/menu-items.component';
import { UsersComponent } from './users/users.component';
import { HomeComponent } from './home/home.component';
import {RouterModule} from "@angular/router";
import { HttpClientModule } from '@angular/common/http';
import {NgxQRCodeModule} from '@techiediaries/ngx-qrcode';
import {LoginComponent} from "./login/login.component";
import {FormsModule} from "@angular/forms";
import {CookieService} from "ngx-cookie-service";
/*
Every needed module
 */

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    TablesComponent,
    CategoriesComponent,
    MenuItemsComponent,
    UsersComponent,
    HomeComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    HttpClientModule,
    NgxQRCodeModule,
    FormsModule
  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
