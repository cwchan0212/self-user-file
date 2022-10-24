# Implementation of the use of express + ejs + MongoDB to User Profile Management (CRUD operations)

Express is a minimal and flexible Node.js web application framework that provides robust features for web and mobile applications, EJS is a simple templating language that lets us generate HTML markup with plain JavaScript. No religiousness about how to organize things. MongoDB is a source-available cross-platform document-oriented database program. Classified as a NoSQL database program, MongoDB uses JSON-like documents with optional schemas.

CRUD operations in the MongoDB with the following steps.

## Demonstration
https://bit.ly/3N1itcz


## Folder Structure

```
public/
├─ css/
│  ├─ styles.css
├─ js/
│  ├─ script.js
server/
├─ controllers/
│  ├─ userController.js
├─ models/
│  ├─ database.js
│  ├─ User.js
├─ routes/
│  ├─ userRoutes.js
views/
├─ layouts/
│  ├─ main.ejs
├─ index.ejs
.gitignore
package-lock.json
package.json
README.md
server.js
```

## Steps to complete this project

### Step 1. Open VSCode, type npm init -y in the Terminal to create package.json. 

```sh
npm init -y
```

**package.json**

```json
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

### Step 2. Install the required packages

```sh
npm i express ejs express-ejs-layouts express-session mongodb mongoose dotenv  connect-flash cookie-parser nodemon
```

### Step 3. Create the file server.js at the root level, include the packges and set up web service at the port 3000

**server.js**

```js
const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const flash = require("connect-flash");

const app = express();

# include dotenv to map the process environment variables
require("dotenv").config();

# # web service is listening to the port 3000
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

// create vews folder map view engine to ejs and main content to the layouts
app.set("layout", "./layouts/main");
app.set("view engine", "ejs");

const routes = require("./server/routes/userRoutes.js");
app.use("/", routes);

app.listen(port, () => console.log(`Listening to port ${port}...`));

```

### Step 4. Add "start": "nodemon server.js" in the "scripts" of package.json. nodemon is a tool that helps develop Node.js based applications by automatically restarting the node application when file changes in the directory are detected.

```js
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "nodemon server.js"
  },
```

### Step 5. Under the views folder, index.ejs separate two parts: 
- New User Data - add new user
- Old User Data - list/update/delete user

**index.ejs**

1. New user data

```ejs
<%  
    const titleList = ["Mr", "Ms" , "Mrs" , "Miss", "Monsieur", "Mademoiselle", "Madame"]; 
    const genderList = ["male", "female" ]; 
    const countryList = ["Australia", "Brazil" , "Canada" , "Denmark" , "Finland" , "France" , "Germany" , 
                          "India" , "Iran" , "Ireland" , "Mexico" , "Netherlands" , "New Zealand" , "Norway" , 
                          "Serbia" , "Spain" , "Switzerland" , "Turkey", "Ukraine" , "United Kingdom" , 
                          "United States" ]; 
%>

  <tbody>
<!-- New User Data Start -->
    <form name="new-user" method="post" action="/new">
      <tr>
        <td><i class="fa-solid fa-plus"></i></td>
        <td>
          <select class="form-select form-select-sm" name="title" required>
            <option></option>
<%  titleList.forEach(function(title, index) { %>
              <option value="<%= title%>">
                <%= title %>
              </option>
<%  })  %>
          </select>
        </td>

        <td>
          <input class="form-control form-control-sm" name="first" text="" placeholder="First Name..." 
required />
        </td>

        <td>
          <input class="form-control form-control-sm" name="last" text="" placeholder="Last Name..." 
required />
        </td>

        <td>
          <select class="form-select form-select-sm" name="gender" required>
            <option></option>
<%  genderList.forEach(function(gender, index) { %>
              <option value="<%= gender %>">
                <%= gender %>
              </option>
<%  })  %>
          </select>
        </td>
        <td>
          <input class="form-control form-control-sm" name="dob" type="date" value="" required />
        </td>
        <td>
          <select class="form-select form-select-sm" name="country" required>
            <option></option>
