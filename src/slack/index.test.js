import { constructMessage } from './index';

const productName = 'Product A';
const targetPrice = 200;
const sortedVariations = {
  missingPrices: [],
  targetPriceMet: [],
  targetPriceNotMet: [],
};

describe('constructMessage', () => {
  beforeEach(() => {
    sortedVariations.missingPrices = [];
    sortedVariations.targetPriceMet = [];
    sortedVariations.targetPriceNotMet = [];
  });

  it("notifies the user when a price can't be fetched", () => {
    sortedVariations.missingPrices.push({
      name: 'Variation X',
      url: 'https://www.example.com/variationX',
      currentPrice: null,
    });

    const message = constructMessage({
      name: productName,
      targetPrice,
      sortedVariations,
    });

    expect(message).toContain('<@UKMGR8UFL>');
  });

  it('notifies the user when a target price has been met', () => {
    sortedVariations.targetPriceMet.push({
      name: 'Variation X',
      url: 'https://www.example.com/variation,X',
      currentPrice: 150,
    });

    const message = constructMessage({
      name: productName,
      targetPrice,
      sortedVariations,
    });

    expect(message).toContain('<@UKMGR8UFL>');
  });

  it("doesn't notify the user otherwise", () => {
    const message = constructMessage({
      name: productName,
      targetPrice,
      sortedVariations,
    });

    expect(message).not.toContain('<@UKMGR8UFL>');
  });

  it('returns the product name', () => {
    const message = constructMessage({
      name: productName,
      targetPrice,
      sortedVariations,
    });

    expect(message).toContain(`\n*${productName}*`);
  });

  it('handles empty arrays', () => {
    const message = constructMessage({
      name: productName,
      targetPrice,
      sortedVariations,
    });

    expect(message).not.toContain(`\n• Price hasn't dropped below £`);
    expect(message).not.toContain(`\n• *Price drop*:`);
    expect(message).not.toContain(`\n• *Error*: couldn't get the price for `);
  });

  it("constructs the message properly when one variation hasn't met the target price", () => {
    sortedVariations.targetPriceNotMet.push({
      name: 'Variation X',
      url: 'https://www.example.com/variationX',
      currentPrice: 300,
    });

    const message = constructMessage({
      name: productName,
      targetPrice,
      sortedVariations,
    });

    expect(message).toContain(`\n• Price hasn't dropped below £200`);
  });

  it("constructs the message properly when multiple variations haven't met the target price", () => {
    sortedVariations.targetPriceNotMet.push({
      name: 'Variation X',
      url: 'https://www.example.com/variationX',
      currentPrice: 300,
    });
    sortedVariations.targetPriceNotMet.push({
      name: 'Variation Y',
      url: 'https://www.example.com/variationY',
      currentPrice: 300,
    });

    const message = constructMessage({
      name: productName,
      targetPrice,
      sortedVariations,
    });

    expect(message).toContain(
      `\n• Price hasn't dropped below £200 for 2 variations`
    );
  });

  it('constructs the message properly when one variation has met the target price', () => {
    sortedVariations.targetPriceMet.push({
      name: 'Variation X',
      url: 'https://www.example.com/variationX',
      currentPrice: 150,
    });

    const message = constructMessage({
      name: productName,
      targetPrice,
      sortedVariations,
    });

    expect(message).toContain(
      `\n• *Price drop*: <https://www.example.com/variationX|variation _Variation X_> is £150 (target price: £200)`
    );
  });

  it('constructs the message properly when multiple variations have met the target price', () => {
    sortedVariations.targetPriceMet.push({
      name: 'Variation X',
      url: 'https://www.example.com/variationX',
      currentPrice: 150,
    });
    sortedVariations.targetPriceMet.push({
      name: 'Variation Y',
      url: 'https://www.example.com/variationY',
      currentPrice: 100,
    });

    const message = constructMessage({
      name: productName,
      targetPrice,
      sortedVariations,
    });

    expect(message).toContain(
      `\n• *Price drop*: <https://www.example.com/variationX|variation _Variation X_> is £150 (target price: £200)\n• *Price drop*: <https://www.example.com/variationY|variation _Variation Y_> is £100 (target price: £200)`
    );
  });

  it('constructs the message properly when one variation is missing the price', () => {
    sortedVariations.missingPrices.push({
      name: 'Variation X',
      url: 'https://www.example.com/variationX',
      currentPrice: 150,
    });

    const message = constructMessage({
      name: productName,
      targetPrice,
      sortedVariations,
    });

    expect(message).toContain(
      `\n• *Error*: couldn't get the price for <https://www.example.com/variationX|variation _Variation X_>`
    );
  });

  it('constructs the message properly when multiple variations are missing the price', () => {
    sortedVariations.missingPrices.push({
      name: 'Variation X',
      url: 'https://www.example.com/variationX',
      currentPrice: null,
    });
    sortedVariations.missingPrices.push({
      name: 'Variation Y',
      url: 'https://www.example.com/variationY',
      currentPrice: null,
    });

    const message = constructMessage({
      name: productName,
      targetPrice,
      sortedVariations,
    });

    expect(message).toContain(
      `\n• *Error*: couldn't get the price for <https://www.example.com/variationX|variation _Variation X_>\n• *Error*: couldn't get the price for <https://www.example.com/variationY|variation _Variation Y_>`
    );
  });
});
