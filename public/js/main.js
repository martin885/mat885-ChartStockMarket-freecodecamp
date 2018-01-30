const socket = io();

function updateRemoveButtons(stocks) {
    const $stockBtns = $('#stock-btns');
    $('#message').hide();
    if (stocks.length) {
        $('#remove-stocks').show();
    } else {
        $('#remove-stocks').hide();
    }

    $stockBtns.find('li').remove();

    $.each(stocks, function (index, stock) {

        const $li = $('<li/>', { class: 'list-group-item' });




        const $p = $('<h3/>', {
            class: 'list-group-item-heading',
            html: `${stock.name.toUpperCase()}`
        });
        const $button = $('<span/>', {
            class: 'pull-right',
            html: '<button class="btn btn-danger">&times;</button>',
        });
        $button.click(function () {
            socket.emit('remove stock', stock.name);
            return false;
        });
        $li.append($button).append($p).prependTo($stockBtns);
    });
}

$(function () {
    $('#message').hide();
    $('form').submit(function () {
        socket.emit('add stock', $('#symbol').val());
        $('#symbol').val('');
        $('#message').hide();
        return false;
    });
    socket.on('not found', function (symbol) {
        $('#message').text(`there is no symbol: ${symbol}`);
        $('#message').show();
    });

    socket.on('stocks changed', updateChart);
    socket.on('stocks changed', updateRemoveButtons);
});
