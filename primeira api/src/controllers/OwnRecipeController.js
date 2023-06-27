import OwnRecipe from "../models/OwnRecipe.js";
import OwnRecipeService from "../services/OwnRecipeService.js";
import dotenv from "dotenv";
import mongoose from "mongoose";
dotenv.config();

const apiKey = process.env.API_KEY;

class OwnRecipeController{

    static addOwnRecipe = async (req, res) => {
       
          try {
            const ownRecipe = req.body;
            const newOwnRecipe = await OwnRecipeService.addOwnRecipe(ownRecipe);

            res.status(201).send(newOwnRecipe);
        } catch (err) {
            res.status(500).json({ 'message': err.message });
        }
    }

    static getOwnRecipe = async (req, res) => {
        const id = req.params.id;
        if (!id) return res.status(400).json({ 'message': 'Id is required.' });

        try {
            const result = await OwnRecipeService.findOwnRecipe(id);
            if(!result) return res.status(404).json({'message': 'Own Recipe not found!'});
            res.status(200).json(result);
        } catch (error) {
            res.status(500).json({ 'message': error.message });
        }
    }

    static getRecipesByIngredient = async (req, res) => {
        const ingredientName = req.params.ingredientName;
        if (!ingredientName) return res.status(400).json({ 'message': 'Ingredient name is required.' });
        try {
            const recipes = await OwnRecipe.find({"ingredients.name": {"$eq": ingredientName}});
            res.json(recipes)
        } catch (err) {
            res.status(500).json({ 'message': err.message });
        }
    }

    static getAllOwnRecipes= async (req, res) => {
        try {
            const ownRecipes = await OwnRecipeService.findAll();
            res.status(200).send(ownRecipes);
            
        } catch (error) {
            res.status(500).json({ 'message': error.message });
        }
    }

    static deleteOwnRecipe = async (req, res) => {
        const id = req.params.id;
        if (!id){ 
            return res.status(400).json({ 'message': 'Id is required.' });
        }
        try {
            const exists = await OwnRecipeService.findOwnRecipe(id);
            if(!exists) return res.status(404).json({'message': 'Own Recipe not found!'});
            
            await OwnRecipeService.deleteOwnRecipe(id);
            return res.status(200).json({ 'message': `Recipe successfully deleted.` })
        } catch (err) {
            res.status(500).json({ 'message': err.message });
        }
    }

    static addIngredientsOnNewOwnRecipe = async (req, res) => {
        const id = req.params.id;

        const newIngredient = {
            name: req.body.name,
            quantity: req.body.quantity,
            unit: req.body.unit
        }

        try {
            const result = await OwnRecipeService.addIngredientsOnNewOwnRecipe(id, newIngredient);
            return res.status(200).send(result);
        } catch (error) {
            res.json({ 'message': error.message });
        }    
    }

    static updateOwnRecipe = async(req, res) => {
        const id = req.params.id;

        const update = req.body;

        try {
            const ownRecipe = await OwnRecipeService.updateOwnRecipe(id, update);
            res.status(200).send(ownRecipe);
            
        } catch (error) {
            res.status(500).send({message: error.message});
        }
    }
}

export default OwnRecipeController;
