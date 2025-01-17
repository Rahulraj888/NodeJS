const express = require("express");

const { dbConnection } = require("./connect");
const userRouter = require("./routes/user");
const logReqRes = require("./middlewares/index");

const PORT = 8000;
const app = express();

//Mongo DB Connection
dbConnection("mongodb://127.0.0.1:27017/youtube-app-1")
  .then(() => console.log("Mongo Db connected"))
  .catch((err) => console.log(`error in connecting to DB ${err}`));

//middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json({ extended: false }));
app.use(logReqRes("logs.txt"));

//Routes
app.use("/api/users", userRouter);

app.listen(PORT, () => {
  console.log(`Server started at PORT: ${PORT}`);
});
