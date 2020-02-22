/** API key for signing the request */
const API_KEY = 'YOUR_API_HERE';
/** Alpha Vantage REST endpoint */
const ENDPOINT = 'https://www.alphavantage.co/query?function=';

Handlebars.registerHelper('currency', (value) => {
    // pretty widespread support for toLocaleString() in browsers now, so  ...
    value = parseFloat(value);
    return value.toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD'
    });
});
Handlebars.registerHelper('toUpper', (value) => {
    // pretty widespread support for toLocaleString() in browsers now, so  ...
    return value.toUpperCase();
});

const htmlImgTem = `
    <img src="../img/trading.svg">
    <p>Waiting for Stock Data ..</p>
`
document.querySelector('.stock').innerHTML = htmlImgTem;
/**
 * Display the current price and other information for a stock.
 * @param {HTMLElement} el DOM element parent for the display of the data. Must
 * contain a .symbol, .price, and .date elements.
 * @param {Object} data The returned stock symbol data
 */
const renderStock = (data) => {
    let { '2. Symbol': symbol, '3. Last Refreshed': date, '5. Time Zone': zone } = data['Meta Data'];
    date = date.split(" ")[0];
    let { '4. close': price } = data['Time Series (Daily)'][`${date}`];
    let dailySeriesArray = Object.getOwnPropertyNames(data['Time Series (Daily)']);
    let pastFiveDays = [];
    let pastFiveDaysObject = {}
        /**
         * Getting a list of Past five days
         * Add the day and the closing price to the pastFiveDaysObject
         * Add pastFiveDaysObject to the pastFiveDays Array
         */
    for (var index = 1; index <= 5; index++) {
        pastFiveDaysObject = {
            'x': dailySeriesArray[index],
            'y': data['Time Series (Daily)'][`${dailySeriesArray[index]}`]['4. close']
        };
        pastFiveDays.push(pastFiveDaysObject);
    }
    const testObj = {
        symbol: symbol,
        date: date,
        price: price,
        zone: zone,
        pastDays: pastFiveDays
    }
    document.querySelector('.stock').innerHTML = Handlebars.templates['stock'](testObj);
    var options = {
        chart: {
            type: 'area',
            // height: 350
        },
        dataLabels: {
            enabled: false
        },
        series: [
            { name: `${symbol.toUpperCase()} Stock` }
        ],
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
            type: 'datetime',
        },
        noData: {
            text: 'Loading...'
        }
    }
    var chart = new ApexCharts(document.querySelector("#chart"), options);
    chart.render();
    chart.updateSeries([{
        name: `${symbol.toUpperCase()} Stock`,
        data: pastFiveDays
    }])
}



/**
 * Handle symbol form submit to fetch the desired symbol information.
 * @param {Event} evt Event object for this listener function
 */
const fetchTickerData = (evt) => {
    evt.preventDefault();
    const htmlTemp = `
    <p>Incoming Stock Data ..</p>
`
        // document.querySelector('.stock').innerHTML = htmlTemp;
        // get the symbol
    const symbol = evt.target.elements['symbol'].value;
    fetch(`${ENDPOINT}TIME_SERIES_DAILY&symbol=${symbol}&apikey=${API_KEY}`)
        .then(response => {
            return response.json();
        })
        .then(data => {
            // log and export all data
            if (data['Error Message']) { // BONUS
                throw new Error(`There was an error fulfilling your request. Be sure you've entered a valid symbol`);
            }
            // displayResults(document.querySelector('.stock-display'), data);
            renderStock(data);
        })
        .catch(err => { // BONUS
            alert(`There was an error: ${err}`);
        });
};

// add the submit listener
document.querySelector('.frm.symbol').addEventListener('submit', fetchTickerData);