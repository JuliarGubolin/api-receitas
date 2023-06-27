import express from "express";
import apiRoutes from "./recipeRoutes.js";


const routes = (app) => {

    app.use(
        express.json(),
        apiRoutes
    )
}

export default routes;
