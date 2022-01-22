import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {MenuItem} from "../models/menu-item.model";
import {Tables} from "../models/tables.model";

@Injectable({
  providedIn: 'root'
})
export class MenuItemService {

  constructor(private http: HttpClient) { }

  getMenuItems(): Observable<MenuItem[]>
  {
    return this.http.get<MenuItem[]>("http://localhost:3000/menuItems");
  }

  deleteMenuItems(menuitem: MenuItem): Observable<MenuItem>
  {
    let id = menuitem.menuitemid
    return this.http.delete<MenuItem>("http://localhost:3000/menuItems/"+id);
  }

}
