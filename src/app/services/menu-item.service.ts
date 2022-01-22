import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {MenuItem} from "../models/menu-item.model";

@Injectable({
  providedIn: 'root'
})
export class MenuItemService {

  constructor(private http: HttpClient) { }

  getMenuItem(): Observable<MenuItem>
  {
    return this.http.get<MenuItem>("http://localhost:3000/menuItem");
  }


  getMenuItems(): Observable<MenuItem[]>
  {
    return this.http.get<MenuItem[]>("http://localhost:3000/menuItems");
  }


}
