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

### Swagger
-Postman export the api and save in as week12.json: Make sure the URL is same for all the paths
- open https://www.apimatic.io/account/register
- import week12.json file
- **basic setting** 
-Back to home page: (apimatics.io) on the file, select *Export API*:
API version is 1.0, *Export Format is OpenAPI v3.1 (YAML)* and *Export* the file
- Open swagger editor and paste the exported code init. (https://editor.swagger.io/)
**Test the code is functioning**
- remove any additonal tags and schema related code
- search for swagger ui parameters to get dynamic params and nor hard code the params
- copy the part of the code from common Parameters like this
Replace the /Job/6309a140206e29229452777d with below code so we dont have a specific id for the job.
replace the hard coded job id for update and get single or delete and at the beginning paste this code and define the parameters

 /jobs/{id}:
    parameters:
      - in: path
        name: id
        schema:
          type: string
        required: true
        description: The job ID

-Test if all the routes are working as required.

- create a file swagger.yaml and paste the entire code from the editor.

-code in app.js
--*Import swagger-UI with this code:*
  // swagger
    const swaggerUI = require('swagger-ui-express');
    const YAML = require("yamljs")
    const swaggerDocument = YAML.load('./swagger.yaml')

--*Type this code after all the security codes*
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument))
