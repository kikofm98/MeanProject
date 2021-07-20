const express = require('express')
const mongoose = require('mongoose')
const Article=require("./models/article")
const articleRouter = require('./routes/articles')
const methodOverride = require('method-override')
const app = express()

mongoose.connect('mongodb+srv://kikolla:<password>@cluster0.gr6zf.mongodb.net/myFirstDatabase?retryWrites=true&w=majority' , {
    useNewUrlParser:true, useUnifiedTopology: true, useCreateIndex:true
})


app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: false}))
app.use(methodOverride('_method'))

app.get('/', async (req,res)=>{
 const articles=await Article.find().sort({
     createdAt: 'desc'
 }) 
res.render('articles/index',{articles: articles})
})

app.use('/articles' , articleRouter)

app.set('port',process.env.PORT || 3000);

app.listen(app.get('port'), () => {
    console.log('Server on port' ,app.get('port'))
})