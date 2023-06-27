import express from 'express';
import users from './user.js'


const routes = (app) => {
   
    app.use(
        express.json(),
        users
        
    )
}
export default routes;
