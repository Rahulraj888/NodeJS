const fs = require("fs");


// //sync
// fs.writeFileSync("./test.txt", "Hey There!")

//async
// fs.writeSync("./test.txt", "Hey There!", (err) => {});

// const data = fs.readFile("./contact.txt", "utf-8");
// console.log(data)

// const ob = fs.readFile("./contact.txt", "utf-8", (err, result) => {
//     if (err) console.log(err);
//     console.log(result);
// });
// console.log(ob)

fs.appendFileSync("./test.txt", new Date().getDate().toString());

fs.cpSync("./test.txt", "./copy.txt") //copy data from one file to another file

fs.unlinkSync("./copy.txt"); // delete file

console.log(fs.statSync("./test.txt")); //get stats of a file

fs.mkdirSync("./test_dir"); //creates a directory
