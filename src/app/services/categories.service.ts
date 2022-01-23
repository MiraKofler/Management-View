import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Categories} from "../models/categories.model";
import {Tables} from "../models/tables.model";

@Injectable({
  providedIn: 'root'
})

export class CategoriesService {

  constructor(private http: HttpClient) { }

  getCategories(): Observable<Categories[]>
  {
    return this.http.get<Categories[]>("http://localhost:3000/categories");
  }
  deleteCategories(category: Categories): Observable<Categories>
  {
    let categoryid = category.categoryid
    return this.http.delete<Categories>("http://localhost:3000/categories/"+categoryid);
  }
  addCategories(category: Categories): Observable<Categories>
  {
    return this.http.post<Categories>("http://localhost:3000/categories", category);
  }
  updateCategories(category: Categories): Observable<Categories>
  {
    return this.http.put<Categories>("http://localhost:3000/categories", category);
  }

}
