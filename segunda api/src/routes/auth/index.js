import express from 'express';
import auth from './auth.js';
import logout from './logout.js';
import refresh from './refresh.js';
import register from './register.js';

const routes = (app) => {
    app.use(
        express.json(),
        auth,
        logout,
        refresh,
        register
        
    )
}
export default routes;
