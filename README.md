# JWT Service implementation

## Summary

This is the code for JWT server, implementing jwt as a form of authentication for users. 

## Running The Service

Install all required dependency with `npm install`, run the server with either `nodemon app.js` or `node app.js`, with nodemon is better meant for development purpose.

**!!IMPORTANT**

Change the .env values to your development environment variables, the value included are by no means secret, but it is not recommended. **SET `.env` in `.gitignore` if moving to prod version

## Endpoints

- `localhost:3000/signup` form encoded, required payload with **POST** method is `username` and `password`
- `localhost:3000/login` form encoded, required payload is the same with signup `username` and `password`
- `localhost:3000/user/profile` serving as a protected route simulation, can only be accessed if you have the right token.