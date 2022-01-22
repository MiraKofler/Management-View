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

  menuItems:MenuItem[] = [];

  constructor(private menuItemService:MenuItemService) { }

  ngOnInit(): void
  {
    this.menuItemService.getMenuItems().subscribe((menuItem:MenuItem[]) => {
      this.menuItems = menuItem;
    });
  }

  onBtnDeleteClicked(txtText:string):void
  {
    alert('the mighty button has ben pressed ' + txtText);
  }

}
