var express    = require('express');
var app        = express();
var bodyParser = require('body-parser');

var mongoose   = require('mongoose');
mongoose.connect('mongodb://devusr:dbPass123@ds141028.mlab.com:41028/translateapp');

// Handle the connection event
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function() {
  console.log("DB connection alive");
});



app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;

var router = express.Router();

router.get('/', function(req, res) {
  var translateString = generateTranslateRequest("this", "yes this is an API");
    res.json({ string: translateString });


});

app.use('/api', router);

app.listen(port);
console.log('listening on localhost:' + port);






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
