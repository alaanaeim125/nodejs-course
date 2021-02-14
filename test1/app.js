// var log = require("./logger");

// function sayHello(name) {
//     console.log("Hello , " + name)
// }

// sayHello("Alaa Naeeim");
// console.log(log);
// log.logger("Hello In Nodejs Course");

// var path = require("path");
// const parseObject = path.parse(__filename);
// console.log(parseObject);

// var os = require("os");
// console.log(`Total Memory : ${os.totalmem}`);
// console.log(`Free Memory :  ${os.freemem}`);

// module Fs

// var fs = require("fs");

// var files = fs.readdirSync("./");
// console.log(files);

// fs.readdir("./", function (err, files) {
//   if (err) {
//     console.log("Error Occured When Read Files");
//   } else {
//     console.log(files);
//   }
// });

// const Logger = require("./logger");
// const logger = new Logger();

// const EventEmitter = require("events");
// const emitter = new EventEmitter();
// logger is an object and have EventEmitter

// logger.on("messageLogged", function (msg) {
//   console.log("messageLogged " + msg);
// });

// logger.log("Alaa");

// http module to make restful api

const http = require("http");

const server = http.createServer((req, res) => {
  if (req.url === "/") {
    res.write("Hello World");
    res.end();
  } else if (req.url === "/api/courses") {
    res.write(JSON.stringify([1, 2, 3]));
    res.end();
  }
});

server.listen(3000, () => {
  console.log("Server Listen On 3000");
});
