const noteRoutes = require('./note_routes');
const bookTranslationRoutes = require('./book_translation_routes');
module.exports = function(app, db) {
  //noteRoutes(app, db);
  bookTranslationRoutes(app, db);
  // Other route groups could go here, in the future
};
