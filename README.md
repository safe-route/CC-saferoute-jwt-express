# JWT Service implementation

## Summary

This is the code for JWT server, implementing jwt as a form of authentication for users. 

## Running The Service

Install all required dependency with `npm install`, run the server with either `nodemon app.js` or `node app.js`, with nodemon is better meant for development purpose.

## Libraries and Tools Used

1. Major ones:
- Passportjs: As authentication middleware, reason why it is used is because arguably "building an auth system from scratch especially without any real experience is risky" so we use it to prevent any fuss and produce a less likely unsecure code. Tutorials used for setting up is available here [passport local strategy](https://www.passportjs.org/docs/).
- Express: Backend web application framework, used only because it is very popular.
- Mongoose: MongoDB database connector for node based framework, largely compatible with some existing framework.
- jsonwebtoken: for generating jwt

2. Minor ones:
- dotenv: for simulating environment variables
- cors: self explained
- bcrypt: for encrypting password

**!!IMPORTANT!!**

Change the .env values to your development environment variables, the value included are by no means secret, but it is not recommended. **SET `.env` in `.gitignore` if moving to prod version**

## Endpoints

- `localhost:3000/signup` form encoded, required payload with **POST** method is `username` and `password`
- `localhost:3000/login` form encoded, required payload is the same with signup with **POST** method, `username` and `password`
- `localhost:3000/user/profile` serving as a protected route simulation, can only be accessed if you have the right token **GET** method with Bearer token.

## Usage example

Using HTTPie

```bash
$ http POST :3000/signup username=<username> password=<password>

<HTTPie details>

{
    "message": "Signup successful",
    "user": {
        "_id": "[id]",
        "password": "[encrypted password]",
    }
}

$ http POST :3000/login username=<username> password=<password>

<HTTPie details>

{
    "token": "ey..."
}


$ export JWT="ey..."


$ http GET :5000/user/profile Authorization:"Bearer $JWT"

<HTTPie details>

{
    "message": "You made it to the secure route",
    "user": {
        "_id": "[id]"
    },
    "token": "[token]"
}
