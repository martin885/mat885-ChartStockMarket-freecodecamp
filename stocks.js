const yahooFinance = require('yahoo-finance');

const stocks = [];

function getDateRange() {
    const now = new Date();
    const day = now.getDate();
    const month = now.getMonth() + 1;
    const year = now.getFullYear();
    const to = `${year}-${month}-${day}`;
    const from = `${year - 1}-${month}-${day}`;
    return { from, to };
}

function index(req, res) {
    res.render('index', { title: 'Stock Market' });


}

function getStockData(symbol) {
    if (symbol) {
        const { from, to } = getDateRange();
        return yahooFinance.historical({
            symbol,
            from,
            to,
            period: 'd'
        }).then(function (quotes) {
            if (quotes.lenght) {
                const closeData = quotes.map(function (quote) { [+new Date(quote.date), quote.close] }).reverse();
                return Promise.resolve(closeData);

            }
            return Promise.reject('not found');
        });
    }
    return Promise.reject('no symbol');
}

function add(name) {
    return getStockData(name).then(function (data) {
        const stock = { nae, data };
        stocks.push(stock);
        return Promise.resolve(stocks);
    });
}


function remove(symbol){
    const stockIndex=stocks.findIndex(function(stock){
        stock.name===symbol
    });
    stocks.splice(stockIndex,1);
    return Promise.resolve(stocks);
}

module.exports={
    index,
    add,
    remove,
    stocks
}