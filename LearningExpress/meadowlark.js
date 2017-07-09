var express = require('express')
var app = express()
var handlebars = require('express3-handlebars').create({ defaultLayout: 'main' })

var fortunes = [
  'Conquer your fears or they will conquer you.',
  'River need spring.',
  'Do not fear what you do not know',
  'You will have a plesant surprise',
  'Whenever possible, keep it simple'
]

app.engine('handlebars', handlebars.engine)
app.set('view engine', 'handlebars')
app.set('port', process.env.PORT || 3000)

app.use(express.static(__dirname + '/public'))

app.get('/', function(req, res){
  res.render('home')
})

app.get('/about', function(req, res){
  var randomFortune = fortunes[Math.floor(Math.random() * fortunes.length)]
  res.render('about', { fortune: randomFortune })
})

app.use(function(req, res){
  res.render('404')
})

app.use(function(err, req, res, next){
  res.render('500')
})

app.listen(app.get('port'), function(){
  console.log('Express started on http://localhost:' + app.get('port') + '; press Crtl-C to terminate.');
})
