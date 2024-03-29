const express = require("express");
const app = express();
const mongoose = require("mongoose");
const passport = require("passport");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const flash = require("express-flash");
const logger = require("morgan");
const methodOverride = require("method-override");
const connectDB = require("./config/database");
const mainRoutes = require("./routes/main");
const priceListsRoutes = require("./routes/priceLists");
const portalRoutes = require("./routes/portal");
const documentsRoutes = require("./routes/docs");
const productIDRoutes = require("./routes/productID");
const vueProductIDRoutes = require("./routes/vueProductID");
const jobsRoutes = require("./routes/jobs");

require("dotenv").config({ path: "./config/.env" });

// Passport config
require("./config/passport")(passport);

connectDB().then(() => {
  app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}.`);
  });
});

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(logger("dev"));

//Use forms for put / delete
app.use(methodOverride("_method"));

// Sessions
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

app.use(flash());

app.use("/", mainRoutes);
app.use("/priceLists", priceListsRoutes);
app.use("/portal", portalRoutes);
app.use("/docs", documentsRoutes);
app.use("/productID", productIDRoutes);
app.use("/vueProductID", vueProductIDRoutes);
app.use("/jobs", jobsRoutes);
