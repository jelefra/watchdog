import index from './scrape';

require('dotenv').config();

(async () => {
  await index();
})();
