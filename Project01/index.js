const express = require("express");
const users = require("./MOCK_DATA.json");
const fs = require("fs");

const PORT = 8000;
const app = express();

//middleware
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  console.log(req.headers);
  console.log("Middleware 1");
  next();
});

app.use((req, res, next) => {
  let msg = `${Date.now()}: ${req.path} ${req.method}`;
  fs.appendFile("logs.txt", msg, (err, data) => {
    console.log("Middleware 2");
    next();
  });
});

app.get("/", (req, res) => {
  //Always add X to custom headers
  res.setHeader("X-myName", "Rahul");
  res.send(`Hello World!`);
});

app.get("/api/users", (req, res) => {
  res.setHeader("myName", "Rahul");
  res.json(users);
});

app.get("/users", (req, res) => {
  let html = `<ul>${users
    .map((user) => `<li>${user.first_name}</li>`)
    .join("")}</ul>`;
  res.send(html);
});



// different methods on same route
app
  .route("/api/users/:id")
  .get((req, res) => {
    const id = Number(req.params.id);
    const user = users.find((user) => user.id === id);
    res.json(user);
  })
  .post((req, res) => {
    //TODO -- create post request
    return res.json({ status: "pending" });
  })
  .patch((req, res) => {
    // TODO create patch request
    return res.json({ status: "pending" });
  })
  .delete((req, res) => {
    // TODO create delete request
    return res.json({ status: "pending" });
  });



app.post("/api/users", (req, res) => {
  const body = req.body;
  users.push({ ...body, id: users.length + 1 });
  fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data) => {
    if (err) res.json({ status: "failed to add user" });
    return res.json({ status: "successful", id: users.length });
  });
});


app.listen(PORT, () => {
  console.log(`Server started at PORT: ${PORT}`);
});