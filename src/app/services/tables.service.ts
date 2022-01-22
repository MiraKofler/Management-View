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
  }

