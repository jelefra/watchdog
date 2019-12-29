# Watchdog

Watchdog is a Node.js project to monitor product prices on eCommerce websites and be notified via Slack of price drops.

# How it works

Puppeteer crawls the products in `products.js` and fetches the prices identified via the selectors in `priceSelectors.js`. A Slack notification is sent for every product.

A product is defined as a collection of _variations_, this way it's possible to monitor similar items (typically different colours of a product) in one go. This reduces the number of notifications sent.
