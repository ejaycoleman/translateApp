var ObjectID = require('mongodb').ObjectID;

module.exports = function(app, db) {

  // return using ID
  app.get('/translation/:book/:id', (req, res) => {
    const id = req.params.id;
    const book = req.params.book;
    //res.send({'id':id, 'book': book});


    const bookID = { '_id': new ObjectID(id) };
    db.collection(book).findOne(bookID, (err, item) => {
      if (err) {
        res.send({'error':'An error has occurred'});
      } else {
        res.send(item);
      }
    });
  });

  app.post('/translation', (req, res) => {
    const book = req.body.book;
    const note = {id: req.body.id, en: req.body.word, es: req.body.word };
    db.collection(book).insert(note, (err, result) => {
      if (err) {
        res.send({ 'error': 'An error has occurred' });
      } else {
        res.send(result.ops[0]);
      }
    });
  });
};
