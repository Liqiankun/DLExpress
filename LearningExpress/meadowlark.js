var express = require('express')
var app = express()
var handlebars = require('express3-handlebars').create({ defaultLayout: 'main' })
var fortune = require('./lib/fortune.js')
var tours = [
  {id: 0, name: 'Hood River', price: 99.9 },
  {id: 1, name: 'Oregon Coast', price: 149.95 }
]

app.engine('handlebars', handlebars.engine)
app.set('view engine', 'handlebars')
app.set('port', process.env.PORT || 3000)

if(app.thing == null) console.log( 'bleat' )

app.use(function(req, res, next){
  res.locals.showTests = app.get('env' !== 'production' && req.query.test === '1')
  next()
})

app.use(express.static(__dirname + '/public'))

app.get('/', function(req, res){
  res.render('home')
})

app.get('/about', function(req, res){
  res.render('about', { fortune: fortune.getFortune(), pageTestScript: '/qa/tests-about.js' })
})

app.get('/tours/hood-river', function(req, res){
  res.render('tours/hood-river')
})

app.get('/tours/request-group-rate', function(req, res){
  res.render('tours/request-group-rate')
})

app.get('/api/tours', function(req, res){
  res.format({
    'application/json': function(){
      res.json(tours)
    }
  })
})

app.put('/api/tours/:id', function(req, res){
  var p = tours.some(function(p){
    return p.id == req.params.id
  })
  if (p) {
    if( req.query.name ) p.name = req.query.name
    if ( req.query.price ) p.price = req.query.price
    res.json({success: ture})
  } else {
    res.json({error: 'No such tour exists.'})
  }
})

app.del('/api/tours/:id', function(req, res){
  var i
  for ( var i =tours.length - 1; i >= 0; i--)
      if(tours[i].id == req.params.id) break
    if (i >= 0) {
      tours.splice(i, 1);
      res.json({success: true})
    } else {
      res.json({ error: 'No such tour exists.'})
    }
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
