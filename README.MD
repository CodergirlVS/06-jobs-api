#### Setup

```bash
npm install && npm start
```

#### Database Connection

1. Import connect.js
2. Invoke in start()
3. Setup .env in the root
4. Add MONGO_URI with correct value

#### Routers

- auth.js
- jobs.js

#### User Model

Email Validation Regex

```regex
/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
```

#### Register User

- Validate - name, email, password - with Mongoose
- Hash Password (with bcryptjs)
- Save User
- Generate Token
- Send Response with Token

#### Login User

- Validate - email, password - in controller
- If email or password is missing, throw BadRequestError
- Find User
- Compare Passwords
- If no user or password does not match, throw UnauthenticatedError
- If correct, generate Token
- Send Response with Token

#### Mongoose Errors

- Validation Errors
- Duplicate (Email)
- Cast Error (syntax doesnt match the mongoose model)

#### Security

- helmet (prevents neumorous http attacks)
- cors (api is accessible from different domains)
- xss-clean (sanitizes user input in req.body, req.params, req.query. When attackers tries to inject malacious code it protects against cross site scripting attack )
- express-rate-limit (limits user access)

Swagger UI

```yaml
/jobs/{id}:
  parameters:
    - in: path
      name: id
      schema:
        type: string
      required: true
      description: the job id
```

#### Postman to auto accept Barer token
pass this code inside the Test window for Login and Register

const jsonData = pm.response.json()
pm.globals.set("accessToken", jsonData.token);

Then where we want to use it, we will go to authorization and type is Bearer token.

### Heroku dependencies
 "engines": {
    "node": "16.x"
  }
  change port or PORT in app.js
  git heroku login
  git heroku create
  git add . git commit -m 
  git push heroku main
  
