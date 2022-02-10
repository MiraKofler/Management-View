import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Users} from "../models/users.model";


@Injectable({
  providedIn: 'root'
})
/*
Get, delete, add and update http requests for our api
 */
export class UsersService {

  constructor(private http: HttpClient) { }

  getUsers(): Observable<Users[]>
  {
    return this.http.get<Users[]>("http://localhost:3000/users");
  }

  deleteUsers(users: Users): Observable<Users>
  {
    let userid = users.userid
    return this.http.delete<Users>("http://localhost:3000/users/"+userid);
  }
  addUsers(user: Users): Observable<Users>
  {
    return this.http.post<Users>("http://localhost:3000/users", user);
  }
  updateUsers(user: Users): Observable<Users>
  {
    return this.http.put<Users>("http://localhost:3000/users", user);
  }
}
