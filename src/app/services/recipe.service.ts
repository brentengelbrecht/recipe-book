import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Ingredient } from "../model/ingredient.model";
import { Recipe } from "../model/recipe.model";
import { ShoppingListService } from "./shopping-list.service";

@Injectable()
export class RecipeService {
    recipesChanged = new Subject<Recipe[]>();

    private recipes: Recipe[] = []
    // private recipes: Recipe[] = [
    //     new Recipe(
    //         'First recipe', 
    //         'Number one', 
    //         'https://images.immediate.co.uk/production/volatile/sites/30/2020/08/chorizo-mozarella-gnocchi-bake-cropped-9ab73a3.jpg?quality=90&webp=true&resize=300,272',
    //         [
    //             new Ingredient('Bread', 10),
    //             new Ingredient('Tomato', 1),
    //             new Ingredient('Garlic', 3)
    //         ]),
    //     new Recipe(
    //         'Second recipe', 
    //         'Number two', 
    //         'https://images.immediate.co.uk/production/volatile/sites/30/2020/08/chorizo-mozarella-gnocchi-bake-cropped-9ab73a3.jpg?quality=90&webp=true&resize=300,272',
    //         [
    //             new Ingredient('Parsley', 1),
    //             new Ingredient('Potato', 5),
    //             new Ingredient('Onions', 3)
    //         ])
    //   ];

    constructor(private shoppingListService: ShoppingListService) {}

    getRecipes() {
        return this.recipes.slice();
    }

    getRecipe(index: number) {
        return this.recipes[index];
    }

    setRecipes(recipes: Recipe[]) {
        this.recipes = recipes;
        this.recipesChanged.next(this.recipes.slice());
    }

    addRecipe(recipe: Recipe) {
        this.recipes.push(recipe);
        this.recipesChanged.next(this.recipes.slice());
    }

    updateRecipe(index: number, recipe: Recipe) {
        this.recipes[index] = recipe;
        this.recipesChanged.next(this.recipes.slice());
    }

    deleteRecipe(index: number) {
        this.recipes.splice(index, 1);
        this.recipesChanged.next(this.recipes.slice());
    }

    addIngredientsToShoppingList(ingredients: Ingredient[]) {
        this.shoppingListService.addIngredients(ingredients);
    }
}