import express  from "express";
import ownRecipeController from '../../controllers/OwnRecipeController.js'
import RecipeController from "../../controllers/RecipeController.js";
import ROLES_LIST from "../../config/roles_list.js";
import verifyRoles from "../../middleware/verifyRoles.js";

const router = express.Router();

router 
  // Recipes from spoonacular
  .get('/recipes',verifyRoles(ROLES_LIST.ADMIN, ROLES_LIST.USER, ROLES_LIST.VIEWER), RecipeController.recipes)
  .get('/recipes/:id/information',verifyRoles(ROLES_LIST.ADMIN, ROLES_LIST.USER, ROLES_LIST.VIEWER), RecipeController.recipesInformation)
  .get('/recipes/findByIngredient/:ingredient',verifyRoles(ROLES_LIST.ADMIN, ROLES_LIST.USER, ROLES_LIST.VIEWER), RecipeController.findSpoonacularRecipeByIngredient )
  .get('/ingredients/search/:name',verifyRoles(ROLES_LIST.ADMIN, ROLES_LIST.USER, ROLES_LIST.VIEWER), RecipeController.searchIngredientsWithName)
  .post('/saveRecipe/:id',verifyRoles(ROLES_LIST.ADMIN, ROLES_LIST.USER), RecipeController.saveRecipeInDB)


  //Recipes from DB
  .get('/DBrecipes',verifyRoles(ROLES_LIST.ADMIN, ROLES_LIST.USER), RecipeController.findAllRecipesInDB)
  .get('/DBrecipes/:id', verifyRoles(ROLES_LIST.ADMIN, ROLES_LIST.USER), RecipeController.findRecipeInDbByID)
  .put('/DBrecipes/update/:id',verifyRoles(ROLES_LIST.ADMIN, ROLES_LIST.USER), RecipeController.updateRecipe)
  .delete('/DBrecipes/delete/:id',verifyRoles(ROLES_LIST.ADMIN), RecipeController.deleteRecipe)
  .get('/DBrecipes/findByIngredient/:ingredientName',verifyRoles(ROLES_LIST.ADMIN, ROLES_LIST.USER), RecipeController.findRecipeInDbByIngredient)

 // Own recipe endpoints
 .post('/ownRecipe',verifyRoles(ROLES_LIST.ADMIN, ROLES_LIST.USER), ownRecipeController.addOwnRecipe)
 .get('/ownRecipe/:id',verifyRoles(ROLES_LIST.ADMIN, ROLES_LIST.USER), ownRecipeController.getOwnRecipe)
 .get('/ownRecipe', verifyRoles(ROLES_LIST.ADMIN, ROLES_LIST.USER),ownRecipeController.getAllOwnRecipes)
 .get('/ownRecipe/findByIngredient/:ingredientName',verifyRoles(ROLES_LIST.ADMIN, ROLES_LIST.USER), ownRecipeController.getRecipesByIngredient)
 .put('/ownRecipe/:id/ingredients',verifyRoles(ROLES_LIST.ADMIN, ROLES_LIST.USER), ownRecipeController.addIngredientsOnNewOwnRecipe)
 .put('/ownRecipe/update/:id',verifyRoles(ROLES_LIST.ADMIN),ownRecipeController.updateOwnRecipe)
 .delete('/ownRecipe/:id', verifyRoles(ROLES_LIST.ADMIN),ownRecipeController.deleteOwnRecipe)


export default router;
