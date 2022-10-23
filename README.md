# Implementation of the use of express + ejs + MongoDB to User Profile Management (CRUD operations)

Express is a minimal and flexible Node.js web application framework that provides robust features for web and mobile applications, EJS is a simple templating language that lets you generate HTML markup with plain JavaScript. No religiousness about how to organize things. MongoDB is a source-available cross-platform document-oriented database program. Classified as a NoSQL database program, MongoDB uses JSON-like documents with optional schemas.

CRUD operations in the MongoDB with the following steps.
--

Open VSCode, type npm init -y to create package.json. 

```
npm init -y
```

package.json

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
```
npm i express ejs express-ejs-layouts express-session mongodb mongoose dotenv connect-flash cookie-parser nodemon
```

Create the file server.js at the root level, include the packges and set up web service at the port 3000

server.js
```
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

Add "start:": nodemon sever.js in the "script" of package.json. nodemon is a tool that helps develop Node.js based applications by automatically restarting the node application when file changes in the directory are detected.

```
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "nodemon server.js"
  },
```

Under the **views** folder, **index.ejs** seperate two parts: 
1) New User Data (to add new user)
2) Old User Data (to list/update/delete user)

Here is the new user data.

```
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
          <input class="form-control form-control-sm" name="first" text="" placeholder="First Name..." required />
        </td>

        <td>
          <input class="form-control form-control-sm" name="last" text="" placeholder="Last Name..." required />
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
          <input class="form-control form-control-sm" name="phone" type="text" placeholder="Phone..." required />
        </td>
        <td>
          <input class="form-control form-control-sm" name="email" type="email" placeholder="Email..." required />
        </td>
        <td>
          <input class="form-control form-control-sm" name="picture" type="text" placeholder="Picture..." />
        </td>
        <td>
          <i class="fa-solid fa-user"></i>
        </td>
        <td>
          <button type="submit" class="btn btn-outline-secondary" name="submit" value="add"><i
              class="fa-solid fa-pen-to-square"></i>
          </button>
        </td>
      </tr>
    </form>
<!-- New User Data End -->
```

Here is the old user data.

```
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
          <select name="title-<%= user._id %>" id="title-<%= user._id %>-<%= user.name.title %>" class="form-select form-select-sm">
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
          <select name="gender-<%= user._id %>" class="form-select form-select-sm" id="gender-<%= user._id %>-<%= user.gender %>">
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
          <select name="country-<%= user._id %>" id="country-<%= user._id %>-<%= user.location.country %>" class="form-select form-select-sm" >
            <option></option>
<%          countryList.forEach(function(country, index) { %>
              <option value="<%= country%>">
                <%= country %>
              </option>
<%          })  %>
          </select>
        </td>
        <td>
          <input class="form-control form-control-sm" name="phone-<%= user._id %>" type="text"
            value="<%= user.phone %>" />
        </td>
        <td>
          <input class="form-control form-control-sm" name="email-<%= user._id %>" type="email"
            value="<%= user.email %>" />
        </td>
        <td>
          <input class="form-control form-control-sm" name="picture-<%= user._id %>" type="text"
            value="<%= user.picture.large %>" />
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

Under **views/layouts** folder, **main.ejs** includes the main body and the header the user table.

```
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




Demonstration:
https://bit.ly/3N1itcz

https://self-user-file.cwchan0212.repl.co/
