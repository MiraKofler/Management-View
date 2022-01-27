import { Component, OnInit } from '@angular/core';
import {Tables} from "../models/tables.model";
import {TablesService} from "../services/tables.service";
import {NgxQrcodeElementTypes, NgxQrcodeErrorCorrectionLevels} from "@techiediaries/ngx-qrcode";
import {AuthenticationService} from "../services/authentication.service";

@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.css']
})


export class TablesComponent implements OnInit {

  tables:Tables[] = [];
  item = [{
    'link': 'http://localhost:4200/login/14',
    'Table Number': 1,
    'Seating Capacity': 5,
    'Description': 'Back'
  }]
  elementType = NgxQrcodeElementTypes.URL;
  correctionLevel = NgxQrcodeErrorCorrectionLevels.HIGH;
  qrInfo = JSON.stringify(this.item);


  constructor(private tablesService:TablesService) { }

  ngOnInit(): void {
    this.tablesService.getTables().subscribe((tables:Tables[]) => {
      tables.sort((a,b) => a.tablesid - b.tablesid);
      this.tables = tables;
    });

  }
  onBtnDeleteClicked(table:Tables):void
  {
    this.tables = this.tables.filter(t => t != table);
    this.tablesService.deleteTables(table).subscribe();

  }

  onBtnAddClicked(id: number, seatingcapacity : number, locationdescription: string) {
    if(id == null || seatingcapacity == null || locationdescription == ""){
      alert("All fields must not be empty");
      return;
    }
    let table: Tables = new Tables();

    try
    {
      if(id<=0){
        alert("id must be greater 0!");
        return;
      }
      if(seatingcapacity <= 0 || seatingcapacity > 15){
        alert("seatingcapacity must be greater 0 and less than 15!");
        return;
      }

      for(let i = 0; i < this.tables.length; i++){
        if(id == this.tables[i].tablesid){
          alert("No id duplicates allowed!")
          return;
        }
      }
      table.tablesid = id;
      table.tablesseats = seatingcapacity;
      table.tableslocationdescription = locationdescription;

      this.tablesService.addTables(table).subscribe(() => window.location.reload());
    }
    catch (ex)
    {
      console.log(ex);
    }
  }

  onBtnUpdateClicked(id: number, seatingcapacity : number, locationdescription: string) {
    if(id == null || seatingcapacity == null || locationdescription == ""){
      alert("All fields must not be empty");
      return;
    }
    let table: Tables = new Tables();

    try
    {
      if(id<=0){
        alert("id must be greater 0!");
        return;
      }
      if(seatingcapacity <= 0 || seatingcapacity > 15){
        alert("seatingcapacity must be greater 0 and less than 15!");
        return;
      }
      if(id <= this.tables.length) {
        if (id == this.tables[id - 1].tablesid) {
          table.tablesid = id;
          table.tablesseats = seatingcapacity;
          table.tableslocationdescription = locationdescription;

          this.tablesService.updateTables(table).subscribe(() => window.location.reload());
          return;
        }
        else{
          alert("the object you want to update does not exist!")
          return;
        }
      }else{
        alert("the object you want to update does not exist!")
        return;
      }


    }
    catch (ex)
    {
      console.log(ex);
    }
  }
  getqrinfo(table: Tables){
    this.item = [{
      'link': 'http://localhost:4200/login/14',
      'Table Number': table.tablesid,
      'Seating Capacity': table.tablesseats,
      'Description': table.tableslocationdescription
    }]
    this.qrInfo = JSON.stringify(this.item);
    return this.qrInfo;
  }

  onBtnQRCodeClicked(table: Tables) {

    const fileNameToDownload = 'table '+table.tablesid+'_qrcode';
    const base64Img = document.getElementsByTagName('img')[0].src;
    fetch(base64Img)
      .then(res => res.blob())
      .then((blob) => {
          // Chrome
          const url = window.URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = url;
          link.download = fileNameToDownload;
          link.click();

      })

  }
}
