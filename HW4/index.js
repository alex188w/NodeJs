const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');
const pathTooFile = path.join(__dirname, 'users.json');
const joi = require('joi');
app.use(express.json());
const schema = joi.object({
    firstName: joi.string().min(2).required(),
    secondName: joi.string().min(2).required(),
    age: joi.number().min(0).max(150).required(),
    city: joi.string().min(1)
});

app.get("/users", (req, res) => {
    try {
        const users = readUsersFromFile();
        res.send({ users });
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Internal Server Error' });
    }
});

app.get('/users/:id', (req, res) => {
    try {
        const users = readUsersFromFile();
        const userId = +req.params.id;
        const user = users.find(user => user.id === userId);
        if (user) {
            res.send({ user });
        } else {
            res.status(404).send({ user: null });
        }
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Internal Server Error' });
    }
});

app.post("/users", (req, res) => {
    try {
        const result = schema.validate(req.body);
        if (result.error) {
            return res.status(400).send({ error: result.error.details });
        };
        const users = readUsersFromFile();
        const uniqueID = users.length + 1;
        const newUser = { id: uniqueID, ...req.body };
        users.push(newUser);
        writeUsersToFile(users);
        res.send({ id: uniqueID });
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Internal Server Error' });
    }
});

app.put("/users/:id", (req, res) => {
    try {
        const result = schema.validate(req.body);
        if (result.error) {
            return res.status(400).send({ error: result.error.details });
        };
        const id = +req.params.id;
        let users = readUsersFromFile();
        const user = users.find((user) => user.id === id);
        if (user) {
            user.firstName = req.body.firstName;
            user.secondName = req.body.secondName;
            user.city = req.body.city;
            user.age = req.body.age;
            writeUsersToFile(users);
            res.send({ user });
        } else {
            res.status(404);
            res.send({ user: null });
        }
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Internal Server Error' });
    }
});

app.delete("/users/:id", (req, res) => {
    try {        
        const id = +req.params.id;
        let users = readUsersFromFile();
        const user = users.find((user) => user.id === id);
        if (user) {
            const userIndex = users.indexOf(user);
            users.splice(userIndex, 1);
            writeUsersToFile(users);
            res.send({ user });
        } else {
            res.status(404);
            res.send({ user: null });
        }
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Internal Server Error' });
    }
});


function readUsersFromFile() {
    const data = fs.readFileSync(pathTooFile, 'utf-8');
    return JSON.parse(data);
}

function writeUsersToFile(users) {
    fs.writeFileSync(pathTooFile, JSON.stringify(users, null, 2));
}

app.listen(3000, () => {
    console.log('Server is running');
});