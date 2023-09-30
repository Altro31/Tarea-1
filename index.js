// 27. Gestor de Recetas de Cocina


class Recipe {

  /**
   * @param {string} name Recipe's name
   * @param {string[]?} ingredients An array that represents all of recipe's ingredients
   * @param {string[]?} prepSteps An array that represents all of needed steps to the recipe
   */
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

  /**
   * @param {Recipe[]?} recipes An array of Recipes
   */
  constructor(recipes = []) {

    const _recipes = recipes

    /**
     * Return a new array that represents this instance's recipe list
     * 
     * @returns A copy of this instance's recipe list
     */
    this.getRecipeList = () => _recipes.slice()

    /**
     * Add a new recipe to the list
     * 
     * @param {string} recipeName 
     * @param {string[]} recipeIngredients 
     * @param {string[]} recipePrepSteps 
     */
    this.addRecipe = (recipeName, recipeIngredients, recipePrepSteps) => _recipes.push(new Recipe(recipeName, recipeIngredients, recipePrepSteps))

    /**
     * Remove all recipes whose names are recipeName
     * 
     * @param {string} recipeName
     */
    this.removeRecipe = (recipeName) => _recipes.filter((recipe) => recipe.getName() !== recipeName)

    /**
     * Edit a recipe
     * @param {string} recipeName 
     * @param {{name: string, ingredients: string[], prepSteps: string[]}} propsToEdit
     * @example propsToEdit = {name: Super Pizza, ingredients: ['A', 'B'], prepSteps: ['C', 'D']}
     */
    this.editRecipe = (recipeName, propsToEdit) => {
      const recipe = _recipes.find((recipe) => recipe.getName() === recipeName)

      recipe.setName(propsToEdit.name)

      //If ingredients is evaluated as true...
      if (propsToEdit.ingredients) {
        recipe.getIngredients().length = 0
        //I explain for-of in README.md
        for (const ingredient of propsToEdit.ingredients) {
          recipe.getIngredients().push(ingredient)
        }
      }

      //If prepSteps is evaluated as true...
      if (propsToEdit.prepSteps) {
        recipe.getPrepSteps().length = 0
        for (const step of propsToEdit.prepSteps) {
          recipe.getPrepSteps().push(step)
        }
      }
    }
  }

  /**
   * Giving an array of string (ingredientes), return an array with all recipes that have those ingredients (all of them)
   * 
   * @param {string[]} ingredients An array of string
   * @returns A list of Recipes whose ingredientsList contains "ingredients"
   */
  getRecipesByIngredients(ingredients) {
    return this.getRecipeList().filter((recipe) => ingredients.every((ingredient) => recipe.getIngredients().includes(ingredient)))
  }
}


//-----------Prueba-----------------------------------------------------------------------------------
/**/console.log('\nCrando receta #1')/**/

const recipe1 = new Recipe(
  "Arroz con Leche",
  ["Arroz", "Leche"],
  ["Cocinar", "Emplatar", "Servir"]
)

/**/console.log(`
name: ${recipe1.getName()}
ingredients: ${recipe1.getIngredients()}
prepSteps: ${recipe1.getPrepSteps()}
`)/**/


/**/console.log('Creando receta #2')/**/

const recipe2 = new Recipe(
  "Jugo de Guayaba",
  ["Guayaba", "Azucar", "Sal"],
  ["Pelar Guayaba", "Juntar ingredientes", "Batir"]
)

/**/console.log(`
name: ${recipe2.getName()}
ingredients: ${recipe2.getIngredients()}
prepSteps: ${recipe2.getPrepSteps()}
`)/**/


/**/console.log('Creando el Gestor de recetas incluyendo la receta #1')/**/

const manager = new RecipeManager([recipe1])

/**/for (const [index, recipe] of manager.getRecipeList().entries()) {
  console.log(`
  Receta #${index + 1}
  name: ${recipe.getName()}
  ingredients: ${recipe.getIngredients()}
  prepSteps: ${recipe.getPrepSteps()}
  `)
}/**/


/**/console.log('Añadiendo la receta #2 al gestor de recetas')/**/

manager.addRecipe(recipe2.getName(), recipe2.getIngredients(), recipe2.getPrepSteps())

/**/for (const [index, recipe] of manager.getRecipeList().entries()) {
  console.log(`
  Receta #${index + 1}
  name: ${recipe.getName()}
  ingredients: ${recipe.getIngredients()}
  prepSteps: ${recipe.getPrepSteps()}
  `)
}/**/


const ingredients = ["Arroz"]
/**/console.log(`Lista de recetas que tienen (${ingredients}) en sus ingredientes`)

const recipeList = manager.getRecipesByIngredients(ingredients)

/**/for (const recipe of recipeList) {
  console.log(`
  Receta #${manager.getRecipeList().indexOf(recipe)+1}
  name: ${recipe.getName()}
  ingredients: ${recipe.getIngredients()}
  prepSteps: ${recipe.getPrepSteps()}
  `)
}/**/

const index = 0
/**/console.log(`Editando la receta #${index+1} de la lista de recetas del paso anterior`)/**/
manager.editRecipe(recipeList[index].getName(), {
  name: "Flan",
  ingredients: ["Leche", "Azucar", "Huevo"],
  prepSteps: ["Cocinar", "Enfriar", "Servir"],
})
const list = manager.getRecipeList()


/**/console.log(`Nueva lista de recetas`)/**/
/**/for (const [index,recipe] of list.entries()) {
  console.log(`
  Receta #${index+1}
  name: ${recipe.getName()}
  ingredients: ${recipe.getIngredients()}
  prepSteps: ${recipe.getPrepSteps()}
  `)
}/**/