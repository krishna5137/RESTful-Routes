const express = require('express');
const app = express();
const path = require('path');

/**
 * To populate req-body
 * urlencoded for form data....use .json() for json type data
 */
app.use(express.urlencoded({ extended: true }))
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

const comments = [
    {
        username: 'skyler',
        comment: 'Someone has to protect this family from the man who protects this family.'
    },
    {
        username: 'walter-white',
        comment: 'I am the danger. A guy opens his door and gets shot, and you think that of me? No! I am the one who knocks!'
    },
    {
        username: 'jess@pinkman',
        comment: '“This is my own private domicile and I will not be harassed…b***h!”'
    },
    {
        username: 'hank',
        comment: 'Sometimes forbidden fruit tastes the sweetest.'
    }
]

/**
 * Read functionality for a RESTful CRUD structure
 */
app.get('/comments', (req, res) => {
    res.render('comments/index', { comments })
})

/**
 * stage 1 of Post req....displays page to post a new comment
 */
app.get('/comments/new', (req, res) => {
    res.render('comments/new');
})

/**
 * Stage 2
 * Posts the new comment to the DB (here to our array that mimics DB)
 */
app.post('/comments', (req, res) => {
    const { username, comment } = req.body;
    comments.push({ username, comment });
    res.send("comment posted!!");
})

app.get('/', (req, res) => {
    res.send('Inside the root of web app')
})

app.get('/tacos', (req, res) => {
    res.send('get the /tacos response')
})

app.post('/tacos', (req, res) => {
    const { meat, sauces, veggies } = req.body
    res.send(`Here is your ${meat} taco with ${sauces} sauce and ${veggies}`)
})

app.listen(8080, () => {
    console.log("On port 8080!")
})