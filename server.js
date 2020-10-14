//Pull in our required dependencies
const express = require("express");
const bodyParser = require("body-parser");
const exphbs = require("express-handlebars");
const expressSession = require("express-session");
const MongoStore = require("connect-mongo")(expressSession);
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");
const cookieParser = require("cookie-parser");
// Initialize our app using express()
const app = express();

require("dotenv").config();
// require("./config/passport");

// require routes
const pageRoutes = require("./routes/pageRoutes");
const authenticationRoutes = require("./routes/authentication_routes");
const recipesRoutes = require("./routes/recipeRoutes");

// Apply the middleware function for bodyparser so we can use it
//Bodyparser middleware
//express-handlebars
app.engine("handlebars", exphbs());
app.set("view engine", "handlebars");
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());
app.use(cookieParser());
//session
app.use(
  session({
    secret: "secret key",
    resave: false,
    saveUninitialized: true,
    cookie: { expires: 6000 },
    store: new MongoStore({ mongooseConnection: mongoose.connection })
  })
);

// Pull in our MongoURI from our keys.js file and connect to our MongoDB database
const db = process.env.ATLAS_URI;
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
  })
  .then(() =>
    console.log("--------------- Connected to DB! 🛢️ ---✌️ -----------")
  )
  .catch(err => console.log(`Error: 👻  ${err} `));

//passport

app.use(passport.initialize());
app.use(passport.session());

//routes
app.use("/", pageRoutes);
app.use("/user", authenticationRoutes);
app.use("/recipes", recipesRoutes);

// Set the port for our server to run on and have our app listen on this port
const port = process.env.PORT || 4040; //process.env.port is Heroku's port if you choose to deploy the app there
app.listen(port, () =>
  console.log(`🎉 🎉 🎉 Server is up and running on port ${port}! 🎉 🎉 🎉`)
);
