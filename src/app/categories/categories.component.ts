import { Component, OnInit } from '@angular/core';
import {Categories} from "../models/categories.model";
import {CategoriesService} from "../services/categories.service";
import {Tables} from "../models/tables.model";


@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  categories: Categories[] = [];
  i = 0;

  constructor(private categoriesService: CategoriesService) {
  }


  ngOnInit(): void {
    this.categoriesService.getCategories().subscribe((categories: Categories[]) => {
      categories.sort((a, b) => a.categoryid - b.categoryid);
      this.categories = categories;
    });
  }

  onBtnDeleteClicked(category: Categories): void {
    this.categories = this.categories.filter(c => c != category);
    this.categoriesService.deleteCategories(category).subscribe();

  }

  onBtnAddClicked(id: number, title: string, description: string): void {
    if (id == null || title == "" || description == "") {
      alert("All fields must not be empty");
      return;
    }
    let category: Categories = new Categories();

    try {
      if (id <= 0) {
        alert("id must be greater 0!");
        return;
      }
      for (let i = 0; i < this.categories.length; i++) {
        if (id == this.categories[i].categoryid) {
          alert("No id duplicates allowed!")
          return;
        }
      }
      category.categoryid = id;
      category.categorytitle = title;
      category.categorydescription = description;

      this.categoriesService.addCategories(category).subscribe(() => window.location.reload());
    } catch (ex) {
      console.log(ex);
    }
  }

  onBtnUpdateClicked(id: number, title: string, description: string) {
    if (id == null || title == "" || description == "") {
      alert("All fields must not be empty");
      return;
    }
    let category: Categories = new Categories();

    try {
      if (id <= 0) {
        alert("id must be greater 0!");
        return;
      }

        for(this.i = 0; this.i< this.categories.length; this.i ++) {
          if (id == this.categories[this.i].categoryid) {
            category.categoryid = id;
            category.categorytitle = title;
            category.categorydescription = description;

            this.categoriesService.updateCategories(category).subscribe(() => window.location.reload());
            return;
          }
        }
      if(this.i == this.categories.length){
        alert("The object you want to update is not defined!")
        this.i = 0;
        return;
      }

    } catch (ex) {
      console.log(ex);
    }
  }
}