<%  countryList.forEach(function(country, index) {  %>
              <option value="<%= country %>">
                <%= country %>
              </option>
<%  })  %>
          </select>
        </td>
        <td>
          <input class="form-control form-control-sm" name="phone" type="text" placeholder="Phone..." 
required />
        </td>
        <td>
          <input class="form-control form-control-sm" name="email" type="email" placeholder="Email..." 
required />
        </td>
        <td>
          <input class="form-control form-control-sm" name="picture" type="text" placeholder="Picture..." />
        </td>
        <td>
          <i class="fa-solid fa-user"></i>
        </td>
        <td>
          <button type="submit" class="btn btn-outline-secondary" name="submit" value="add">
			<i class="fa-solid fa-pen-to-square"></i>
          </button>
        </td>
      </tr>
    </form>
<!-- New User Data End -->
```

2. Old user data

```ejs
<!-- Old User Data start -->
<% 
    if (typeof users !== "undefined" && users.length > 0) { 
        let count = 1; 
        users.forEach(function(user, index) { 
          let newly = "";
          if (info.length !== 0 && info[0] !== "") {              
              if (user.id === info[1]) {
                newly = " class=newly";
              } else {
                newly = "";
              }
          }          
%>
      <form name="old-users" method="post" action="/user/<%= user._id %>">
      <tr <%= newly %>>
        <td> 
          <span class="count"><%= count %></span>
        </td>
        <td>
          <select name="title-<%= user._id %>" id="title-<%= user._id %>-<%= user.name.title %>" 
class="form-select form-select-sm">
            <option></option>
<%          titleList.forEach(function(title, index) {  %>
              <option value="<%= title%>">
                <%= title %>
              </option>
<%          })  %>
          </select>
        </td>
        <td>
          <input class="form-control form-control-sm" name="first-<%= user._id %>" type="text"
            value="<%= user.name.first %>" />
        </td>
        <td>
          <input class="form-control form-control-sm" name="last-<%= user._id %>" type="text"
            value="<%= user.name.last %>" />
        </td>
        <td>
          <select name="gender-<%= user._id %>" class="form-select form-select-sm" 
 id="gender-<%= user._id %>-<%= user.gender %>">
            <option></option>
<%          genderList.forEach(function(gender, index) { %>
              <option value="<%=gender%>" <%= user.gender === gender ? "selected" : "" %>> <%= gender %>
              </option>
<%          })  %>
          </select>
        </td>
        <td>
          <input class="form-control form-control-sm" name="dob-<%= user._id %>" type="date"
            value="<%= new Date(user.dob.date).toISOString().substring(0,10) %>" />
        </td>
        <td>
          <select name="country-<%= user._id %>" id="country-<%= user._id %>-<%= user.location.country %>" 
class="form-select form-select-sm" >
            <option></option>
<%          countryList.forEach(function(country, index) { %>
              <option value="<%= country%>">
                <%= country %>
              </option>
<%          })  %>
          </select>
        </td>
        <td>
          <input class="form-control form-control-sm" name="phone-<%= user._id %>" type="text" value="<%= user.phone %>" />
        </td>
        <td>
          <input class="form-control form-control-sm" name="email-<%= user._id %>" type="email" value="<%= user.email %>" />
        </td>
        <td>
          <input class="form-control form-control-sm" name="picture-<%= user._id %>" type="text" value="<%= user.picture.large %>" />
        </td>
        <td>
          <img class="thumbnail" src="<%= user.picture.large %>" border="0" />
        </td>
        <td>
          <button type="submit" class="btn btn-outline-secondary" name="save" value="<%= user._id %>"><i
              class="fa-regular fa-floppy-disk"></i></button>
          <button type="submit" class="btn btn-outline-secondary" name="remove" value="<%= user._id %>"><i
              class="fa-solid fa-trash"></i></button>
        </td>
      </tr>
    </form>
<%  
            count++; 
        })
%>
<%
    } 
%>    
        <!-- User Data End -->

  </tbody>
