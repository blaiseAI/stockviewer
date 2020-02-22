;

(function () {
  "use strict";

  /** API key for signing the request */
  var API_KEY = 'YOUR_API_HERE';
  /** Alpha Vantage REST endpoint */

  var ENDPOINT = 'https://www.alphavantage.co/query?function=';
  Handlebars.registerHelper('currency', function (value) {
    // pretty widespread support for toLocaleString() in browsers now, so  ...
    value = parseFloat(value);
    return value.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD'
    });
  });
  Handlebars.registerHelper('toUpper', function (value) {
    // pretty widespread support for toLocaleString() in browsers now, so  ...
    return value.toUpperCase();
  });
  var htmlImgTem = "\n    <img src=\"../img/trading.svg\">\n    <p>Waiting for Stock Data ..</p>\n";
  document.querySelector('.stock').innerHTML = htmlImgTem;
  /**
   * Display the current price and other information for a stock.
   * @param {HTMLElement} el DOM element parent for the display of the data. Must
   * contain a .symbol, .price, and .date elements.
   * @param {Object} data The returned stock symbol data
   */

  var renderStock = function renderStock(data) {
    var _data$MetaData = data['Meta Data'],
        symbol = _data$MetaData['2. Symbol'],
        date = _data$MetaData['3. Last Refreshed'],
        zone = _data$MetaData['5. Time Zone'];
    date = date.split(" ")[0];
    var price = data['Time Series (Daily)']["".concat(date)]['4. close'];
    var dailySeriesArray = Object.getOwnPropertyNames(data['Time Series (Daily)']);
    var pastFiveDays = [];
    var pastFiveDaysObject = {};
    /**
     * Getting a list of Past five days
     * Add the day and the closing price to the pastFiveDaysObject
     * Add pastFiveDaysObject to the pastFiveDays Array
     */

    for (var index = 1; index <= 5; index++) {
      pastFiveDaysObject = {
        'x': dailySeriesArray[index],
        'y': data['Time Series (Daily)']["".concat(dailySeriesArray[index])]['4. close']
      };
      pastFiveDays.push(pastFiveDaysObject);
    }

    var testObj = {
      symbol: symbol,
      date: date,
      price: price,
      zone: zone,
      pastDays: pastFiveDays
    };
    document.querySelector('.stock').innerHTML = Handlebars.templates['stock'](testObj);
    var options = {
      chart: {
        type: 'area' // height: 350

      },
      dataLabels: {
        enabled: false
      },
      series: [{
        name: "".concat(symbol.toUpperCase(), " Stock")
      }],
      stroke: {
        curve: 'straight'
      },
      title: {
        text: 'Fundamental Analysis of Stocks',
        align: 'left'
      },
      subtitle: {
        text: 'Price Movements',
        align: 'left'
      },
      xaxis: {
        type: 'datetime'
      },
      noData: {
        text: 'Loading...'
      }
    };
    var chart = new ApexCharts(document.querySelector("#chart"), options);
    chart.render();
    chart.updateSeries([{
      name: "".concat(symbol.toUpperCase(), " Stock"),
      data: pastFiveDays
    }]);
  };
  /**
   * Handle symbol form submit to fetch the desired symbol information.
   * @param {Event} evt Event object for this listener function
   */


  var fetchTickerData = function fetchTickerData(evt) {
    evt.preventDefault();
    var htmlTemp = "\n    <p>Incoming Stock Data ..</p>\n"; // document.querySelector('.stock').innerHTML = htmlTemp;
    // get the symbol

    var symbol = evt.target.elements['symbol'].value;
    fetch("".concat(ENDPOINT, "TIME_SERIES_DAILY&symbol=").concat(symbol, "&apikey=").concat(API_KEY)).then(function (response) {
      return response.json();
    }).then(function (data) {
      // log and export all data
      if (data['Error Message']) {
        // BONUS
        throw new Error("There was an error fulfilling your request. Be sure you've entered a valid symbol");
      } // displayResults(document.querySelector('.stock-display'), data);


      renderStock(data);
    })["catch"](function (err) {
      // BONUS
      alert("There was an error: ".concat(err));
    });
  }; // add the submit listener


  document.querySelector('.frm.symbol').addEventListener('submit', fetchTickerData);
})();
