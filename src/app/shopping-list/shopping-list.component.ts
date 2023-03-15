import { Component, OnInit } from '@angular/core';
import { Ingredient } from '../model/ingredient.model';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {
  ingredients: Ingredient[] = [
    new Ingredient('Sugar', 5),
    new Ingredient('Onion', 2),
    new Ingredient('Tomato', 1)
  ];

  constructor() {}

  ngOnInit() {}
}
