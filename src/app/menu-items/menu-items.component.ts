import {Component, Input, OnInit} from '@angular/core';
import {MenuItemService} from "../services/menu-item.service";
import {MenuItem} from "../models/menu-item.model";


@Component({
  selector: 'app-menu-items',
  templateUrl: './menu-items.component.html',
  styleUrls: ['./menu-items.component.css']
})

export class MenuItemsComponent implements OnInit
{
  /*
    On init we set our menuitem requirements to 0
 */
  menuItems:MenuItem[] = [];
  i = 0;



  constructor(private menuItemService:MenuItemService) { }

  /*
    We sort our array and make it a Element
  */
  ngOnInit(): void
  {
    this.menuItemService.getMenuItems().subscribe((menuItem:MenuItem[]) => {
      menuItem.sort((a,b) => a.menuitemid - b.menuitemid);
      this.menuItems = menuItem;
    });
  }

  /*
  Deleting selected menuitem
   */
  onBtnDeleteClicked(menuitem:MenuItem):void
  {
    this.menuItems = this.menuItems.filter(m => m != menuitem);
    this.menuItemService.deleteMenuItems(menuitem).subscribe();

  }

  /*
  Adding menuitem with given values from the input fields
   */
  onBtnAddClicked(id: number, name: string, description: string, price: number, allergenes: string, category: string) {
    //Checking if each field contains a value
    if(id == null || name == "" || description == "" || price == null || category == ""){
      alert("All fields besides allergenes must not be empty");
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

      //Checking if id is no duplicate
      for(let i = 0; i < this.menuItems.length; i++){
        if(id == this.menuItems[i].menuitemid){
          alert("No id duplicates allowed!")
          return;
        }
      }

      //Checking if title is no duplicate
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
      menuitem.menuallergenes = allergenes;
      menuitem.menucategory = category;

      this.menuItemService.addMenuItems(menuitem).subscribe(() => window.location.reload());
    }
    catch (ex)
    {
      console.log(ex);
    }
  }

  /*
  Updating menuitem with given values from the input fields
   */
  onBtnUpdateClicked(id: number, name: string, description: string, price: number, allergenes: string, category: string) {
    //Checking if each field contains a value
    if(id == null || name == "" || description == "" || price == null || category == ""){
      alert("All fields besides allergenes must not be empty");
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

      //Searching for the right Item with the same id
        for(this.i = 0; this.i < this.menuItems.length; this.i++){
          if (id == this.menuItems[this.i].menuitemid) {
            menuitem.menuitemid = id;
            menuitem.title = name;
            menuitem.itemdescription = description;
            menuitem.price = price;
            menuitem.menuallergenes = allergenes;
            menuitem.menucategory = category;


            this.menuItemService.updateMenuItems(menuitem).subscribe(() => window.location.reload());
            return;
          }
        }

        if(this.i == this.menuItems.length){
          alert("The object you want to update is not defined!")
          this.i = 0;
          return;
      }
    }
    catch (ex)
    {
      console.log(ex);
    }
  }
}
