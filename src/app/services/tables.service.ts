import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Injectable} from "@angular/core";
import {Tables} from "../models/tables.model";


@Injectable({
  providedIn: 'root'
})

export class TablesService {

  constructor(private http: HttpClient){ }

    getTables(): Observable<Tables[]>
    {
      return this.http.get<Tables[]>("http://localhost:3000/tables");
    }
  deleteTables(table: Tables): Observable<Tables>
  {
    let tablesid = table.tablesid
    return this.http.delete<Tables>("http://localhost:3000/tables/"+tablesid);
  }
  addTables(table: Tables): Observable<Tables>
  {
    return this.http.post<Tables>("http://localhost:3000/tables", table);
  }
  updateTables(table: Tables): Observable<Tables>
  {
    return this.http.put<Tables>("http://localhost:3000/tables", table);
  }
}

