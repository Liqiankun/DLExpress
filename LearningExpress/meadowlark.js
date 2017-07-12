var express = require('express')
var http = require('http')
var app = express()
var handlebars = require('express3-handlebars').create({ defaultLayout: 'main' })
var fortune = require('./lib/fortune.js')
var Vacation = require('./models/vacation.js')
var VacationInSeasonListener = require('./models/VacationInSeasonListener.js')
var bodyParser = require('body-parser')
var tours = [
  {id: 0, name: 'Hood River', price: 99.9 },
  {id: 1, name: 'Oregon Coast', price: 149.95 }
]
var mongo = {
   development: {
    connectionString: 'mongodb://davidlee:lleett995162@ds133290.mlab.com:33290/davidleemdb',
  },
  production: {
    connectionString: 'mongodb://davidlee:lleett995162@ds133290.mlab.com:33290/davidleemdb',
  }
}

app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())

var mongoose = require('mongoose')
var opts = {
  sever: {
    socketOptions: { keepAlive: 1 }
  }
}

switch (app.get('env')) {
  case 'development':
    mongoose.connect(mongo.development.connectionString, opts)
    break;
  case 'production':
    mongoose.connect(mongo.production.connectionString, opts)
    break;
  default:
      throw new Error('UnKnown execution enviroment: ' + app.gvet('env'))

}

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

app.get('/vactions', function(req, res){
  Vacation.find(function(err, vacations){
    res.json(vacations)
  })
})

app.get('/notify-me-when-in-season', function(req, res){
    res.render('notify-me-when-in-season', { sku: req.query.sku });
});

app.post('/notify-me-when-in-season', function(req, res){
  console.log('reqbody', req.body);
    VacationInSeasonListener.update(
        { email: req.body.email },
        { $push: { skus: req.body.sku } },
        { upsert: true },
	    function(err){
        console.log('error', err);
	        if(err) {
	        	console.error(err.stack);
	            req.session.flash = {
	                type: 'danger',
	                intro: 'Ooops!',
	                message: 'There was an error processing your request.',
	            };
	            return res.redirect(303, '/vacations');
	        } else {
          console.log('chenggong');
            res.json(req.body)
          }
	    }
	);
});


app.get('/fail', function(req, res){
  throw new Error('Nope!')
})

app.use(function(req, res){
  res.render('404')
})

app.use(function(err, req, res, next){
  res.render('500')
})

Vacation.find(function(err, vacations){
    if(vacations.length) return;

    new Vacation({
        name: 'Hood River Day Trip',
        slug: 'hood-river-day-trip',
        category: 'Day Trip',
        sku: 'HR199',
        description: 'Spend a day sailing on the Columbia and ' +
            'enjoying craft beers in Hood River!',
        priceInCents: 9995,
        tags: ['day trip', 'hood river', 'sailing', 'windsurfing', 'breweries'],
        inSeason: true,
        maximumGuests: 16,
        available: true,
        packagesSold: 0,
    }).save();

    new Vacation({
        name: 'Oregon Coast Getaway',
        slug: 'oregon-coast-getaway',
        category: 'Weekend Getaway',
        sku: 'OC39',
        description: 'Enjoy the ocean air and quaint coastal towns!',
        priceInCents: 269995,
        tags: ['weekend getaway', 'oregon coast', 'beachcombing'],
        inSeason: false,
        maximumGuests: 8,
        available: true,
        packagesSold: 0,
    }).save();

    new Vacation({
        name: 'Rock Climbing in Bend',
        slug: 'rock-climbing-in-bend',
        category: 'Adventure',
        sku: 'B99',
        description: 'Experience the thrill of rock climbing in the high desert.',
        priceInCents: 289995,
        tags: ['weekend getaway', 'bend', 'high desert', 'rock climbing', 'hiking', 'skiing'],
        inSeason: true,
        requiresWaiver: true,
        maximumGuests: 4,
        available: false,
        packagesSold: 0,
        notes: 'The tour guide is currently recovering from a skiing accident.',
    }).save();
})


// switch(app.get('env')){
//     case 'development':
//     	// compact, colorful dev logging
//     	app.use(require('morgan')('dev'));
//         break;
//     case 'production':
//         // module 'express-logger' supports daily log rotation
//         app.use(require('express-logger')({ path: __dirname + '/log/requests.log'}));
//         break;
// }

function startServer() {
  http.createServer(app).listen(app.get('port'),function(){
    console.log('Express started on http://localhost:' + app.get('env') +  app.get('port') + '; press Crtl-C to terminate.')
  })
}

if (require.main === module) {
  startServer()
} else {
  module.exports = startServer()
}

// app.listen(app.get('port'), function(){
//   console.log('Express started on http://localhost:' + app.get('port') + '; press Crtl-C to terminate.');
// })
