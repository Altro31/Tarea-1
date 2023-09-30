// 27. Gestor de Recetas de Cocina

/**
 * name: 
 * ingredients: An array (of strings) that represents all recipe's ingredients
 * prepSteps: An array (of strings) that represents all needed steps to make the recipe
 */
class Recipe {
  constructor(name, ingredients = [], prepSteps = []) {
    //Recipe's name
    let _name = name;
    //An array (of strings) that represents all of recipe's ingredients
    let _ingredients = ingredients;
    //An array (of strings) that represents all of needed steps to the recipe
    let _prepSteps = prepSteps;

    //Getter and Setters
    this.getName = () => _name;
    this.setName = function (name) {
      if (name) _name = name;
    };

    this.getIngredients = () => _ingredients;

    this.getPrepSteps = () => _prepSteps;
  }
}

/**
 * This class represents a Recipe Manager that has a list o recettes and can add, remove o modify
 */
class RecipeManager {
  constructor(recipes = []) {
    //An array of Recipes
    let _recipes = recipes;

    //Add a recipe to the list
    this.addRecipe = (recipe) => {
      if (recipe) _recipes.push(recipe);
    };

    //Remove a recipe for the list. If there are 2 or more with the same name, they are removed as well.
    this.removeRecipe = function (recipeName) {
      _recipes = _recipes.filter((recipe) => recipe.getName() !== recipeName);
    };

    /**Edit a recipe
     * recipeTarget: Recipe to be edited
     * propsToEdit: An object with the props to edit
     *
     * e.g: propsToEdit = {name: Super Pizza, ingredients: ['A', 'B'], prepSteps: ['C', 'D']}
     */
    this.editRecipe = (recipeTargetName, propsToEdit) => {
      const recipe = _recipes.find(
        (recipe) => recipe.getName() === recipeTargetName
      );
      //If name is evaluated as false...
      if (propsToEdit.name) {
        recipe.setName(propsToEdit.name);
      }
      //If ingredients is evaluated as false...
      if (propsToEdit.ingredients) {
        recipe.getIngredients().length = 0;
        //I explain this for-of in README.md
        for (const ingredient of propsToEdit.ingredients) {
          recipe.getIngredients().push(ingredient);
        }
      }
      //If prepSteps is evaluated as false...
      if (propsToEdit.prepSteps) {
        recipe.getPrepSteps().length = 0;
        for (const step of propsToEdit.prepSteps) {
          recipe.getPrepSteps().push(step);
        }
      }
    };

    //Giving an array of string (ingredientes), return an array with all recipes that have those ingredients (all of them)
    this.getRecipesByIngredients = function (ingredients) {
      return _recipes.filter((recipe) => {
        let check = true;
        for (let i = 0; i < ingredients.length && check; i++) {
          check = recipe.getIngredients().includes(ingredients[i]);
        }
        return check;
      });
    };
  }
}
