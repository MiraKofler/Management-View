import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {MenuItem} from "../models/menu-item.model";

@Injectable({
  providedIn: 'root'
})
/*
get, delete, add and update http requests for our api
 */
export class MenuItemService {

  constructor(private http: HttpClient) { }

  getMenuItems(): Observable<MenuItem[]>
  {
    return this.http.get<MenuItem[]>("http://localhost:3000/menuItems");
  }

  deleteMenuItems(menuitem: MenuItem): Observable<MenuItem>
  {
    let menuitemid = menuitem.menuitemid;
    return this.http.delete<MenuItem>("http://localhost:3000/menuItems/"+menuitemid);
  }
  addMenuItems(menuitem: MenuItem): Observable<MenuItem>
  {
    return this.http.post<MenuItem>("http://localhost:3000/menuItems", menuitem);
  }
  updateMenuItems(menuitem: MenuItem): Observable<MenuItem>
  {
    return this.http.put<MenuItem>("http://localhost:3000/menuItems", menuitem);
  }
}
