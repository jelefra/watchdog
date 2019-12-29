import { getPriceValue, getPriceElement, sortVariations } from './index';

describe('getPriceValue', () => {
  it('returns the price value', () => {
    const actualValue = getPriceValue({ innerText: '£200' });
    expect(actualValue).toBe('200');
  });
});

describe('getPriceElement', () => {
  const page = {
    $: jest.fn(),
    $eval: jest.fn(),
  };

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('returns the price when the selector exits', async () => {
    page.$.mockResolvedValueOnce(true);
    page.$eval.mockResolvedValueOnce('200');
    const actualValue = await getPriceElement(
      page,
      'https://www.decathlon.co.uk/'
    );
    expect(actualValue).toBe('200');
    expect(page.$).toBeCalledWith('#real_price_value');
    expect(page.$eval).toBeCalledWith(
      '#real_price_value',
      expect.any(Function)
    );
  });

  it('returns null otherwise', async () => {
    page.$.mockResolvedValueOnce(false);
    const actualValue = await getPriceElement(
      page,
      'https://www.decathlon.co.uk/'
    );
    expect(actualValue).toBeNull();
    expect(page.$).toBeCalledWith('#real_price_value');
    expect(page.$eval).not.toBeCalled();
  });
});

describe('sortVariations', () => {
  it('categorises product variations correctly', () => {
    const productWithPrices = {
      name: 'Product A',
      targetPrice: 200,
      variations: [
        {
          name: 'Variation X',
          url: 'https://www.domain.com/variationX',
          currentPrice: 250,
        },
        {
          name: 'Variation Y',
          url: 'https://www.domain.com/variationY',
          currentPrice: 150,
        },
        {
          name: 'Variation Z',
          url: 'https://www.domain.com/variationZ',
          currentPrice: null,
        },
      ],
    };
    expect(sortVariations(productWithPrices)).toEqual({
      missingPrices: [
        {
          currentPrice: null,
          name: 'Variation Z',
          url: 'https://www.domain.com/variationZ',
        },
      ],
      targetPriceMet: [
        {
          currentPrice: 150,
          name: 'Variation Y',
          url: 'https://www.domain.com/variationY',
        },
      ],
      targetPriceNotMet: [
        {
          currentPrice: 250,
          name: 'Variation X',
          url: 'https://www.domain.com/variationX',
        },
      ],
    });
  });
});
