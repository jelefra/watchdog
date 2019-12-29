import fetch from 'node-fetch';
import { channel, atUserToNotify } from './slack-config';

export default async function send(text) {
  await fetch(process.env.SLACK_WEBHOOK_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      text,
      channel,
    }),
  });
}

const getName = name => {
  return name ? `variation _${name}_` : 'the item';
};

const processTargetPriceNotMet = ({ targetPriceNotMet }, targetPrice) => {
  if (targetPriceNotMet.length) {
    const countOfVariations = targetPriceNotMet.length;
    const variationMessage =
      countOfVariations > 1 ? ` for ${countOfVariations} variations` : '';
    return `\n• Price hasn't dropped below £${targetPrice}${variationMessage}`;
  }
  return '';
};

const processTargetPriceMet = ({ targetPriceMet }, targetPrice) => {
  if (targetPriceMet.length) {
    return targetPriceMet.reduce((message, { url, name, currentPrice }) => {
      const variationName = getName(name);
      // eslint-disable-next-line no-param-reassign
      message += `\n• *Price drop*: <${url}|${variationName}> is £${currentPrice} (target price: £${targetPrice})`;
      return message;
    }, '');
  }
  return '';
};

const processMissingPrices = ({ missingPrices }) => {
  if (missingPrices.length) {
    return missingPrices.reduce((message, { name, url }) => {
      const variationName = getName(name);
      // eslint-disable-next-line no-param-reassign
      message += `\n• *Error*: couldn't get the price for <${url}|${variationName}>`;
      return message;
    }, '');
  }
  return '';
};

const atUserIfApplicable = sortedVariations => {
  return sortedVariations.missingPrices.length ||
    sortedVariations.targetPriceMet.length
    ? `${atUserToNotify}`
    : '';
};

export const constructMessage = ({
  name: productName,
  targetPrice,
  sortedVariations,
}) => {
  let message = atUserIfApplicable(sortedVariations);
  message += `\n*${productName}*`;
  message += processMissingPrices(sortedVariations);
  message += processTargetPriceMet(sortedVariations, targetPrice);
  message += processTargetPriceNotMet(sortedVariations, targetPrice);

  return message;
};
