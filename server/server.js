
const express        = require('express');
const MongoClient    = require('mongodb').MongoClient;
const bodyParser     = require('body-parser');
const db             = require('./config/db');
const app            = express();

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});




const port = 8000;

app.use(bodyParser.urlencoded({ extended: true }));


MongoClient.connect(db.url, (err, database) => {
  if (err) return console.log(err)
  require('./app/routes')(app, database);
  app.listen(port, () => {
    console.log('We are live on ' + port);
  });
})


//mongoose.connect('mongodb://node:node@ds141028.mlab.com:41028/translateapp');


// router.get('/', function(req, res) {
//   var translateString = generateTranslateRequest("this", "yes this is an API");
//     res.json({ string: translateString });
//
//
// });






function generateTranslateRequest(word, context, uid, story) {
  var contextArray = context.split(" ");
  // remove punctuation during search
  var wordIndex = contextArray.indexOf(word);
  contextArray[wordIndex] = "\""+word+"\"";
  var translateString = contextArray.join(' ');

  if (story != null) {
    // if uid not in table
    // find word within context string, and wrap
  } else {
    return translateString;
  }
}
