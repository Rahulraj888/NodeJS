const express = require("express");
const users = require("./MOCK_DATA.json");
const mongoose = require("mongoose");
const fs = require("fs");

const PORT = 8000;
const app = express();

mongoose
  .connect("mongodb://127.0.0.1:27017/youtube-app-1")
  .then(() => console.log("Mongo Db connected"))
  .catch((err) => console.log(`error in connecting to DB ${err}`));

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  jobTitle: {
    type: String,
  },
  gender: {
    type: String,
  },
}, {timestamps: true});

const User = mongoose.model("user", userSchema);

//middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json({ extended: false }));

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

app.get("/api/users", async(req, res) => {
//   res.setHeader("myName", "Rahul");
//   res.json(users);
    const allUsers = await User.find({});
    res.status(200).json(allUsers);
});

app.get("/users", async(req, res) => {
//   let html = `<ul>${users
//     .map((user) => `<li>${user.first_name}</li>`)
//     .join("")}</ul>`;
//   res.send(html);

    const allUsers = await User.find({});
    let html = `<ul>${allUsers.map((user) => `<li>${user.firstName}- ${user.email}</li>`).join("")}</ul>`;
    res.send(html);
});



// different methods on same route
app
  .route("/api/users/:id")
  .get(async(req, res) => {
    // const id = Number(req.params.id);
    // const user = users.find((user) => user.id === id);
    const user = await User.findById(req.params.id);
    if (!user) res.status(404).json({ msg: "user not found" });
    res.status(200).json(user);
  })
  .patch(async(req, res) => {
    await User.findByIdAndUpdate(req.params.id, {lastName: "changed"})
    return res.json({ msg: "success" });
  })
  .delete(async(req, res) => {
    await User.findByIdAndDelete(req.params.id);
    return res.json({ msg: "success" });
  });



app.post("/api/users", async(req, res) => {
  const body = req.body;
  if (
    !body ||
    !body.first_name ||
    !body.last_name ||
    !body.email ||
    !body.gender ||
    !body.job_title
  ) {
    res.status(400).json({ message: "All fields are required" });
  }

//   users.push({ ...body, id: users.length + 1 });
//   fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data) => {
//     if (err) res.json({ status: "failed to add user" });
//     return res.status(201).json({ status: "successful", id: users.length });
//   });

  const user = await User.create({
    firstName: body.first_name,
    lastName: body.last_name,
    email: body.email,
    gender: body.gender,
    jobTitle: body.job_title
  });
  console.log(`user created ${user}`);
  res.status(201).json({"msg": "user created successfully"});
});



app.listen(PORT, () => {
  console.log(`Server started at PORT: ${PORT}`);
});
