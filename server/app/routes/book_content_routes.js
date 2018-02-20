var ObjectID = require('mongodb').ObjectID;

module.exports = function(app, db) {

  // return using ID
  app.get('/collection/:book', (req, res) => {
    const bookIDParam = req.params.book;

    const bookID = { '_id': new ObjectID(bookIDParam) };
    db.collection('books').findOne(bookID, (err, item) => {
      if (err) {
        res.send({'error':'An error has occurred'});
      } else {
        res.send(item);
      }
    });
  });

  app.post('/collection/new', (req, res) => {
    //const book = req.body.book;
    const note = {title: req.body.title, content: req.body.content };
    db.collection('books').insert(note, (err, result) => {
      if (err) {
        res.send({ 'error': 'An error has occurred' });
      } else {
        res.send(result.ops[0]);
      }
    });
  });
};
