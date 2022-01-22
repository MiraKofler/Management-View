import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Categories} from "../models/categories.model";

@Injectable({
  providedIn: 'root'
})

export class CategoriesService {

  constructor(private http: HttpClient) { }

  getCategories(): Observable<Categories[]>
  {
    return this.http.get<Categories[]>("http://localhost:3000/categories");
  }


}