```


> Note: ejs fails to handle the **select** html tag, **selected=""** is then resulted. The alternative method should be used. (See: https://stackoverflow.com/questions/34878180/html-select-option-with-ejs )

```js
              <option value="Miss" selected="">
                Miss
              </option>
```


### Step 6. Under views/layouts folder, main.ejs includes the main body <%- body -%> and the header portion the user table.

**main.ejs**

```ejs

<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title><%= title %></title>
        <link
            href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/css/bootstrap.min.css"
            rel="stylesheet"
            integrity="sha384-Zenh87qX5JnK2Jl0vWa8Ck2rdkQ2Bzep5IDxbcnCeuOxjzrPF/et3URy9Bv1WTRi"
            crossorigin="anonymous"
        />
        <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.0/css/all.min.css"
            integrity="sha512-xh6O/CkQoPOWDdYTDqeRdPCVd1SpvCA9XXcUnZS2FmJNp1coAFzvtCN9BmamE+4aHK8yyUHUSCcJHgXloTyT2A=="
            crossorigin="anonymous"
            referrerpolicy="no-referrer"
        />
        <link href="./css/styles.css" rel="stylesheet" />
    </head>
    <body>
        <div class="banner"> 
            <div class="header">
                <i class="fa-solid fa-angle-left fa-xl"></i>
                <i class="fa-solid fa-percent fa-xl"></i>
                <i class="fa-solid fa-equals fa-xl"></i>
                <p class="h2">User Profile Management</p>                
                <i class="fa-solid fa-percent fa-xl"></i>
                <i class="fa-solid fa-angle-right fa-xl"></i>
            </div> 
            <div>
                <p class="h6 text-muted"> (Demonstration of CRUD Operations)</p>
            </div> 
            <div class="logoset">          
                <img class="logo" src="https://upload.wikimedia.org/wikipedia/commons/7/7e/Node.js_logo_2015.svg" border="0">
                <i class="fa-solid fa-plus fa-xl"></i>
                <img class="logo" src="https://upload.wikimedia.org/wikipedia/commons/9/93/MongoDB_Logo.svg" border="0"> 
            </div>   
       
        </div>

<%  
    if (typeof users !== "undefined" && users.length > 0) {        
%>  
        <div class="message">
            <div class="alert alert-light" role="alert">
                No. of records: <%= users.length %>
            </div>
<%
        if (info.length != 0 && info[0] != "") {
            let infoTag, messageTag;
            if (info[0] === "add") {
                infoTag = "added";
                messageTag = "primary";
            } else if (info[0] === "update") {
                infoTag = "updated";
                messageTag = "success";
            } else if (info[0] === "delete") {
                infoTag = "deleted";
                messageTag = "danger";
            }  
%>
            <div class="alert alert-<%= messageTag %>" role="alert">
                Record <%= infoTag %> - <%= info[1] %>
            </div>
<%
        }
%>
        </div>
<%
    } 
%>
        <div class="App">
            <div class="tableFixHead">
                <table>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Title</th>
                            <th>First</th>
                            <th>Last</th>
                            <th>Gender</th>
                            <th>DOB</th>
                            <th>Country</th>
                            <th>Phone</th>
                            <th>Email</th>
                            <th colspan="2">Picture URL</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <%- body -%>
                </table>
            </div>
        </div>
        <script src="./js/script.js"></script>
  
    </body>
</html>

```

### Step 7. Under server/controllers, userController.js is to perform CRUD operation of the MongoDB.

**userController.js**


```js
require("../models/database");
const { remove } = require("../models/User");
const User = require("../models/User");

exports.homepage = async (req, res) => {
    const info = req.flash("info");
    try {
        const users = await User.find({}).sort({ _id: -1 });
        res.render("index", { title: "User Profile Management", users, info });
    } catch (error) {
        res.status(500).send({ message: error.message || "Error Occurred" });
    }
};

