//const noteRoutes = require('./note_routes');
const bookTranslationRoutes = require('./book_translation_routes');
const bookContent = require('./book_content_routes');

module.exports = function(app, db) {
  //noteRoutes(app, db);
  bookTranslationRoutes(app, db);
  bookContent(app, db);
  // Other route groups could go here, in the future
};
