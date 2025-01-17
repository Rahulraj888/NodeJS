const express = require("express");
const User = require("../models/user")
const {handleGetAllUsers, handleGetUserByID, 
    handleGetUserByIDAndUpdate, handleGetUserByIDAndDelete, handleCreateNewUser} = require("../controllers/user")

const router = express.Router();

router.route("/")
.get(handleGetAllUsers)
.post("/", handleCreateNewUser);


// different methods on same route
router
.route("/:id")
.get(handleGetUserByID)
.patch(handleGetUserByIDAndUpdate)
.delete(handleGetUserByIDAndDelete);


module.exports = router;