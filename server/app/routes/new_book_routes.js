var ObjectID = require('mongodb').ObjectID;

module.exports = function(app, db) {

  // return using ID
  app.get('/newbook/:id', (req, res) => {
    const id = req.params.id;
    const details = { '_id': new ObjectID(id) };
    db.collection('notes').findOne(details, (err, item) => {
      if (err) {
        res.send({'error':'Book not present'});
      } else {
        res.send(item);
      }
    });
  });

  app.post('/newbook', (req, res) => {
    const note = {title: req.body.title,  content: req.body.content };
    db.collection('books').insert(note, (err, result) => {
      if (err) {
        res.send({ 'error': 'An error has occurred' });
      } else {
        res.send(result.ops[0]);
      }
    });
  });
};
