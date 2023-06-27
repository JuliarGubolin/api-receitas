import Recipe from '../models/Recipe.js'
import dotenv from "dotenv";
dotenv.config();

const apiKey = process.env.API_KEY;


class RecipeService {

    static findAllRecipesInDB = async() => {

        const recipes = await Recipe.find();
       
        return recipes;
    }

    static findRecipeInDbByID = async(id) => {
        const recipe = await Recipe.findOne({_id: id});
        if (!recipe) return { 'message': 'No recipe found' };
        return recipe;
    }

    static findRecipeInDbByIngredient = async(ingredientName) => {
        const recipes = await Recipe.find({"extendedIngredients.name": {"$eq": ingredientName}});
        if(!recipes) return { 'message': 'No recipes found' };
        return recipes;
    }

    static updateRecipe = async(id, update) => {
        const exists = await Recipe.exists({_id: id});
        if(!exists) return { 'message': 'Recipe not found!' }; 

        await Recipe.findByIdAndUpdate(id, {$set: update});

        const updatedRecipe = await Recipe.findById(id);
        return updatedRecipe;
    }

    static deleteRecipe = async(id) => {

        await Recipe.deleteOne({_id: id});
        return { 'message': 'Recipe deleted successfully.' };

    }

    
}
export default RecipeService;
