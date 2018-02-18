var express    = require('express');
var app        = express();
var bodyParser = require('body-parser');

var mongoose   = require('mongoose');
mongoose.connect('mongodb://devusr:dbPass123@ds141028.mlab.com:41028/translateapp');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;

var router = express.Router();

router.get('/', function(req, res) {
    res.json({ message: 'Base' });

    generateTranslateRequest("yes", "yes this is an API");
});

app.use('/api', router);

app.listen(port);
console.log('localhost:' + port);






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
    console.log(wordIndex);
    console.log(contextArray[wordIndex]);
    console.log(translateString);
  }
}
