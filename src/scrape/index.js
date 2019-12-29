import puppeteer from 'puppeteer';

import send, { constructMessage } from '../slack';
import products from './products';
import priceSelectors from './priceSelectors';

export const sortVariations = ({ variations, targetPrice }) => {
  return variations.reduce(
    (sortedVariations, variation) => {
      if (variation.currentPrice === null) {
        sortedVariations.missingPrices.push(variation);
      } else if (variation.currentPrice < targetPrice) {
        sortedVariations.targetPriceMet.push(variation);
      } else {
        sortedVariations.targetPriceNotMet.push(variation);
      }
      return sortedVariations;
    },
    {
      missingPrices: [],
      targetPriceMet: [],
      targetPriceNotMet: [],
    }
  );
};

const getDomain = url => url.match(/(?:www\.)(.*)(?:\/)/)['1'];

export const getPriceValue = elem => elem.innerText.slice(1);

export async function getPriceElement(page, url) {
  const domain = getDomain(url);
  const priceSelector = priceSelectors[domain];
  if (await page.$(priceSelector)) {
    return page.$eval(priceSelector, getPriceValue);
  }
  return null;
}

export async function getProductPrices(page, product) {
  const productWithPrices = (({ name, targetPrice }) => ({
    name,
    targetPrice,
    variations: [],
  }))(product);

  // eslint-disable-next-line no-restricted-syntax
  for (const variation of product.variations) {
    /* eslint-disable no-await-in-loop */
    await page.goto(variation.url, { waitUntil: 'networkidle0' });
    const currentPrice = await getPriceElement(page, variation.url);
    productWithPrices.variations.push({ ...variation, currentPrice });
  }

  return productWithPrices;
}

export default async function index() {
  const browser = await puppeteer.launch({
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });
  const page = await browser.newPage();

  // eslint-disable-next-line no-restricted-syntax
  for (const product of products) {
    const productWithPrices = await getProductPrices(page, product);
    const sortedVariations = sortVariations(productWithPrices);
    productWithPrices.sortedVariations = { ...sortedVariations };

    const message = constructMessage(productWithPrices);
    await send(message);
  }

  await browser.close();
}
