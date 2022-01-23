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

        if (id <= this.categories.length) {
          if (id == this.categories[id - 1].categoryid) {
            category.categoryid = id;
            category.categorytitle = title;
            category.categorydescription = description;

            this.categoriesService.updateCategories(category).subscribe(() => window.location.reload());
          } else {
            alert("the object you want to update does not exist!")
            return;
          }
        }else {
          alert("the object you want to update does not exist!")
          return;
        }

    } catch (ex) {
      console.log(ex);
    }
  }
}

