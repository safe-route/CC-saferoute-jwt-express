# JWT Service implementation

Implementing Auth system meant for a fallback plan, this auth system is meant to leverage the usage of JWT (json web token) to build a (not so from scratch authentication and authorization system). There is a concern of building this system as the server doesn't **store anything** other than to verify the generated jwt which is stored in MongoDB Atlas, as most of our resources is based like a microservice which means all of the services need to be able to check that the jwt generated is valid and comes from this server.

## Summary

This is the code for JWT server, implementing jwt as a form of authentication for users. Using passport js (as we have a concern whether it is ok to implement your own auth system because we know it is bad to build your own encryption program) to leverage the tried and tested middleware for authentication, and using mongoose to build a data schema for MongoDB Atlas usage.

## Reference

Taken directly from the website jwt.io, json web token is depicted as "JSON Web Tokens are an open, industry standard RFC 7519 method for representing claims securely between two parties.". Is a token based authentication which compared to session (which uses cookies to store session) we use local storage (in browser) to store the token.

This server first act to register the user and then give the user their JWT when they are logging in which in turn used in the request

```bash
...
Authorization: Bearer [header].[payload].[signature]
...
```

which in our cloud computing path acts like the `Authorization Header in GCP` in which it is used to verify the user have enoug permission and IS the user itself.

The authorization bearer thus in turn can access any of the resource which is **protected** and given access to their role.

for more details about jwt look around [here](https://jwt.io/introduction) and then for passport js authorization quickstart (which is used for the basis of the code used in middleware) see this [quickstart guide from passport js](https://www.passportjs.org/tutorials/password/), for more details about mongoose usage look [here](https://mongoosejs.com/docs/). Basic implementation is available [here](https://www.bezkoder.com/node-js-jwt-authentication-mysql/) (and serves as the basis for this server too).

## Structure

The structure of the project is as follows:
- src: Put your additional backend code here, even though there is nothing to be build, if you plan to using typescript src might be the best pplace to put your raw code (even if there is nothing to build)
    - api: is the directory where you need to put your actual code in
        - middleware: as the name suggest is for middleware
        - models: for storing the schemas for mongoose
        - routes: are for defining the route
- app.js: is the main function
- databaseConnection: Stores mongoose connection string and options
- Dockerfile: docker image build configuration for **server only**
- docker-compose: Build the current server image with local mongoose instances

## Usage

### Running The Service

Install all required dependency with `npm install`, run the server with either `nodemon app.js` or `node app.js`, with nodemon is better meant for development purpose.

### Libraries and Tools Used

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

### Endpoints

- `localhost:3000/signup` form encoded, required payload with **POST** method is `username` and `password`
- `localhost:3000/login` form encoded, required payload is the same with signup with **POST** method, `username` and `password`
- `localhost:3000/user/profile` serving as a protected route simulation, can only be accessed if you have the right token **GET** method with Bearer token.

### Request example

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
