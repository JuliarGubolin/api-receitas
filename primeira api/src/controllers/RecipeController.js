import Recipe from "../models/Recipe.js";
import RecipeService from "../services/RecipeService.js";
import dotenv from "dotenv";
dotenv.config();

const apiKey = process.env.API_KEY;

class RecipeController {
    
    static recipes = async(req, res) => {
      try {
                
        const response = await fetch('https://api.spoonacular.com/recipes/complexSearch', {
          method: 'GET',

          headers: {
            'x-api-key': apiKey,
            'Content-type': 'application/json'
          }
        });
        const appRes = await response.json();
        return res.status(200).send(appRes);
        
      } catch (error) {
        res.send(error);
      }    

    }
    static recipesInformation = async(req,res) => {
        const id = req.params.id;
        try {
        
        const response = await fetch(`https://api.spoonacular.com/recipes/${id}/information`, {
          method: 'GET',
          headers: {
            'x-api-key': apiKey,
            'Content-type': 'application/json'
          }
        });
        const appRes = await response.json();
        return res.status(200).send(appRes);
        
        } catch (error) {
        res.send(error);
        }    
    }
    
    static searchIngredientsWithName = async(req, res) => {
      const name = req.params.name;
      try {
       
        const response = await fetch(`https://api.spoonacular.com/food/ingredients/search?query=${name}`, {
          method: 'GET',
          headers: {
            'x-api-key': apiKey,
            'Content-type': 'application/json'
          }
        });
        const appRes = await response.json();
        return res.status(200).send(appRes);
        
        } catch (error) {
        res.send(error);
        }    
    }

    static saveRecipeInDB = async(req, res) => {
      const id = req.params.id;
      try {
       
        const responseRecipe = await fetch(`https://api.spoonacular.com/recipes/${id}/information`, {
          method: 'GET',
          headers: {
            'x-api-key': apiKey,
            'Content-type': 'application/json'
          }
      });

      const responseRecipeJSON = await responseRecipe.json();

      if(!responseRecipeJSON.id){
        return res.status(409).json({'message': `Id ${id} not found!`})
      }
        const recipe = new Recipe({
          "id": responseRecipeJSON.id,
          "title": responseRecipeJSON.title,
          "summary": responseRecipeJSON.summary,
          "readyInMinutes": responseRecipeJSON.readyInMinutes,
          "servings": responseRecipeJSON.servings,
          "extendedIngredients": responseRecipeJSON.extendedIngredients,
          "instructions": responseRecipeJSON.instructions,
        });
        const duplicate = await Recipe.findOne({ id: id }).exec()
        if (duplicate) { 
            return res.status(409).json({'message': `The recipe with ID ${responseRecipeJSON.id} is already in the database.`});
        } 
        await recipe.save();
        return res.status(200).json({'message': 'Recipe successfully saved'});
      } catch (error) {
        res.status(500).send(error);
      }    
    }

    static findSpoonacularRecipeByIngredient = async(req, res) => {
     const ingredient = req.params.ingredient;
      try {
                
        const response = await fetch(`https://api.spoonacular.com/recipes/findByIngredients?ingredients=${ingredient}`, {
          method: 'GET',
          headers: {
            'x-api-key': apiKey,
            'Content-type': 'application/json'
          }
        });

        const appRes = await response.json();
        return res.status(200).send(appRes);
        
      } catch (error) {
        res.send(error);
      }    
    }

    static findAllRecipesInDB = async(req, res) => {
      try {
       
        const recipes = await RecipeService.findAllRecipesInDB();
        res.status(200).json(recipes);
        
      } catch (error) {
        res.status(500).send({'message': error.message });
      }
    }

    static findRecipeInDbByID = async(req, res) => {
      const id = req.params.id;

      try {
        const recipe = await RecipeService.findRecipeInDbByID(id);
        res.status(200).send(recipe);
      } catch (error) {
        res.status(500).send({'message': error.message });
      }
    }


    static findRecipeInDbByIngredient = async(req, res) => {
      const ingredientName = req.params.ingredientName;
      
      try {
          const recipes = await RecipeService.findRecipeInDbByIngredient(ingredientName);
          res.json(recipes);
      } catch (err) {
          res.status(500).json({ 'message': err.message });
      }
    }

    static updateRecipe = async(req, res) => {
      const id = req.params.id;
      const update = req.body;

      if(!id) return res.status(400).json({ 'message': 'Id is required.' }); 

      try {
        const recipe = await RecipeService.updateRecipe(id, update);
        res.status(200).send(recipe);

      } catch (error) {
        res.status(500).send({'message': error.message});
      }
    }

    static deleteRecipe = async(req, res) => {
      const id = req.params.id;

      try {
        const exists = await Recipe.findOne({_id: id});
        if(!exists) return res.status(404).send({message: 'No recipe found.'});
   
        const result = await RecipeService.deleteRecipe(id);
        return res.send(result);


      } catch (error) {
        res.status(500).send({'message': error.message});
      }
    }


}
export default RecipeController;
