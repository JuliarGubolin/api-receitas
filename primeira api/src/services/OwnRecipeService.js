import { json } from 'express';
import OwnRecipe from '../models/OwnRecipe.js'

class OwnRecipeService {

    static addOwnRecipe = async(ownRecipe) => {
        const exists = await OwnRecipe.findOne({title: ownRecipe.title });
        if(exists) return {message: 'Own Recipe already exists!'};

        const newOwnRecipe = await OwnRecipe.create(ownRecipe);
        return newOwnRecipe;
    }

    static addIngredientsOnNewOwnRecipe = async(id, ingredient) => {
        const recipe = await this.findOwnRecipe(id);
        if(!recipe) return {message: 'Own recipe not found!'};

        recipe.ingredients.push(ingredient);
        recipe.save();
        const updatedRecipe = await OwnRecipe.findOne({_id: id}).exec();
        return updatedRecipe;
    }

    static findAll = async() => {
        const ownRecipes = await OwnRecipe.find().populate({
            path: 'ingredients.unit',
            select: 'name'
        }).exec();
        return ownRecipes;
    }

    static findOwnRecipe = async( id ) =>{
        const ownRecipe = await OwnRecipe.findOne({_id: id}).populate({
            path: 'ingredients.unit',
            select: 'name'
        }).exec();
        return ownRecipe;

    }

    static findRecipesByIngredient = async( {ingredientName}) => {
        
        const recipes = (await OwnRecipe.findOne({"ingredients.name": {"$eq": ingredientName}}));
        return recipes;
    }

    static deleteOwnRecipe = async(id) => {
      
        await OwnRecipe.deleteOne({_id: id});
        return {message: 'Own recipe deleted successfully.'}
    }


    static updateOwnRecipe = async(id, update) => {
        const recipe = await this.findOwnRecipe(id);
        if(!recipe) return {message: 'Own recipe not found!'};

        await OwnRecipe.findByIdAndUpdate(id, {$set: update});
        const updatedRecipe = await OwnRecipe.findOne({_id: id});
        return updatedRecipe;
    }

    
}
export default OwnRecipeService;
