import { Component, OnInit } from '@angular/core';
import {Users} from "../models/users.model";
import {UsersService} from "../services/users.service";

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
      this.users = users;
    });
  }

}
