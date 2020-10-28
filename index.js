const express = require('express');
const app = express();
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const methodOverride = require('method-override');

/**
 * To populate req-body
 * urlencoded for form data....use .json() for json type data
 */
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(methodOverride('_method'))
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

const comments = [
    {
        id: uuidv4(),
        username: 'skyler',
        comment: 'Someone has to protect this family from the man who protects this family.'
    },
    {
        id: uuidv4(),
        username: 'walter-white',
        comment: 'I am the danger. A guy opens his door and gets shot, and you think that of me? No! I am the one who knocks!'
    },
    {
        id: uuidv4(),
        username: 'jess@pinkman',
        comment: '“This is my own private domicile and I will not be harassed…b***h!”'
    },
    {
        id: uuidv4(),
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
 * stage 1 of create i.e Post req....displays page to post a new comment
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
    comments.push({ id: uuidv4(), username, comment });
    res.redirect('/comments');
})

/**
 * Read functionality by id for a detailed info
 */
app.get('/comments/:id', (req, res) => {
    const { id } = (req.params);
    const post = comments.find(c => c.id === id);
    console.log(post)
    res.render('comments/show', { post });
})

/**
 * Update existing comments
 */
app.patch('/comments/:id', (req, res) => {
    const { id } = req.params;
    const post = comments.find(c => c.id === id)
    editComment = req.body.comment;
    post.comment = editComment;
    res.redirect('/comments')
})

app.get('/comments/:id/edit', (req, res) => {
    const { id } = req.params;
    const post = comments.find(c => c.id === id);
    res.render('comments/edit', { post })
})

app.get('/', (req, res) => {
    res.send('Inside the root of web app')
})



app.listen(8080, () => {
    console.log("On port 8080!")
})