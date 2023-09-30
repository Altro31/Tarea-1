class Recipe {
    constructor(name, ingredients = [], prepSteps = []) {
      let _name = name
      let _ingredients = ingredients
      let _prepSteps = prepSteps
      this.getName = () => _name
      this.setName = function (name) {
        if (name) _name = name
      }
      this.getIngredients = () => _ingredients
      this.getPrepSteps = () => _prepSteps
    }
  }
  class RecipeManager {
    constructor(recipes = []) {
      const _recipes = recipes
      this.getRecipeList = () => _recipes.slice()
      this.addRecipe = (recipeName, recipeIngredients, recipePrepSteps) => _recipes.push(new Recipe(recipeName, recipeIngredients, recipePrepSteps))
      this.removeRecipe = (recipeName) => _recipes.filter((recipe) => recipe.getName() !== recipeName)
      this.editRecipe = (recipeName, propsToEdit) => {
        const recipe = _recipes.find((recipe) => recipe.getName() === recipeName)
        recipe.setName(propsToEdit.name)
        if (propsToEdit.ingredients) {
          recipe.getIngredients().length = 0
          for (const ingredient of propsToEdit.ingredients) {
            recipe.getIngredients().push(ingredient)
          }
        }
        if (propsToEdit.prepSteps) {
          recipe.getPrepSteps().length = 0
          for (const step of propsToEdit.prepSteps) {
            recipe.getPrepSteps().push(step)
          }
        }
      }
    }
    getRecipesByIngredients(ingredients) {
      return this.getRecipeList().filter((recipe) => ingredients.every((ingredient) => recipe.getIngredients().includes(ingredient)))
    }
  }