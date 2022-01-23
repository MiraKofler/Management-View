import {Component, Input, OnInit} from '@angular/core';
import {MenuItemService} from "../services/menu-item.service";
import {MenuItem} from "../models/menu-item.model";
import {Tables} from "../models/tables.model";

@Component({
  selector: 'app-menu-items',
  templateUrl: './menu-items.component.html',
  styleUrls: ['./menu-items.component.css']
})

export class MenuItemsComponent implements OnInit
{

  menuItems:MenuItem[] = [];



  constructor(private menuItemService:MenuItemService) { }

  ngOnInit(): void
  {
    this.menuItemService.getMenuItems().subscribe((menuItem:MenuItem[]) => {
      menuItem.sort((a,b) => a.menuitemid - b.menuitemid);
      this.menuItems = menuItem;
    });
  }

  onBtnDeleteClicked(menuitem:MenuItem):void
  {
    this.menuItems = this.menuItems.filter(m => m != menuitem);
    this.menuItemService.deleteMenuItems(menuitem).subscribe();

  }

  onBtnAddClicked(id: number, name: string, description: string, price: number) {
    if(id == null || name == "" || description == "" || price == null){
      alert("All fields must not be empty");
      return;
    }
    let menuitem: MenuItem = new MenuItem();

    try
    {
      if(id<=0){
        alert("id must be greater 0!");
        return;
      }
      if(price <= 0 ){
        alert("price must be greater 0!");
        return;
      }

      for(let i = 0; i < this.menuItems.length; i++){
        if(id == this.menuItems[i].menuitemid){
          alert("No id duplicates allowed!")
          return;
        }
      }

      for(let i = 0; i < this.menuItems.length; i++){
        if(name == this.menuItems[i].title){
          alert("No title duplicates allowed!")
          return;
        }
      }
      menuitem.menuitemid = id;
      menuitem.title = name;
      menuitem.itemdescription = description;
      menuitem.price = price;

      this.menuItemService.addMenuItems(menuitem).subscribe(() => window.location.reload());
    }
    catch (ex)
    {
      console.log(ex);
    }
  }

  onBtnUpdateClicked(id: number, name: string, description: string, price: number) {
    if(id == null || name == "" || description == "" || price == null){
      alert("All fields must not be empty");
      return;
    }
    let menuitem: MenuItem = new MenuItem();

    try
    {
      if(id<=0){
        alert("id must be greater 0!");
        return;
      }
      if(price <= 0 ){
        alert("price must be greater 0!");
        return;
      }

        if(id <= this.menuItems.length) {
          if (id == this.menuItems[id - 1].menuitemid) {
            menuitem.menuitemid = id;
            menuitem.title = name;
            menuitem.itemdescription = description;
            menuitem.price = price;

            this.menuItemService.updateMenuItems(menuitem).subscribe(() => window.location.reload());
          } else {
            alert("the object you want to update does not exist!")
            return;
          }
        }else {
          alert("the object you want to update does not exist!")
          return;
        }
    }
    catch (ex)
    {
      console.log(ex);
    }
  }
}
