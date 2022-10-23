# Implementation of the use of express + ejs + MongoDB to User Profile Management (CRUD operations)

Express is a minimal and flexible Node.js web application framework that provides robust features for web and mobile applications, EJS is a simple templating language that lets you generate HTML markup with plain JavaScript. No religiousness about how to organize things. MongoDB is a source-available cross-platform document-oriented database program. Classified as a NoSQL database program, MongoDB uses JSON-like documents with optional schemas.

CRUD operations in the MongoDB with the following steps.
1. Set up the follow

Step 1:

Open VSCode, type npm init -y to create package.json. 

```
npm init -y
```


```
{
  "name": "user",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC"
}
```

Install the required packages
sh```
npm i express ejs express-ejs-layouts express-session mongodb mongoose dotenv connect-flash cookie-parser nodemon
```
Step 2:
Create the file server.js at the root level

- Set up the web server with port 3000
- Create views folder mapping ejs layout 
- Create server folder routing the pages, creating database model and controlling CRUD of the data 

sh```
const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const flash = require("connect-flash");

const app = express();
require("dotenv").config();
const port = process.env.PORT || 3000;


app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(expressLayouts);

app.use(cookieParser("UserDataSecure"));
app.use(
    session({
        secret: "secret key",
        resave: true,
        saveUninitialized: true,
    })
);

app.use(flash());

app.set("layout", "./layouts/main");
app.set("view engine", "ejs");

const routes = require("./server/routes/userRoutes.js");
app.use("/", routes);

app.listen(port, () => console.log(`Listening to port ${port}...`));

```


RandomUser is an API providing developers with randomly generated users to be used as placeholders for testing purposes. This makes the tool similar to Lorem Ipsum but is a placeholder for people instead of text. The API can return multiple results and specify generated user details such as gender, email, image, username, address, title, first and last name, and more.


Express is a minimal and flexible Node.js web application framework that provides robust features for web and mobile applications. 

EJS is a simple templating language that lets you generate HTML markup with plain JavaScript. No religiousness about how to organize things. No reinvention of iteration and control flow. It's just plain JavaScript.


MongoDB is a source-available cross-platform document-oriented database program. Classified as a NoSQL database program, MongoDB uses JSON-like documents with optional schemas. MongoDB is developed by MongoDB Inc. and licensed under the Server Side Public License (SSPL) which is deemed non-free by several distributions. 



<a href="#"><img src="https://webimages.mongodb.com/_com_assets/cms/kusb9stg1ndrp7j53-MongoDBLogoBrand1.png" width="100"></img></a>

Demonstration:
https://bit.ly/3N1itcz

https://self-user-file.cwchan0212.repl.co/