exports.modified = async (req, res) => {
    try {
        let id = req.params.id;
        let action = req.body.save ? "update" : "delete";
        // console.log(req.body);

        if (id) {
            const userData = {
                name: {
                    title: req.body["title-" + id],
                    first: req.body["first-" + id],
                    last: req.body["last-" + id],
                },

                gender: req.body["gender-" + id],
                dob: {
                    date: new Date(req.body["dob-" + id]),
                    age:
                        new Date().getFullYear() -
                        new Date(req.body["dob-" + id]).getFullYear(),
                },

                location: {
                    country: req.body["country-" + id],
                },

                phone: req.body["phone-" + id],
                email: req.body["email-" + id],
                picture: {
                    large: req.body["picture-" + id],
                },
            };

            if (action == "update") {
                User.findByIdAndUpdate(id, userData, function (err, doc) {
                    if (err) {
                        console.log(err);
                    } else {
                        req.flash("info", [action, id]);
                        res.redirect("/");
                    }
                });
            } else if (action == "delete") {
                User.findByIdAndDelete(id, function (err, doc) {
                    if (err) {
                        console.log(err);
                    } else {
                        req.flash("info", [action, id]);
                        res.redirect("/");
                    }
                });
            }
        }
    } catch (error) {
        res.status(500).send({ message: error.message || "Error Occurred" });
    }
};

exports.created = async (req, res) => {
    try {
        const userData = {
            name: {
                title: req.body.title,
                first: req.body.first,
                last: req.body.last,
            },

            gender: req.body.gender,
            dob: {
                date: new Date(req.body.dob),
                age:
                    new Date().getFullYear() -
                    new Date(req.body.dob).getFullYear(),
            },

            location: {
                country: req.body.country,
            },

            phone: req.body.phone,
            email: req.body.email,
            picture: {
                large: req.body.picture,
            },
        };

        const newUser = User(userData);
        newUser.save();

        req.flash("info", ["add", newUser._id]);
        res.redirect("/");
    } catch (error) {
        res.status(500).send({ message: error.message || "Error Occurred" });
    }
};

```

### Step 8. Under server/models, User.js sets up the User schema with the aid of [JSON-schema converter](https://jsonformatter.org/json-to-jsonschema) .

**User.js**

```js

const mongoose = require("mongoose");

// Tools: JSON -> Mongoose Schema
// https://transform.tools/json-to-mongoose

const userSchema = new mongoose.Schema({
  name: {
    type: { title: String, first: String, last: String },
    required: "This field is required.",
  },

  gender: {
    type: String,
    required: "This field is required.",
  },

  dob: {
    date: {
      type: "Date",
    },
    age: {
      type: "Number",
    },
  },

  location: {
    timezone: {
      offset: {
        type: "String",
      },
      description: {
        type: "String",
      },
    },
    street: {
      number: {
        type: "Number",
      },
      name: {
        type: "String",
      },
    },
    city: {
      type: "String",
    },
    state: {
      type: "String",
    },
    country: {
      type: "String",
    },
    postcode: {
      type: "Number",
    },
    coordinates: {
      latitude: {
        type: "String",
      },
      longitude: {
        type: "String",
      },
    },
  },

  phone: {
    type: String,
    required: "This field is required.",
  },

  email: {
    type: String,
    required: "This field is required.",
  },
  registered: {
    date: {
      type: "Date",
    },
    age: {
      type: "Number",
    },
  },

  login: {
    uuid: {
      type: "String",
    },
    username: {
      type: "String",
    },
    password: {
      type: "String",
    },
    salt: {
      type: "String",
    },
    md5: {
      type: "String",
    },
    sha1: {
      type: "String",
    },
    sha256: {
      type: "String",
    },
  },

  picture: {
    type: { large: String, medium: String, thumbnail: String },
  },
});

module.exports = mongoose.model("User", userSchema);

```

### Step 9. Under server/models, database.js is the setting of the MongoDb.

**database.js**

```
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function(){
  console.log('Connected')
});
```

### Step 10. Under server/routes, userRoutes.js directs the page to different pages for CRUD operation. 

**userRoutes.js**

```js
const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

/** App Routes **/

router.get("/", userController.homepage);
router.post("/user/:id", userController.modified);
router.post("/new", userController.created);
module.exports = router;
```
