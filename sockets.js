const socketIo = require('socket.io');
const stocksController = require('./stocks');
const Symbols = require('./models/symbols.js')

module.exports = function Io(server) {
    const io = socketIo(server);
    io.on('connection', function (socket) {
        console.log('user connected');
        socket.emit('stocks changed', stocksController.stocks);

        socket.on('disconnect', function () {
            console.log('user disconnected');
        });

        socket.on('add stock', function (symbol) {
            console.log(`add stock: ${symbol}`);
            stocksController.add(symbol.toUpperCase()).then(function (stocks) {
                io.emit('stocks changed', stocks);
            }).catch(function (err) {
                if (err === 'not found') {
                    console.log('not found');
                    return socket.emit('not found', symbol);
                }
                return Promise.reject(err);
            }).catch(console.error);
        });

        socket.on('remove stock', function (symbol) {
            console.log(`remove stock: ${symbol}`);
            stocksController.remove(symbol).then(function (stocks) {
                io.emit('stocks changed', stocks);
            }).catch(console.error);
        });

    });
    return io;
}