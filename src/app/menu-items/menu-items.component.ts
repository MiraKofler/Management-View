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
      this.menuItems = menuItem;
    });
  }

  onBtnDeleteClicked(menuitem:MenuItem):void
  {
    this.menuItemService.deleteMenuItems(menuitem).subscribe();
  }

}
