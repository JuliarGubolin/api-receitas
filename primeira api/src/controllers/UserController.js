import fetch from 'node-fetch';

  class UserController {

    static users = async  (req, res) => {
      
      try {
        const authHeader =  req.headers.authorization || req.headers.Authorization;
        if(!authHeader) return res.status(400).send({'message': 'Provide a valid token!'});

        const response = await fetch('http://localhost:3000/users', {
        method: 'GET',
        withCredentials: true,
        credentials: 'include',
        headers: {
          'Authorization': `${authHeader}`,
          'Content-type': 'application/json'
        }
      });

      const jsonResponse = await response.json();
      res.status(response.status).send(jsonResponse);
        
        
      } catch (error) {
        res.status(500).send({'error':error.message});
      }  
      
     
    }

    static findUser = async(req, res) => {
      const id = req.params.id;

      const authHeader =  req.headers.authorization || req.headers.Authorization;
      console.log(authHeader)
      try {
        const response = await fetch(`http://localhost:3000/users/${id}`, {
          method: 'GET',
          withCredentials: true,
          credentials: 'include',
          headers: {
            'Authorization': `${authHeader}`,
            'Content-type': 'application/json'
          }
        });

       const jsonResponse = await response.json();
        return res.status(response.status).send(jsonResponse);
        
      } catch (error) {
        res.send(error);
      }  
    }

    static update = async(req, res) => {
      const id = req.params.id;

        
      try {
        const authHeader =  req.headers.authorization || req.headers.Authorization;
        if(!authHeader) return res.status(400).send({'message': 'Provide a valid token!'});

        const user = await fetch(`http://localhost:3000/users/update/${id}`, {
            method: 'PUT',
            body: JSON.stringify(req.body),
             withCredentials: true,
             credentials: 'include',
             headers: {
              'Authorization': `${authHeader}`,
              'Content-type': 'application/json'
            }
        });
        const userJSON = await user.json();
        res.status(user.status).send(userJSON);
  
      } catch (error) {
        res.status(500).send({'error': error.message});
      }
    }

    static delete = async(req, res) =>{
      const id = req.params.id;

      try {
        const authHeader =  req.headers.authorization || req.headers.Authorization;
        if(!authHeader) return res.status(400).send({'message': 'Provide a valid token!'});

        const response = await fetch(`http://localhost:3000/users/delete/${id}`, {
            method: 'DELETE',
            withCredentials: true,
            credentials: 'include',
            headers: {
              'Authorization': `${authHeader}`,
              'Content-type': 'application/json'
            }
        });
        const responseJSON = await response.json();
        res.status(response.status).send(responseJSON);
  
      } catch (error) {
        res.status(500).send({'error': error.message});
      }
    }
   
    static addFavoriteRecipes = async (req, res) => {
      const id = req.params.id;
      
      if (!req?.params?.id) return res.status(400).json({ "message": 'User ID required' });

      const newFavoriteRecipe = {
    
        "idRecipe": req.body.idRecipe,
        "title": req.body.title
        }

      try {
        const authHeader =  req.headers.authorization || req.headers.Authorization;
        if(!authHeader) return res.status(400).send({'message': 'Provide a valid token!'});

        const response = await fetch(`http://localhost:3000/users/addFavoriteRecipe/${id}`, {
          method: 'PATCH',
          withCredentials: true,
          credentials: 'include',
          body: JSON.stringify(newFavoriteRecipe),
          headers: {
            'Authorization': `${authHeader}`,
            'Content-type': 'application/json'
          }
      });
      
      const responseJSON = await response.json();
      return res.status(response.status).send(responseJSON);
      
      } catch (error) {
        res.status(500).send({'error': error.message});
      }
  }

  }

export default  UserController ;

