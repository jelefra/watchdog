const products = [
  {
    name: "B'Twin 900 winter cycling socks",
    targetPrice: 9,
    variations: [
      {
        name: 'Black/yellow',
        url:
          'https://www.decathlon.co.uk/roadr-900-socks-black-id_8549198.html',
      },
      {
        name: 'Black/grey',
        url:
          'https://www.decathlon.co.uk/roadr-900-socks-black-id_8549196.html',
      },
      {
        name: 'Blue/turquoise',
        url: 'https://www.decathlon.co.uk/roadr-900-socks-navy-id_8549197.html',
      },
    ],
  },
  //
  // Men's skis
  //
  {
    name: "Wedze men's boost 500 downhill skis",
    targetPrice: 195,
    variations: [
      {
        url:
          'https://www.decathlon.co.uk/mens-downhill-boost-500-id_8399022.html',
      },
    ],
  },
  {
    name: "Wedze men's on-piste skis with Boost 700 bindings",
    targetPrice: 245,
    variations: [
      {
        url:
          'https://www.decathlon.co.uk/m-ski-p-boost-700-green-id_8398648.html',
      },
    ],
  },
  {
    name: "Wedze men's on-piste skis with Boost 900 Bindings",
    targetPrice: 295,
    variations: [
      {
        url:
          'https://www.decathlon.co.uk/m-on-p-ski-boost-900-black-id_8574578.html',
      },
    ],
  },
  {
    name: 'Wedze downhill skis with Boost 980 Bindings ST',
    targetPrice: 345,
    variations: [
      {
        url:
          'https://www.decathlon.co.uk/m-ski-p-boost-980-st-blue-id_8543066.html',
      },
    ],
  },
  {
    name: "Atomic men's piste ski with binding Atomic Vantage 75 C",
    targetPrice: 245,
    variations: [
      {
        url:
          'https://www.decathlon.co.uk/m-p-ski-atomic-vantage-75-c-id_8570388.html',
      },
    ],
  },
  {
    name: "Atomic men's on-piste skis with Atomic Redster Binding X5",
    targetPrice: 295,
    variations: [
      {
        url:
          'https://www.decathlon.co.uk/m-on-p-ski-atomic-redster-x5-id_8571561.html',
      },
    ],
  },
  {
    name: "Head men's on-piste ski with Head I-shape Pro WC Binding",
    targetPrice: 295,
    variations: [
      {
        url:
          'https://www.decathlon.co.uk/ski-p-head-i-shape-pro-wc-id_8570930.html',
      },
    ],
  },
  {
    name: "Head men's on-piste skis with HEAD I-SHAPE PRO WC Rebel binding",
    targetPrice: 295,
    variations: [
      {
        url:
          'https://www.decathlon.co.uk/ski-p-head-i-shape-pro-wc-rebl-id_8529742.html',
      },
    ],
  },
  //
  // Women's ski boots
  //
  {
    name: "Wedze wid 300 women's downhill skiing boots",
    targetPrice: 85,
    variations: [
      {
        url:
          'https://www.decathlon.co.uk/womens-d-ski-boot-wid-300-id_8396678.html',
      },
    ],
  },
  {
    name: "Wedze women's downhill ski boots wid 500",
    targetPrice: 105, // Reduced from 130 on 23/01/20
    variations: [
      {
        url:
          'https://www.decathlon.co.uk/womens-d-ski-boot-wid-500-id_8396679.html',
      },
    ],
  },
  {
    name: "Wedze women's downhill ski boots Evofit 550",
    targetPrice: 145,
    variations: [
      {
        url:
          'https://www.decathlon.co.uk/womens-d-ski-boot-550-evofit-id_8504469.html',
      },
    ],
  },
  {
    name: "Wedze women's downhill ski boots Evofit 900",
    targetPrice: 125, // Reduced from 195 on 30/12/19, from £180 on 23/01/20, from £160 on 09/02/20
    variations: [
      {
        url:
          'https://www.decathlon.co.uk/womens-d-ski-boot-evofit-900-id_8504470.html',
      },
    ],
  },
  {
    name: "Salomon women's downhill ski boots Salomon X Access 70",
    targetPrice: 145,
    variations: [
      {
        url:
          'https://www.decathlon.co.uk/womens-ski-boot-salomon-x-acc-id_8570408.html',
      },
    ],
  },
  {
    name: "Salomon women's downhill ski boots Salomon Quest Access 70",
    targetPrice: 145,
    variations: [
      {
        url:
          'https://www.decathlon.co.uk/womens-ski-boot-salomon-qst-id_8568753.html',
      },
    ],
  },
  {
    name: "Atomic women's downhill ski boots Atomic Hawx Magna 85",
    targetPrice: 145, // Reduced from £180 on 09/02/20
    variations: [
      {
        url:
          'https://www.decathlon.co.uk/womens-ski-boot-atomic-hawx85-id_8570401.html',
      },
    ],
  },
  {
    name: "Head women's downhill ski boots Head Edge Lyt 80",
    targetPrice: 145, // Reduced from £180 on 09/02/20
    variations: [
      {
        url:
          'https://www.decathlon.co.uk/womens-ski-boot-head-edge-lyt-id_8570502.html',
      },
    ],
  },
  //
  // Men's ski boots
  //
  {
    name: "Wedze men's downhill ski boots wid 300",
    targetPrice: 85,
    variations: [
      {
        url:
          'https://www.decathlon.co.uk/mens-d-ski-boot-wid-300-id_8396143.html',
      },
    ],
  },
  {
    name: "Wedze men's downhill ski boots WID 500",
    targetPrice: 125,
    variations: [
      {
        url:
          'https://www.decathlon.co.uk/mens-d-ski-boot-wid-500-id_8396144.html',
      },
    ],
  },
  {
    name: "Wedze men's downhill ski boots Evofit 550",
    targetPrice: 145,
    variations: [
      {
        url:
          'https://www.decathlon.co.uk/mens-d-ski-boot-evofit-550-id_8510581.html',
      },
    ],
  },
  {
    name: "Salomon men's downhill ski boots Salomon Quest Access 80",
    targetPrice: 145,
    variations: [
      {
        url:
          'https://www.decathlon.co.uk/mens-ski-boot-salomon-qst-id_8568751.html',
      },
    ],
  },
  {
    name: "Salomon men's downhill ski boots Salomon x Access 80",
    targetPrice: 145,
    variations: [
      {
        url:
          'https://www.decathlon.co.uk/mens-ski-boot-salomon-x-acc-id_8570413.html',
      },
    ],
  },
  {
    name: "Atomic men's downhill ski boots Atomic Hawx Magna 100",
    targetPrice: 195,
    variations: [
      {
        url:
          'https://www.decathlon.co.uk/ski-boot-atomic-hawx-100-id_8570414.html',
      },
    ],
  },
  {
    name: "Head men's d-ski boots Head Edge Lyt 100",
    targetPrice: 195, // Reduced from 215 on 30/12/19
    variations: [
      {
        url:
          'https://www.decathlon.co.uk/m-ski-boot-head-edge-lyt-id_8570416.html',
      },
    ],
  },
  {
    name: "Head men's downhill ski boots Head Edge Lyt 110",
    targetPrice: 245,
    variations: [
      {
        url:
          'https://www.decathlon.co.uk/mens-ski-boot-head-edge-lyt-id_8570780.html',
      },
    ],
  },
];

export default products;
