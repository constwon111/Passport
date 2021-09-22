const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const session = require("express-session");
const { PassportStrategy } = require("./config/passport");
const cors = require("cors");
require("dotenv").config();
// require("dotenv").config({ path: path.join(__dirname, "./config.env") });
const app = express();
app.use(cors({ origin: "http://localhost:3000", credentials: true }));

// Passport Config
PassportStrategy(passport);

// DB Config
const db = require("./config/keys").mongoURI;

// Connect to MongoDB
mongoose
    .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("MongoDB Connected"))
    .catch((err) => console.log(err));

// Express body parser
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
// Express session
app.use(
    session({
        secret: "secret",
        resave: true,
        saveUninitialized: true,
    })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use("/api/users/auth", require("./routes/auth.js"));
app.use("/api/users", require("./routes/users.js"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server running on  ${PORT}`));
