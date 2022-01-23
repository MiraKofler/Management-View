import { Component, OnInit } from '@angular/core';
import {Users} from "../models/users.model";
import {UsersService} from "../services/users.service";
import {MenuItem} from "../models/menu-item.model";
import {Categories} from "../models/categories.model";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users:Users[] = [];

  constructor(private usersService:UsersService) { }


  ngOnInit(): void {
    this.usersService.getUsers().subscribe((users:Users[]) => {

      users.sort((a,b) => a.userid - b.userid);
      this.users = users;
    });
  }
  onBtnDeleteClicked(user:Users):void
  {
    this.users = this.users.filter(u => u != user);
    this.usersService.deleteUsers(user).subscribe();

  }

  onBtnAddClicked(id: number, name: string, password: string, roletype: string) {
    if(id == null || name == "" || password == "" || roletype == null){
      alert("All fields must not be empty");
      return;
    }
    let user: Users = new Users();

    try
    {
      if(id<=0){
        alert("id must be greater 0!");
        return;
      }

      if(roletype === "1" || roletype === "2" || roletype === "3" ){
        for(let i = 0; i < this.users.length; i++) {
          if (id == this.users[i].userid) {
            alert("No id duplicates allowed!")
            return;
          }
        }
          user.userid = id;
          user.username = name;
          user.password = password;
          user.roletype = roletype;

          this.usersService.addUsers(user).subscribe(() => window.location.reload());
      }else{
          alert("there are only 3 roletypes!");
          return;
      }


    }
    catch (ex)
    {
      console.log(ex);
    }
  }

  onBtnUpdateClicked(id: number, name: string, password: string, roletype: string) {
    if(id == null || name == "" || password == "" || roletype == null){
      alert("All fields must not be empty");
      return;
    }
    let user: Users = new Users();

    try
    {
      if(id<=0){
        alert("id must be greater 0!");
        return;
      }

      if(roletype === "1" || roletype === "2" || roletype === "3"){
        if(id <= this.users.length) {
          if (id == this.users[id - 1].userid) {
            user.userid = id;
            user.username = name;
            user.password = password;
            user.roletype = roletype;

            this.usersService.updateUsers(user).subscribe(() => window.location.reload());
          } else {
            alert("the object you want to update does not exist!")
            return;
          }
        }else {
          alert("the object you want to update does not exist!")
          return;
        }

      }else{
        alert("there are only 3 roletypes!");
        return;
      }

    }
    catch (ex)
    {
      console.log(ex);
    }
  }
}
