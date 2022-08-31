const {addUser, getUsers, deleteUser, getUser, updateUser} = require("./repository");

const express = require('express');
const router = express.Router();

router.use(function timeLog(req, res, next) {
    console.log('Time: ', Date.now());
    next();
});

router.get('/',async (req, res) => {
    let users = await getUsers(req.query.search);
    res.send(users);
});

router.get('/:id',async (req, res) => {
    const id = req.params.id;
    const user = await getUser(id);
    if (user.length) {
        res.send(user);
    } else {
        res.sendStatus(404);
    }
});

router.post('/', async (req, res) => {
    let name = req.body.name;
    if (!name) {
        name = 'default value'
    }
    await addUser(name);
    res.send({success: true});
});

router.delete('/',async (req, res) => {
    const id = req.params.id;
    const user = await deleteUser(id);
    if (user) {
        res.send({success: true});
    } else {
        res.sendStatus(404);
    }
});

router.put('/',async (req, res) => {
    const name = req.body.name;
    const id = req.body.id;
    await updateUser(id, name);
    res.send({isUpdated: true});
});

module.exports = router;
