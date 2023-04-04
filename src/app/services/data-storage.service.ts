import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { RecipeService } from "./recipe.service";

import { Recipe } from '../model/recipe.model';
import { map, tap } from "rxjs/operators";
import { AuthService } from "./auth.service";

import { environment } from '../../environments/environment';


@Injectable({ providedIn: 'root' })
export class DataStorageService {
    private host = null;

    constructor(private http: HttpClient, private recipeService: RecipeService, private authService: AuthService) {
        this.host = environment.db;
    }

    storeRecipes() {
        const recipes = this.recipeService.getRecipes();
        this.http.put(this.host, recipes).subscribe(resp => {
            console.log(resp);
        });
    }

    fetchRecipes() {
        return this.http.get<Recipe[]>(this.host).pipe(map(recipes => {
            return recipes.map(recipe => {
                return { ...recipe, ingredients: recipe.ingredients ? recipe.ingredients : [] }
            });
        }), tap(recipes => {
            this.recipeService.setRecipes(recipes);
        }));
    }
}
