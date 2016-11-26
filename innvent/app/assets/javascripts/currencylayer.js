$(document).ready(function() {

    // set endpoint and your access key
    endpoint = 'historical'
    access_key = '0a27d12beb3002410379fbfde65fe054';

    function apiRequest(date) {
        // get the most recent exchange rates via the "live" endpoint:
        $.ajax({
            url: 'http://apilayer.net/api/' + endpoint + '?access_key=' + access_key + '&date=',   
            dataType: 'jsonp',
            success: function(json) {

                // exchange rata data is stored in json.quotes
                alert(json.quotes.USDGBP);
                
                // source currency is stored in json.source
                alert(json.source);
                
                // timestamp can be accessed in json.timestamp
                alert(json.timestamp);
                
            }
        });
    }

    function parseJSDateToYYYYMMDD(date) {
        var stringDate = date.toISOString().slice(0,10);
        return stringDate;
    }


    $("#first-slider-item").click(function() {
        apiRequest();
    });

});