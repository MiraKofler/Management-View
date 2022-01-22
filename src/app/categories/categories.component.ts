import { Component, OnInit } from '@angular/core';
import {Categories} from "../models/categories.model";
import {CategoriesService} from "../services/categories.service";


@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  categories:Categories[] = [];

  constructor(private categoriesService:CategoriesService) { }


  ngOnInit(): void {
    this.categoriesService.getCategories().subscribe((categories:Categories[]) => {
    this.categories = categories;
    });
  }

}
