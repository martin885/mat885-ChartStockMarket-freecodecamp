const yahooFinance = require('yahoo-finance');

const stocks = [];

function getDateRange() {
    var now = new Date();
    var day = now.getDate();
    var month = now.getMonth() + 1;
    var year = now.getFullYear();
    if (month < 10) {
        month = '0' + month;
    }
    if (day < 10) {
        day = '0' + day;
    }
    var to = `${year}-${month}-${day}`;
    var from = `${year - 1}-${month}-${day}`;
    return { from, to };
}

function index(req, res) {
    res.render('index', { title: 'Stock Market' });


}

function getStockData(symbol) {


    if (symbol) {
        var { from, to } = getDateRange();

        return yahooFinance.historical({
            symbol,
            from,
            to,
            period: 'd'
        }).then(function (quotes) {
            if (quotes.length) {
                const closeData = quotes.map(quote => [+new Date(quote.date), quote.close]).reverse();
                return Promise.resolve(closeData);

            }
            return Promise.reject('not found');
        });
    }
    return Promise.reject('no symbol');
}

function add(name) {
    exist = false;
    return getStockData(name).then(function (data) {
        const stock = { name, data };
        if (stocks.length > 0) {
            stocks.forEach(function (stock) {
                if (stock.name === name) {
                    exist = true;
                }
            });
        }
        if (!exist) {
            stocks.push(stock);
        }

        return Promise.resolve(stocks);
    });
}


function remove(symbol) {
    const stockIndex = stocks.findIndex(stock=>
        stock.name === symbol
    );

    stocks.splice(stockIndex, 1);
    return Promise.resolve(stocks);
}

module.exports = {
    index,
    add,
    remove,
    stocks
}