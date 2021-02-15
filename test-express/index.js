const express = require("express");
const app = express();

const logger = require("./custome.module");
const helmet = require("helmet");
const morgan = require("morgan");
// const config = require("config");

const courses = require("./router/courses");
const home = require("./router/home");

app.use("/api/courses", courses);
app.use("/", home);

// console.log("Host : " + config.get("mail.host"));
// console.log("Name : " + config.get("mail.name"));
// console.log("Password : " + config.get("mail.password"));

// middleware
// when use post method and receive data from body use it
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // to send key & value in body
app.use(express.static("public"));
app.use(helmet());
app.use(logger);

// to render pages from index.js file when calling any route
app.set("view engine", "pug"); // extension file you use to render
app.set("views", "./views"); // default

console.log(`NODE_ENV: ${process.env.NODE_ENV}`);
console.log(`app: ${app.get("env")}`);

// make logger only when deelopment
// u can change NODE_ENV by using export NODE_ENV = production
//  NODE_ENV is node environment that run you the project

if (app.get("env") === "development") {
  app.use(morgan("tiny")); // make logger for any request
}

const port = process.env.PORT || 3000;
// export PORT=5000; in terminal
app.listen(port, () => {
  console.log(`Server Listen On port ${port}`);
});
