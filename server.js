const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Budget = require('./pbschema');

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.static('public'));
app.use(cors());

mongoose.connect('mongodb://localhost:27017/db1', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Connected to MongoDB");
}).catch(error => {
    console.error("MongoDB connection error:", error);
});

app.get('/hello', (req, res) => {
    res.send('Hello World!');
});

app.get('/budget', async (req, res) => {
    try {
        const budgetData = await Budget.find({});
        res.status(200).json(budgetData);
    } catch (error) {
        console.error("Error fetching budget data:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

app.post('/postBudgetData', async (req, res) => {
    try {
        const newBudgetData = new Budget(req.body);
        await newBudgetData.save();
        res.status(201).send("Data Inserted Successfully");
    } catch (error) {
        console.error("Error inserting budget data:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
