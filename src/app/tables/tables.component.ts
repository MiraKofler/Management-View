import { Component, OnInit } from '@angular/core';
import {Tables} from "../models/tables.model";
import {TablesService} from "../services/tables.service";
import {MenuItem} from "../models/menu-item.model";

@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.css']
})
export class TablesComponent implements OnInit {

  tables:Tables[] = [];
  constructor(private tablesService:TablesService) { }

  ngOnInit(): void {
    this.tablesService.getTables().subscribe((tables:Tables[]) => {
    this.tables = tables;
    });
  }

}
