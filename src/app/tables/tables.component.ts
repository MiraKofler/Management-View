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

/*
setting default qr info item.
setting tables array for our data.
setting qr code variables.
adding qr info item to the qr code.
setting counter variable i.
 */
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
  i = 0;


  constructor(private tablesService:TablesService) { }
/*
On init we load our tables data from the data base to show it in the html file.
 */
  ngOnInit(): void {
    this.tablesService.getTables().subscribe((tables:Tables[]) => {
      tables.sort((a,b) => a.tablesid - b.tablesid);
      this.tables = tables;
    });

  }
  /*
  Deleting a selected table
   */
  onBtnDeleteClicked(table:Tables):void
  {
    this.tables = this.tables.filter(t => t != table);
    this.tablesService.deleteTables(table).subscribe();

  }
  /*
  Adding a table
   */
  onBtnAddClicked(id: number, seatingcapacity : number, locationdescription: string) {
    if(id == null || seatingcapacity == null || locationdescription == ""){ //check if values are not empty
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

      for(let i = 0; i < this.tables.length; i++){ // checking for duplicates
        if(id == this.tables[i].tablesid){
          alert("No id duplicates allowed!")
          return;
        }
      }
      //setting and adding the new table to the database
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

  /*
  Updating tables with given values from the input fields
   */
  onBtnUpdateClicked(id: number, seatingcapacity : number, locationdescription: string) {
    //All input fields must contain a value
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
      //searching for the table with the same id
      for(this.i = 0; this.i < this.tables.length; this.i ++) {
        if (id == this.tables[this.i].tablesid) {
          table.tablesid = id;
          table.tablesseats = seatingcapacity;
          table.tableslocationdescription = locationdescription;

          this.tablesService.updateTables(table).subscribe(() => window.location.reload());
          return;
        }

      }
      if(this.i == this.tables.length){
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

  /*
  Give the QR-Info
   */
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

  /*
  Download the QR-Code if Button is clicked
   */
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
