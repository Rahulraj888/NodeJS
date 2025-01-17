const User = require("../models/user")

async function handleGetAllUsers(req, res) {
    // res.setHeader("X-myName", "Rahul");
    const allUsers = await User.find({});
    res.status(200).json(allUsers);
}

async function handleGetUserByID(req, res) {
    const user = await User.findById(req.params.id);
    if (!user) res.status(404).json({ msg: "user not found" });
    res.status(200).json(user);
}

async function handleGetUserByIDAndUpdate(req, res) {
    await User.findByIdAndUpdate(req.params.id, {lastName: "changed"})
    return res.json({ msg: "success" });
}

async function handleGetUserByIDAndDelete(req, res) {
    await User.findByIdAndDelete(req.params.id);
    return res.json({ msg: "success" });
}

async function handleCreateNewUser(req, res) {
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
    const user = await User.create({
        firstName: body.first_name,
        lastName: body.last_name,
        email: body.email,
        gender: body.gender,
        jobTitle: body.job_title
    });
    console.log(`user created ${user}`);
    res.status(201).json({"msg": "user created successfully"});
}

module.exports = {
    handleGetAllUsers,
    handleGetUserByID,
    handleGetUserByIDAndUpdate,
    handleGetUserByIDAndDelete,
    handleCreateNewUser
}