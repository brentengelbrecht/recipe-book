import { EventEmitter, Injectable } from "@angular/core";
import { Ingredient } from "../model/ingredient.model";
import { Recipe } from "../model/recipe.model";
import { ShoppingListService } from "./shopping-list.service";

@Injectable()
export class RecipeService {
    recipeSelected = new EventEmitter<Recipe>();

    private recipes: Recipe[] = [
        new Recipe(
            'First recipe', 
            'Number one', 
            'https://images.immediate.co.uk/production/volatile/sites/30/2020/08/chorizo-mozarella-gnocchi-bake-cropped-9ab73a3.jpg?quality=90&webp=true&resize=300,272',
            [
                new Ingredient('Bread', 10),
                new Ingredient('Tomato', 1),
                new Ingredient('Garlic', 3)
            ]),
        new Recipe(
            'Second recipe', 
            'Number two', 
            'https://images.immediate.co.uk/production/volatile/sites/30/2020/08/chorizo-mozarella-gnocchi-bake-cropped-9ab73a3.jpg?quality=90&webp=true&resize=300,272',
            [
                new Ingredient('Parsley', 1),
                new Ingredient('Potato', 5),
                new Ingredient('Onions', 3)
            ])
      ];

    constructor(private shoppingListService: ShoppingListService) {}

    getRecipes() {
        return this.recipes.slice();
    }

    getRecipe(index: number) {
        return this.recipes[index];
    }

    addIngredientsToShoppingList(ingredients: Ingredient[]) {
        this.shoppingListService.addIngredients(ingredients);
    }
}