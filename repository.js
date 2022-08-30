const crypto = require('crypto');
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: String,
    user_id: String
});
const User = mongoose.model('MyUser', userSchema);

const getUsers = (search) => {
    if (!search) {
        return User.find();
    } else {
        return User.find({name: new RegExp(search)});
    }
};
const getUser = (id) => {
    return User.find({user_id: id});
};

const addUser = async (name) => {
    const hero = new User({ name, user_id: crypto.randomUUID() });
    return hero.save();
};

const deleteUser = (id) => {
    return User.deleteOne({user_id: id});
};

const updateUser = (id, name) => {
    return User.update({user_id: id}, {name});
};

exports.getUsers = getUsers;
exports.getUser = getUser;
exports.addUser = addUser;
exports.deleteUser = deleteUser;
exports.updateUser = updateUser;
