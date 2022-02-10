import { Component, OnInit } from '@angular/core';
import {Users} from "../models/users.model";
import {UsersService} from "../services/users.service";


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  /*
   On init we set our menuitem requirements to 0
*/
  users:Users[] = [];
  i = 0;

  constructor(private usersService:UsersService) { }

  /*
     We sort our array and make it a Element
   */
  ngOnInit(): void {
    this.usersService.getUsers().subscribe((users:Users[]) => {

      users.sort((a,b) => a.userid - b.userid);
      this.users = users;
    });
  }

  /*
  Deleting selected user
   */
  onBtnDeleteClicked(user:Users):void
  {
    this.users = this.users.filter(u => u != user);
    this.usersService.deleteUsers(user).subscribe();

  }

  /*
  Adding user with given values from the input fields
   */
  onBtnAddClicked(id: number, name: string, password: string, roletype: string) {
    //Checking if each field contains a value
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

      //Roletype must be either 1, 2 or 3 - standing for waiter, kitchen, manager
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

  /*
  Updating users with given values from the input fields
   */
  onBtnUpdateClicked(id: number, name: string, password: string, roletype: string) {
    //Checking if each field contains a value
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

      //Searching for the right user with the same id
      if(roletype === "1" || roletype === "2" || roletype === "3"){
        for(this.i = 0; this.i < this.users.length; this.i++) {
          if (id == this.users[this.i].userid) {
            user.userid = id;
            user.username = name;
            user.password = password;
            user.roletype = roletype;

            this.usersService.updateUsers(user).subscribe(() => window.location.reload());
            return;
          }
        }
        if(this.i == this.users.length){
          alert("The user you want to update is not defined!")
          this.i = 0;
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
